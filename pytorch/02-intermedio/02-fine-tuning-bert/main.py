import torch
from src.model import BertFineTuner, TextDataset

if __name__ == "__main__":
    print("=" * 60)
    print("Fine-tuning BERT - PyTorch")
    print("=" * 60)
    
    texts = [
        "I love this product, it's amazing!",
        "This is terrible, I hate it",
        "Great quality, highly recommended",
        "Very bad experience, do not buy",
        "Excellent service, will come back",
        "Disappointing product, waste of money"
    ]
    
    labels = [1, 0, 1, 0, 1, 0]
    
    print("\n1. Crear fine-tuner:")
    tuner = BertFineTuner(model_name='bert-base-uncased', num_labels=2)
    print(f"  Dispositivo: {tuner.device}")
    
    print("\n2. Crear dataset:")
    dataset = TextDataset(texts, labels, tuner.tokenizer)
    dataloader = torch.utils.data.DataLoader(dataset, batch_size=2)
    print(f"  samples: {len(dataset)}, batches: {len(dataloader)}")
    
    print("\n3. Entrenar (ejemplo rápido):")
    tuner.train(dataloader, epochs=1)
    
    print("\n4. Predecir:")
    test_texts = ["I really like this!", "This is awful"]
    for text in test_texts:
        pred = tuner.predict(text)
        print(f"  '{text}' -> {'Positivo' if pred == 1 else 'Negativo'}")
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)