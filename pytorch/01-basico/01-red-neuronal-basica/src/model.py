import torch
import torch.nn as nn
import torch.optim as optim
from typing import Tuple, List


class RedXOR(nn.Module):
    def __init__(self):
        super(RedXOR, self).__init__()
        self.capa1 = nn.Linear(2, 4)
        self.capa2 = nn.Linear(4, 4)
        self.capa3 = nn.Linear(4, 1)
        
        nn.init.xavier_uniform_(self.capa1.weight)
        nn.init.xavier_uniform_(self.capa2.weight)
        nn.init.xavier_uniform_(self.capa3.weight)
    
    def forward(self, x):
        x = torch.relu(self.capa1(x))
        x = torch.relu(self.capa2(x))
        x = torch.sigmoid(self.capa3(x))
        return x


class Trainer:
    def __init__(self, model: nn.Module, learning_rate: float = 0.1):
        self.model = model
        self.criterion = nn.MSELoss()
        self.optimizer = optim.Adam(model.parameters(), lr=learning_rate)
        self.history: List[float] = []
    
    def train(self, X: torch.Tensor, y: torch.Tensor, epochs: int = 1000) -> List[float]:
        self.model.train()
        
        for epoch in range(epochs):
            self.optimizer.zero_grad()
            outputs = self.model(X)
            loss = self.criterion(outputs, y)
            loss.backward()
            self.optimizer.step()
            
            if (epoch + 1) % 100 == 0:
                self.history.append(loss.item())
        
        return self.history
    
    def evaluate(self, X: torch.Tensor, y: torch.Tensor) -> Tuple[List[torch.Tensor], float]:
        self.model.eval()
        with torch.no_grad():
            predictions = self.model(X)
            loss = self.criterion(predictions, y).item()
        return predictions, loss
    
    def save(self, path: str):
        torch.save(self.model.state_dict(), path)
    
    def load(self, path: str):
        self.model.load_state_dict(torch.load(path))


def get_xor_data() -> Tuple[torch.Tensor, torch.Tensor]:
    X = torch.tensor([
        [0.0, 0.0],
        [0.0, 1.0],
        [1.0, 0.0],
        [1.0, 1.0]
    ], dtype=torch.float32)
    
    y = torch.tensor([
        [0.0],
        [1.0],
        [1.0],
        [0.0]
    ], dtype=torch.float32)
    
    return X, y