"""
TensorFlow - Ejercicio 1: Clasificación de Imágenes con CNN
===========================================================
Clasificación de imágenes usando el dataset CIFAR-10
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models, callbacks
import numpy as np
import matplotlib.pyplot as plt

print("=" * 60)
print("Ejercicio 1: CNN para CIFAR-10")
print("=" * 60)

# ============================================
# 1. CARGAR DATOS
# ============================================
print("\n1. CARGANDO DATOS CIFAR-10")
print("-" * 40)

(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()

# Normalizar píxeles a [0, 1]
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

print(f"Training samples: {x_train.shape[0]}")
print(f"Test samples: {x_test.shape[0]}")
print(f"Image shape: {x_train.shape[1:]}")
print(f"Number of classes: {len(np.unique(y_train))}")

# Nombres de clases
class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',
               'dog', 'frog', 'horse', 'ship', 'truck']

# ============================================
# 2. DEFINIR CNN
# ============================================
print("\n2. DEFINIR ARQUITECTURA CNN")
print("-" * 40)

def create_cnn_model():
    model = models.Sequential([
        # Bloque 1: Conv + Conv + Pool
        layers.Conv2D(32, (3, 3), padding='same', activation='relu', input_shape=(32, 32, 3)),
        layers.BatchNormalization(),
        layers.Conv2D(32, (3, 3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Bloque 2: Conv + Conv + Pool
        layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Bloque 3: Conv + Conv + Pool
        layers.Conv2D(128, (3, 3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(128, (3, 3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Fully Connected
        layers.Flatten(),
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(10, activation='softmax')
    ])
    
    return model

model = create_cnn_model()
model.summary()

# ============================================
# 3. COMPILAR Y ENTRENAR
# ============================================
print("\n3. ENTRENAMIENTO")
print("-" * 40)

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Callbacks
early_stopping = callbacks.EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True
)

reduce_lr = callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,
    patience=3,
    min_lr=1e-6
)

# Entrenar
history = model.fit(
    x_train, y_train,
    epochs=50,
    batch_size=64,
    validation_split=0.15,
    callbacks=[early_stopping, reduce_lr],
    verbose=1
)

# ============================================
# 4. EVALUAR
# ============================================
print("\n4. EVALUACIÓN")
print("-" * 40)

test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
print(f"\nTest Accuracy: {test_acc:.4f}")
print(f"Test Loss: {test_loss:.4f}")

# ============================================
# 5. PREDICCIONES
# ============================================
print("\n5. EJEMPLO DE PREDICCIONES")
print("-" * 40)

# Predicciones
predictions = model.predict(x_test[:10])
predicted_classes = np.argmax(predictions, axis=1)

print("Predicciones vs Realidad:")
for i in range(10):
    pred_name = class_names[predicted_classes[i]]
    real_name = class_names[y_test[i][0]]
    conf = predictions[i][predicted_classes[i]] * 100
    print(f"  {i+1}. Predicción: {pred_name:12s} ({conf:.1f}%) - Real: {real_name}")

# ============================================
# 6. VISUALIZAR TRAINING
# ============================================
print("\n6. HISTORIAL DE ENTRENAMIENTO")
print("-" * 40)

print(f"Final Training Accuracy: {history.history['accuracy'][-1]:.4f}")
print(f"Final Validation Accuracy: {history.history['val_accuracy'][-1]:.4f}")

# Guardar modelo
model.save('cifar10_cnn_model.keras')
print("\nModelo guardado en 'cifar10_cnn_model.keras'")

print("\n" + "=" * 60)
print("¡Ejercicio completado!")
print("=" * 60)
