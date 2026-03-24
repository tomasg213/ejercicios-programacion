import torch
import torch.nn.functional as F
from typing import Tuple
from .model import SimpleUnet


class DiffusionScheduler:
    def __init__(self, T: int = 500, beta_start: float = 0.0001, beta_end: float = 0.02, device: str = 'cpu'):
        self.T = T
        self.device = device
        
        betas = torch.linspace(beta_start, beta_end, T).to(device)
        alphas = 1 - betas
        alphas_cumprod = torch.cumprod(alphas, dim=0)
        alphas_cumprod_prev = F.pad(alphas_cumprod[:-1], (1, 0), value=1.0)
        
        self.sqrt_alphas_cumprod = torch.sqrt(alphas_cumprod)
        self.sqrt_one_minus_alphas_cumprod = torch.sqrt(1 - alphas_cumprod)
        self.sqrt_recip_alphas = torch.sqrt(1.0 / alphas)
        self.posterior_variance = betas * (1 - alphas_cumprod_prev) / (1 - alphas_cumprod)
    
    def q_sample(self, x_start: torch.Tensor, t: torch.Tensor, noise: torch.Tensor = None) -> torch.Tensor:
        if noise is None:
            noise = torch.randn_like(x_start)
        
        sqrt_alphas_cumprod_t = self.sqrt_alphas_cumprod[t]
        sqrt_one_minus_alphas_cumprod_t = self.sqrt_one_minus_alphas_cumprod[t]
        
        for _ in range(len(x_start.shape) - len(sqrt_alphas_cumprod_t.shape)):
            sqrt_alphas_cumprod_t = sqrt_alphas_cumprod_t.unsqueeze(-1)
            sqrt_one_minus_alphas_cumprod_t = sqrt_one_minus_alphas_cumprod_t.unsqueeze(-1)
        
        return sqrt_alphas_cumprod_t * x_start + sqrt_one_minus_alphas_cumprod_t * noise
    
    @torch.no_grad()
    def p_sample(self, model: SimpleUnet, x: torch.Tensor, t: torch.Tensor, t_index: int) -> torch.Tensor:
        betas_t = self.betas[t]
        sqrt_one_minus_alphas_cumprod_t = self.sqrt_one_minus_alphas_cumprod[t]
        sqrt_recip_alphas_t = self.sqrt_recip_alphas[t]
        
        betas_t = betas_t.view(-1, 1, 1, 1)
        sqrt_one_minus_alphas_cumprod_t = sqrt_one_minus_alphas_cumprod_t.view(-1, 1, 1, 1)
        sqrt_recip_alphas_t = sqrt_recip_alphas_t.view(-1, 1, 1, 1)
        
        model_mean = sqrt_recip_alphas_t * (
            x - betas_t * model(x, t) / sqrt_one_minus_alphas_cumprod_t
        )
        
        if t_index == 0:
            return model_mean
        else:
            posterior_variance_t = self.posterior_variance[t]
            noise = torch.randn_like(x)
            return model_mean + torch.sqrt(posterior_variance_t.view(-1, 1, 1, 1)) * noise
    
    @property
    def betas(self) -> torch.Tensor:
        return torch.linspace(0.0001, 0.02, self.T).to(self.device)
    
    @torch.no_grad()
    def generate(self, model: SimpleUnet, shape: Tuple[int, ...]) -> torch.Tensor:
        model.eval()
        x = torch.randn(shape, device=self.device)
        
        for i in reversed(range(self.T)):
            t = torch.full((shape[0],), i, device=self.device, dtype=torch.long)
            x = self.p_sample(model, x, t, i)
        
        return x


class DDPM:
    def __init__(self, model: SimpleUnet, scheduler: DiffusionScheduler, device: str = 'cpu'):
        self.model = model
        self.scheduler = scheduler
        self.device = device
    
    def train_step(self, x_start: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        noise = torch.randn_like(x_start)
        noisy_x = self.scheduler.q_sample(x_start, t, noise)
        
        predicted_noise = self.model(noisy_x, t)
        
        loss = F.mse_loss(predicted_noise, noise)
        return loss
    
    @torch.no_grad()
    def generate(self, shape: Tuple[int, ...]) -> torch.Tensor:
        return self.scheduler.generate(self.model, shape)