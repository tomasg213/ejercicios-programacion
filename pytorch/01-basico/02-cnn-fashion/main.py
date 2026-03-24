import torch
from src.model import FashionMNISTTrainer, CNN, CLASSES

if __name__ == "__main__":
    print("=" * 60)
    print("CNN para Fashion MNIST - PyTorch")
    print("=" * 60)
    
    trainer = FashionMNISTTrainer(learning_rate=0.001)
    print(f"\nDispositivo: {trainer.device}")
    
    print("\n1. Cargar datos:")
    train_loader, test_loader = trainer.get_data_loaders(batch_size=64)
    print(f"  Train: {len(train_loader)} batches")
    print(f"  Test: {len(test_loader)} batches")
    
    print("\n2. Entrenar:")
    for epoch in range(5):
        loss = trainer.train_epoch(train_loader)
        print(f"  Epoch {epoch+1}/5 - Loss: {loss:.4f}")
    
    print("\n3. Evaluar:")
    test_loss, accuracy = trainer.evaluate(test_loader)
    print(f"  Loss: {test_loss:.4f}")
    print(f"  Accuracy: {accuracy:.2f}%")
    
    print("\n4. Guardar modelo:")
    torch.save(trainer.model.state_dict(), 'fashion_mnist.pth')
    print("  Modelo guardado en 'fashion_mnist.pth'")
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)