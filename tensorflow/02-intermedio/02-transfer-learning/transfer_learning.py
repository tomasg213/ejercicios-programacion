"""
TensorFlow - Ejercicio 4: Transfer Learning con MobileNetV2
============================================================
Clasificación de imágenes usando un modelo pre-entrenado
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models, callbacks
import numpy as np
import matplotlib.pyplot as plt

print("=" * 60)
print("Ejercicio 4: Transfer Learning con MobileNetV2")
print("=" * 60)

# ============================================
# 1. CARGAR DATOS (Flowers)
# ============================================
print("\n1. CARGANDO DATOS Flowers")
print("-" * 40)

# URL del dataset
URL = 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos.tgz'
data_dir = keras.utils.get_file(
    'flower_photos',
    URL,
    untar=True,
    cache_dir='.',
    cache_subdir='data'
)

print(f"Dataset path: {data_dir}")

# Cargar datos usando image_dataset_from_directory
IMG_SIZE = (160, 160)
BATCH_SIZE = 32

train_dataset = keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset='training',
    seed=42,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

val_dataset = keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset='validation',
    seed=42,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

class_names = train_dataset.class_names
print(f"Classes: {class_names}")
print(f"Training batches: {len(train_dataset)}")
print(f"Validation batches: {len(val_dataset)}")

# ============================================
# 2. CONFIGURAR MobileNetV2
# ============================================
print("\n2. CARGANDO MobileNetV2 (Pre-entrenado)")
print("-" * 40)

# Cargar MobileNetV2 sin la capa de clasificación
base_model = keras.applications.MobileNetV2(
    input_shape=(160, 160, 3),
    include_top=False,
    weights='imagenet'
)

# Congelar el modelo base (NO entrenar los pesos de ImageNet)
base_model.trainable = False
print(f"Base model layers: {len(base_model.layers)}")
print("Base model is FROZEN (trainable=False)")

# ============================================
# 3. CREAR MODELO COMPLETO
# ============================================
print("\n3. CREAR MODELO COMPLETO")
print("-" * 40)

def create_transfer_model(base_model, num_classes):
    # Preprocesamiento específico de MobileNetV2
    inputs = keras.Input(shape=(160, 160, 3))
    
    # MobileNetV2 espera entradas normalizadas de cierta forma
    x = keras.applications.mobilenet_v2.preprocess_input(inputs)
    
    # Extraer features
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.3)(x)
    
    # Clasificador
    outputs = layers.Dense(num_classes, activation='softmax')(x)
    
    model = keras.Model(inputs, outputs)
    return model

model = create_transfer_model(base_model, len(class_names))
model.summary()

# ============================================
# 4. ENTRENAR CAPAS NUEVAS
# ============================================
print("\n4. ENTRENAMIENTO (solo capas nuevas)")
print("-" * 40)

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history = model.fit(
    train_dataset,
    validation_data=val_dataset,
    epochs=10,
    callbacks=[callbacks.EarlyStopping(patience=5, restore_best_weights=True)],
    verbose=1
)

print(f"\nAccuracy después de fine-tuning parcial: {history.history['val_accuracy'][-1]:.4f}")

# ============================================
# 5. FINE-TUNING (entrenar últimas capas del base)
# ============================================
print("\n5. FINE-TUNING (últimas 50 capas)")
print("-" * 40)

# Descongelar las últimas 50 capas
base_model.trainable = True
for layer in base_model.layers[:-50]:
    layer.trainable = False

print(f"Trainable layers in base model: {sum(1 for l in base_model.layers if l.trainable)}")

# Recompilar con learning rate más bajo
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.0001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history_ft = model.fit(
    train_dataset,
    validation_data=val_dataset,
    epochs=10,
    callbacks=[callbacks.EarlyStopping(patience=5, restore_best_weights=True)],
    verbose=1
)

# ============================================
# 6. EVALUAR
# ============================================
print("\n6. EVALUACIÓN FINAL")
print("-" * 40)

val_loss, val_acc = model.evaluate(val_dataset)
print(f"\nValidation Accuracy: {val_acc:.4f}")
print(f"Validation Loss: {val_loss:.4f}")

# ============================================
# 7. PREDICCIONES
# ============================================
print("\n7. EJEMPLO DE PREDICCIONES")
print("-" * 40)

# Obtener algunas imágenes de validación
for images, labels in val_dataset.take(1):
    predictions = model.predict(images)
    predicted_classes = np.argmax(predictions, axis=1)
    
    print("Predicciones:")
    for i in range(5):
        pred_class = class_names[predicted_classes[i]]
        real_class = class_names[labels[i]]
        conf = predictions[i][predicted_classes[i]]
        correct = "✓" if pred_class == real_class else "✗"
        print(f"  {i+1}. {correct} Predicho: {pred_class} ({conf*100:.1f}%) - Real: {real_class}")

# Guardar modelo
model.save('flower_classifier_transfer.keras')
print("\nModelo guardado en 'flower_classifier_transfer.keras'")

print("\n" + "=" * 60)
print("¡Ejercicio completado!")
print("=" * 60)
