"""
PyTorch - Ejercicio 4: Fine-tuning BERT con HuggingFace
=========================================================
Clasificación de sentimiento usando BERT pre-entrenado
"""

import torch
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer, BertForSequenceClassification, AdamW, get_linear_schedule_with_warmup
import pandas as pd
import numpy as np

print("=" * 60)
print("Ejercicio 4: Fine-tuning BERT para Sentimiento")
print("=" * 60)

# ============================================
# 1. CARGAR BERT Y TOKENIZER
# ============================================
print("\n1. CARGANDO BERT")
print("-" * 40)

model_name = 'bert-base-uncased'
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained(
    model_name,
    num_labels=2,
    output_attentions=False,
    output_hidden_states=False
)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

print(f"Modelo: {model_name}")
print(f"Dispositivo: {device}")

# ============================================
# 2. DATOS DE EJEMPLO (Sustituir con datos reales)
# ============================================
print("\n2. PREPARANDO DATOS")
print("-" * 40)

# Datos de ejemplo (en producción usar datasets reales)
train_texts = [
    "This movie is fantastic! I loved it.",
    "Terrible film, waste of time.",
    "Great acting and storyline.",
    "Boring and predictable.",
    "Best movie I've ever seen!",
    "Not recommend, very disappointing.",
    "Excellent plot and characters.",
    "Mediocre at best.",
    "Absolutely wonderful experience.",
    "Hated every minute of it."
] * 10  # Duplicar para tener más datos

train_labels = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0] * 10

# Dataset personalizado
class SentimentDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len=128):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len
    
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = str(self.texts[idx])
        label = self.labels[idx]
        
        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_len,
            return_token_type_ids=False,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

# Crear datasets
train_dataset = SentimentDataset(train_texts, train_labels, tokenizer)
train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)

print(f"Muestras de entrenamiento: {len(train_dataset)}")

# ============================================
# 3. ENTRENAMIENTO
# ============================================
print("\n3. ENTRENAMIENTO")
print("-" * 40)

# Configurar optimizer
optimizer = AdamW(model.parameters(), lr=2e-5)
total_steps = len(train_loader) * 3  # 3 epochs
scheduler = get_linear_schedule_with_warmup(
    optimizer,
    num_warmup_steps=0,
    num_training_steps=total_steps
)

def train_epoch(model, loader, optimizer, scheduler, device):
    model.train()
    total_loss = 0
    correct = 0
    total = 0
    
    for batch in loader:
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)
        
        optimizer.zero_grad()
        
        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            labels=labels
        )
        
        loss = outputs.loss
        logits = outputs.logits
        
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        scheduler.step()
        
        total_loss += loss.item()
        preds = torch.argmax(logits, dim=1)
        correct += (preds == labels).sum().item()
        total += labels.size(0)
    
    return total_loss / len(loader), correct / total

# Entrenar
num_epochs = 3

for epoch in range(num_epochs):
    train_loss, train_acc = train_epoch(model, train_loader, optimizer, scheduler, device)
    print(f"Epoch {epoch+1}/{num_epochs} - Loss: {train_loss:.4f} - Acc: {train_acc:.4f}")

# ============================================
# 4. EVALUACIÓN
# ============================================
print("\n4. EVALUACIÓN")
print("-" * 40)

model.eval()

test_texts = [
    "I really enjoyed this movie!",
    "This was the worst experience ever.",
    "Good but could be better.",
    "Absolutely terrible!"
]

for text in test_texts:
    encoding = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=128,
        return_token_type_ids=False,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt'
    )
    
    input_ids = encoding['input_ids'].to(device)
    attention_mask = encoding['attention_mask'].to(device)
    
    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        prediction = torch.argmax(logits, dim=1).item()
    
    sentiment = "Positivo" if prediction == 1 else "Negativo"
    print(f"'{text}' -> {sentiment}")

# ============================================
# 5. GUARDAR MODELO
# ============================================
print("\n5. GUARDAR MODELO")
print("-" * 40)

# Guardar modelo y tokenizer
model.save_pretrained('./sentiment_model')
tokenizer.save_pretrained('./sentiment_model')
print("Modelo guardado en './sentiment_model'")

# Cargar modelo guardado
# loaded_model = BertForSequenceClassification.from_pretrained('./sentiment_model')
# loaded_tokenizer = BertTokenizer.from_pretrained('./sentiment_model')

print("\n" + "=" * 60)
print("¡Ejercicio completado!")
print("=" * 60)
