"""
TensorFlow - Ejercicio 3: Clasificación de Texto con LSTM
==========================================================
Clasificación de reseñas de películas por sentimiento usando LSTM
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models, preprocessing, callbacks
import numpy as np

print("=" * 60)
print("Ejercicio 3: Clasificación de Sentimiento con LSTM")
print("=" * 60)

# ============================================
# 1. CARGAR DATOS (IMDB)
# ============================================
print("\n1. CARGANDO DATOS IMDB")
print("-" * 40)

vocab_size = 10000
max_length = 200
embedding_dim = 128

# Cargar datos IMDB
(X_train, y_train), (X_test, y_test) = keras.datasets.imdb.load_data(num_words=vocab_size)

# Padding para que todas las secuencias tengan la misma longitud
X_train = preprocessing.sequence.pad_sequences(X_train, maxlen=max_length)
X_test = preprocessing.sequence.pad_sequences(X_test, maxlen=max_length)

print(f"Training samples: {len(X_train)}")
print(f"Test samples: {len(X_test)}")
print(f"Sequence length: {max_length}")
print(f"Vocabulary size: {vocab_size}")

# ============================================
# 2. DEFINIR MODELO LSTM
# ============================================
print("\n2. DEFINIR MODELO LSTM")
print("-" * 40)

def create_lstm_model(vocab_size, max_length, embedding_dim):
    model = models.Sequential([
        # Embedding layer
        layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
        layers.Dropout(0.3),
        
        # LSTM layers
        layers.Bidirectional(layers.LSTM(64, return_sequences=True)),
        layers.Dropout(0.3),
        
        layers.Bidirectional(layers.LSTM(32)),
        layers.Dropout(0.3),
        
        # Dense layers
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(1, activation='sigmoid')
    ])
    
    return model

model = create_lstm_model(vocab_size, max_length, embedding_dim)
model.summary()

# ============================================
# 3. COMPILAR Y ENTRENAR
# ============================================
print("\n3. ENTRENAMIENTO")
print("-" * 40)

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Callbacks
early_stopping = callbacks.EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True
)

reduce_lr = callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,
    patience=2,
    min_lr=1e-6
)

# Split para validación
X_train_split = X_train[:20000]
X_val = X_train[20000:]
y_train_split = y_train[:20000]
y_val = y_train[20000:]

history = model.fit(
    X_train_split, y_train_split,
    validation_data=(X_val, y_val),
    epochs=10,
    batch_size=64,
    callbacks=[early_stopping, reduce_lr],
    verbose=1
)

# ============================================
# 4. EVALUAR
# ============================================
print("\n4. EVALUACIÓN")
print("-" * 40)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
print(f"\nTest Accuracy: {test_acc:.4f}")
print(f"Test Loss: {test_loss:.4f}")

# ============================================
# 5. PREDICCIONES
# ============================================
print("\n5. EJEMPLO DE PREDICCIONES")
print("-" * 40)

# Función para decodificar secuencia
word_index = keras.datasets.imdb.get_word_index()
reverse_word_index = {v: k for k, v in word_index.items()}

def decode_review(encoded_review):
    return ' '.join([reverse_word_index.get(i - 3, '?') for i in encoded_review])

# Predicciones
sample_reviews = X_test[:5]
predictions = model.predict(sample_reviews)

print("Reseñas y predicciones:")
for i in range(5):
    sentiment = "POSITIVO" if predictions[i] > 0.5 else "NEGATIVO"
    real = "POSITIVO" if y_test[i] == 1 else "NEGATIVO"
    conf = predictions[i][0] if predictions[i] > 0.5 else 1 - predictions[i][0]
    print(f"\n{i+1}. Predicción: {sentiment} ({conf*100:.1f}%) - Real: {real}")
    print(f"   Texto: {decode_review(sample_reviews[i])[:100]}...")

# ============================================
# 6. PROBAR CON NUEVA RESEÑA
# ============================================
print("\n6. PROBAR CON NUEVA RESEÑA")
print("-" * 40)

# Función para procesar texto nuevo
def predict_sentiment(text, model, word_index, max_length):
    # Convertir texto a índices
    words = text.lower().split()
    encoded = [word_index.get(word, 2) + 3 for word in words]  # 2 es UNK
    padded = preprocessing.sequence.pad_sequences([encoded], maxlen=max_length)
    
    prediction = model.predict(padded)[0][0]
    sentiment = "POSITIVO" if prediction > 0.5 else "NEGATIVO"
    return sentiment, prediction

# Probar
test_reviews = [
    "This movie was absolutely fantastic! I loved every minute of it.",
    "Terrible movie, waste of time. I want my money back.",
    "It was okay, not great but not bad either.",
    "Best film of the year! Highly recommend it to everyone."
]

for review in test_reviews:
    sentiment, conf = predict_sentiment(review, model, word_index, max_length)
    print(f'"{review[:50]}..." -> {sentiment} ({conf*100:.1f}%)')

print("\n" + "=" * 60)
print("¡Ejercicio completado!")
print("=" * 60)
