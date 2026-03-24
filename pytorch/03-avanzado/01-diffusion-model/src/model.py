import torch
import torch.nn as nn
import torch.nn.functional as F


class ResidualBlock(nn.Module):
    def __init__(self, in_channels: int, out_channels: int, time_emb_dim: int):
        super().__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, 3, padding=1)
        self.conv2 = nn.Conv2d(out_channels, out_channels, 3, padding=1)
        self.time_mlp = nn.Linear(time_emb_dim, out_channels)
        self.norm1 = nn.GroupNorm(8, out_channels)
        self.norm2 = nn.GroupNorm(8, out_channels)
        
        self.shortcut = nn.Conv2d(in_channels, out_channels, 1) if in_channels != out_channels else nn.Identity()
    
    def forward(self, x: torch.Tensor, t_emb: torch.Tensor) -> torch.Tensor:
        h = self.norm1(F.silu(self.conv1(x)))
        h += self.time_mlp(t_emb)[:, :, None, None]
        h = self.norm2(F.silu(self.conv2(h)))
        return h + self.shortcut(x)


class SimpleUnet(nn.Module):
    def __init__(self, in_channels: int = 1, out_channels: int = 1, base_channels: int = 64, time_dim: int = 128):
        super().__init__()
        
        self.time_mlp = nn.Sequential(
            nn.Linear(1, time_dim),
            nn.SiLU(),
            nn.Linear(time_dim, time_dim)
        )
        
        self.enc1 = ResidualBlock(in_channels, base_channels, time_dim)
        self.enc2 = ResidualBlock(base_channels, base_channels * 2, time_dim)
        self.enc3 = ResidualBlock(base_channels * 2, base_channels * 4, time_dim)
        
        self.bottleneck = ResidualBlock(base_channels * 4, base_channels * 4, time_dim)
        
        self.dec3 = ResidualBlock(base_channels * 8, base_channels * 2, time_dim)
        self.dec2 = ResidualBlock(base_channels * 4, base_channels, time_dim)
        self.dec1 = ResidualBlock(base_channels * 2, base_channels, time_dim)
        
        self.final = nn.Conv2d(base_channels, out_channels, 1)
        
        self.pool = nn.MaxPool2d(2)
        self.upsample = nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True)
    
    def forward(self, x: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        t = t.unsqueeze(-1).float()
        t_emb = self.time_mlp(t)
        
        e1 = self.enc1(x, t_emb)
        e2 = self.enc2(self.pool(e1), t_emb)
        e3 = self.enc3(self.pool(e2), t_emb)
        
        b = self.bottleneck(e3, t_emb)
        
        d3 = self.dec3(torch.cat([self.upsample(b), e3], dim=1), t_emb)
        d2 = self.dec2(torch.cat([self.upsample(d3), e2], dim=1), t_emb)
        d1 = self.dec1(torch.cat([self.upsample(d2), e1], dim=1), t_emb)
        
        return self.final(d1)