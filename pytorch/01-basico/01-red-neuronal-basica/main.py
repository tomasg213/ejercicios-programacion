import torch
from src.model import RedXOR, Trainer, get_xor_data

if __name__ == "__main__":
    print("=" * 60)
    print("Red Neuronal para XOR - PyTorch")
    print("=" * 60)
    
    print("\n1. Cargar datos XOR:")
    X, y = get_xor_data()
    print(f"  Entradas: {X.shape}")
    print(f"  Etiquetas: {y.shape}")
    
    print("\n2. Crear modelo:")
    model = RedXOR()
    print(model)
    
    print("\n3. Entrenar modelo:")
    trainer = Trainer(model, learning_rate=0.1)
    history = trainer.train(X, y, epochs=1000)
    print(f"  Pérdida final: {history[-1]:.6f}")
    
    print("\n4. Evaluar:")
    predictions, loss = trainer.evaluate(X, y)
    print(f"  Pérdida: {loss:.6f}")
    
    print("\n5. Predicciones:")
    with torch.no_grad():
        for i in range(len(X)):
            pred = "1" if predictions[i].item() >= 0.5 else "0"
            expected = "1" if y[i].item() >= 0.5 else "0"
            print(f"  XOR({int(X[i][0])}, {int(X[i][1])}) = {pred} (esperado: {expected})")
    
    print("\n6. Guardar modelo:")
    trainer.save("modelo_xor.pth")
    print("  Modelo guardado en 'modelo_xor.pth'")
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)