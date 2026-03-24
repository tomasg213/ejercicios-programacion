"""
TensorFlow - Ejercicio 2: Regresión para Predicción de Precios
================================================================
Predicción de precios de viviendas usando el dataset California Housing
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, callbacks
import numpy as np
import pandas as pd
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

print("=" * 60)
print("Ejercicio 2: Predicción de Precios de Viviendas")
print("=" * 60)

# ============================================
# 1. CARGAR DATOS
# ============================================
print("\n1. CARGANDO DATOS California Housing")
print("-" * 40)

housing = fetch_california_housing()
X = housing.data
y = housing.target
feature_names = housing.feature_names

print(f"Samples: {X.shape[0]}")
print(f"Features: {X.shape[1]}")
print(f"Features: {feature_names}")

# Split datos
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
X_train, X_val, y_train, y_val = train_test_split(
    X_train, y_train, test_size=0.15, random_state=42
)

print(f"\nTrain: {X_train.shape[0]}, Val: {X_val.shape[0]}, Test: {X_test.shape[0]}")

# Normalizar features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)
X_test_scaled = scaler.transform(X_test)

# ============================================
# 2. DEFINIR MODELO
# ============================================
print("\n2. DEFINIR MODELO DE REGRESIÓN")
print("-" * 40)

def create_regression_model(input_dim):
    model = keras.Sequential([
        layers.Dense(64, activation='relu', input_shape=(input_dim,)),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        
        layers.Dense(64, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        
        layers.Dense(32, activation='relu'),
        layers.BatchNormalization(),
        
        layers.Dense(1)  # Sin activación (regresión lineal)
    ])
    
    return model

model = create_regression_model(X_train_scaled.shape[1])
model.summary()

# ============================================
# 3. COMPILAR Y ENTRENAR
# ============================================
print("\n3. ENTRENAMIENTO")
print("-" * 40)

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='mse',
    metrics=['mae']
)

# Callbacks
early_stopping = callbacks.EarlyStopping(
    monitor='val_loss',
    patience=15,
    restore_best_weights=True
)

reduce_lr = callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,
    patience=5,
    min_lr=1e-6
)

history = model.fit(
    X_train_scaled, y_train,
    validation_data=(X_val_scaled, y_val),
    epochs=100,
    batch_size=32,
    callbacks=[early_stopping, reduce_lr],
    verbose=1
)

# ============================================
# 4. EVALUAR
# ============================================
print("\n4. EVALUACIÓN")
print("-" * 40)

test_loss, test_mae = model.evaluate(X_test_scaled, y_test)
print(f"\nTest MSE: {test_loss:.4f}")
print(f"Test MAE: {test_mae:.4f}")
print(f"Precio medio en dataset: ${y.mean() * 100000:.2f}")
print(f"Error medio: ${test_mae * 100000:.2f}")

# ============================================
# 5. PREDICCIONES
# ============================================
print("\n5. EJEMPLO DE PREDICCIONES")
print("-" * 40)

sample_houses = X_test_scaled[:5]
actual_prices = y_test[:5] * 100000
predicted_prices = model.predict(sample_houses).flatten() * 100000

print("Predicciones vs Precios Reales:")
for i in range(5):
    diff = predicted_prices[i] - actual_prices[i]
    print(f"  Casa {i+1}: Predicho ${predicted_prices[i]:,.0f} | Real ${actual_prices[i]:,.0f} | Diff ${diff:+,.0f}")

# ============================================
# 6. VISUALIZAR PREDICCIONES
# ============================================
print("\n6. ANÁLISIS DE ERRORES")
print("-" * 40)

all_predictions = model.predict(X_test_scaled).flatten() * 100000
all_actuals = y_test * 100000
errors = np.abs(all_predictions - all_actuals)

print(f"Error máximo: ${errors.max():,.0f}")
print(f"Error mínimo: ${errors.min():,.0f}")
print(f"Error promedio: ${errors.mean():,.0f}")
print(f"Error mediana: ${np.median(errors):,.0f}")

# Guardar modelo
model.save('housing_price_model.keras')
scaler_path = 'scaler_params.npz'
np.savez(scaler_path, mean=scaler.mean_, scale=scaler.scale_)
print(f"\nModelo guardado en 'housing_price_model.keras'")
print(f"Scaler guardado en '{scaler_path}'")

print("\n" + "=" * 60)
print("¡Ejercicio completado!")
print("=" * 60)
