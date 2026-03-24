import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from typing import List, Tuple


class TextDataset(Dataset):
    def __init__(self, inputs: List[torch.Tensor], targets: List[torch.Tensor]):
        self.inputs = inputs
        self.targets = targets
    
    def __len__(self):
        return len(self.inputs)
    
    def __getitem__(self, idx):
        return self.inputs[idx], self.targets[idx]


class Vocabulary:
    def __init__(self, text: str):
        chars = sorted(set(text.lower()))
        self.char_to_idx = {ch: i for i, ch in enumerate(chars)}
        self.idx_to_char = {i: ch for i, ch in enumerate(chars)}
        self.vocab_size = len(chars)
    
    def encode(self, text: str) -> torch.Tensor:
        return torch.tensor([self.char_to_idx[ch] for ch in text.lower() if ch in self.char_to_idx], dtype=torch.long)
    
    def decode(self, tensor: torch.Tensor) -> str:
        return ''.join([self.idx_to_char[idx.item()] for idx in tensor])


def create_sequences(text: str, seq_length: int = 50) -> Tuple[List[torch.Tensor], List[torch.Tensor]]:
    vocab = Vocabulary(text)
    text_tensor = vocab.encode(text)
    
    input_seqs = []
    target_seqs = []
    
    for i in range(0, len(text_tensor) - seq_length):
        input_seqs.append(text_tensor[i:i + seq_length])
        target_seqs.append(text_tensor[i + 1:i + seq_length + 1])
    
    return input_seqs, target_seqs


def get_dataloader(text: str, seq_length: int = 50, batch_size: int = 32):
    input_seqs, target_seqs = create_sequences(text, seq_length)
    dataset = TextDataset(input_seqs, target_seqs)
    return DataLoader(dataset, batch_size=batch_size, shuffle=True)