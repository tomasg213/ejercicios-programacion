from src.model import CIFAR10Trainer

if __name__ == "__main__":
    print("=" * 60)
    print("CNN para CIFAR-10 - TensorFlow")
    print("=" * 60)
    
    trainer = CIFAR10Trainer(learning_rate=0.001)
    print(f"\nModelo:\n{trainer.model.summary()}")
    
    print("\n1. Cargar datos:")
    (x_train, y_train), (x_test, y_test) = trainer.get_data()
    print(f"  Train: {x_train.shape}, Test: {x_test.shape}")
    
    print("\n2. Entrenar:")
    trainer.train(epochs=5, batch_size=64)
    
    print("\n3. Evaluar:")
    trainer.evaluate(x_test, y_test)
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)