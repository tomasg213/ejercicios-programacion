# Ejercicio 1: Clasificación de Imágenes

## Caso Real
Entrena una CNN básica para clasificar imágenes de CIFAR-10.

## Requisitos
1. Cargar dataset CIFAR-10
2. Construir CNN básica
3. Entrenar modelo
4. Evaluar precisión

## Dataset
- 10 clases: airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck
- 50,000 imágenes de entrenamiento
- 10,000 imágenes de prueba
- 32x32x3 RGB

## Código

```python
import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

# Cargar CIFAR-10
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.cifar10.load_data()

# Normalizar
x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

# Construir CNN
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Entrenar
history = model.fit(x_train, y_train, epochs=10, 
                    validation_data=(x_test, y_test))

# Evaluar
test_loss, test_acc = model.evaluate(x_test, y_test)
print(f'Precisión: {test_acc:.2%}')
```

## Estructura
```
01-clasificacion-imagenes/
├── src/
│   └── train.py
├── requirements.txt
└── README.md
