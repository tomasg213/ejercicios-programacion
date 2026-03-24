import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from typing import Tuple, List


class TextGeneratorLSTM(nn.Module):
    def __init__(self, vocab_size: int, embed_size: int = 128, hidden_size: int = 256, num_layers: int = 2):
        super(TextGeneratorLSTM, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embed_size)
        self.lstm = nn.LSTM(embed_size, hidden_size, num_layers, batch_first=True, dropout=0.2)
        self.fc = nn.Linear(hidden_size, vocab_size)
        self.hidden_size = hidden_size
        self.num_layers = num_layers
    
    def forward(self, x: torch.Tensor, hidden: Tuple[torch.Tensor, torch.Tensor]):
        embedded = self.embedding(x)
        output, hidden = self.lstm(embedded, hidden)
        output = self.fc(output)
        return output, hidden
    
    def init_hidden(self, batch_size: int, device: torch.device):
        return (torch.zeros(self.num_layers, batch_size, self.hidden_size).to(device),
                torch.zeros(self.num_layers, batch_size, self.hidden_size).to(device))


class TextGenerator:
    def __init__(self, model: TextGeneratorLSTM, vocab: 'Vocabulary', device: str = 'cpu'):
        self.model = model
        self.vocab = vocab
        self.device = device
        self.model.to(device)
    
    def generate(self, start_text: str, length: int = 100, temperature: float = 1.0) -> str:
        self.model.eval()
        text = start_text.lower()
        input_seq = self.vocab.encode(text).unsqueeze(0).to(self.device)
        
        hidden = self.model.init_hidden(1, self.device)
        generated = start_text
        
        with torch.no_grad():
            for _ in range(length):
                output, hidden = self.model(input_seq, hidden)
                probs = torch.softmax(output[0, -1] / temperature, dim=0)
                next_char_idx = torch.multinomial(probs, 1).item()
                next_char = self.vocab.idx_to_char[next_char_idx]
                generated += next_char
                input_seq = torch.tensor([[next_char_idx]]).to(self.device)
        
        return generated
    
    def train(self, dataloader: DataLoader, epochs: int, lr: float = 0.001) -> List[float]:
        criterion = nn.CrossEntropyLoss()
        optimizer = torch.optim.Adam(self.model.parameters(), lr=lr)
        losses = []
        
        for epoch in range(epochs):
            total_loss = 0
            hidden = self.model.init_hidden(32, self.device)
            
            for inputs, targets in dataloader:
                inputs, targets = inputs.to(self.device), targets.to(self.device)
                
                outputs, hidden = self.model(inputs, hidden)
                hidden = (hidden[0].detach(), hidden[1].detach())
                
                outputs = outputs.view(-1, self.vocab.vocab_size)
                targets = targets.view(-1)
                
                loss = criterion(outputs, targets)
                
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
                
                total_loss += loss.item()
            
            losses.append(total_loss / len(dataloader))
            
        return losses