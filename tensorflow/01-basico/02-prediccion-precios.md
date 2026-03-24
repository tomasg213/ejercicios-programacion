# Ejercicio 2: Predicción de Precios

## Caso Real
Modelo de regresión lineal para predecir precios de casas usando el dataset de vivienda de California.

## Dataset
- 20,640 muestras
- Variables: ingresos, edad casas, habitaciones, etc.
- Objetivo: precio medio de la casa

## Código
```python
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

housing = fetch_california_housing()
X_train, X_test, y_train, y_test = train_test_split(
    housing.data, housing.target, test_size=0.2
)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = models.Sequential([
    layers.Dense(64, activation='relu', input_shape=(8,)),
    layers.Dense(64, activation='relu'),
    layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])

history = model.fit(X_train, y_train, epochs=20, 
                   validation_data=(X_test, y_test))

predictions = model.predict(X_test[:5])
print(f"Predicciones: {predictions.flatten()}")
print(f"Reales: {y_test[:5]}")
```
