# Ejercicio 3: Machine Learning con Scikit-Learn

## Caso Real
Trabajas en un e-commerce. Necesitas predecir si un cliente comprará o no basándote en sus datos demográficos y de navegación.

## Dataset
Usaremos datos simulados de clientes:
- **Edad**: 18-70 años
- **Ingreso**: $20,000 - $150,000
- **Tiempo en sitio**: 1-60 minutos
- **Paginas visitadas**: 1-30
- **Compras anteriores**: 0-20
- **_target_: 1 = Compró, 0 = No compró

## Pipeline de ML
1. **Carga de datos**: Generar dataset sintético
2. **Exploración**: Estadísticas básicas
3. **Preprocesamiento**: Normalización de features
4. **Split**: 80% entrenamiento, 20% prueba
5. **Entrenamiento**: Regresión Logística, Random Forest
6. **Evaluación**: Accuracy, Precision, Recall, F1
7. **Predicción**: Nuevos clientes

## Métricas
```python
Accuracy = (TP + TN) / Total
Precision = TP / (TP + FP)  # De los que predije positivos, cuántos son correctos
Recall = TP / (TP + FN)     # De los positivos reales, cuántos encontré
F1 = 2 * (Precision * Recall) / (Precision + Recall)
```

## Requisitos
1. Instalar: `pip install scikit-learn pandas numpy`
2. Crear dataset sintético realista
3. Entrenar múltiples modelos
4. Comparar rendimiento
5. Guardar modelo con pickle
6. Predicción con nuevos datos

## Ejemplo de Salida
```
=== Modelo de Prediccion de Compras ===

Estadisticas del Dataset:
- Total muestras: 1000
- Compradores: 300 (30%)
- No compradores: 700 (70%)

--- Regresion Logistica ---
Accuracy: 0.85
Precision: 0.82
Recall: 0.78
F1: 0.80

--- Random Forest ---
Accuracy: 0.89
Precision: 0.85
Recall: 0.84
F1: 0.84

Mejor modelo: Random Forest

--- Prediccion para nuevo cliente ---
Cliente: Edad=35, Ingreso=75000, Tiempo=25min, Paginas=12
Prediccion: PROBABLE COMPRADOR (87%)
```

## Pistas
- `sklearn.datasets.make_classification` para datos sintéticos
- `sklearn.model_selection.train_test_split`
- `sklearn.preprocessing.StandardScaler`
- `sklearn.linear_model.LogisticRegression`
- `sklearn.ensemble.RandomForestClassifier`
- `sklearn.metrics.classification_report`

## Conceptos a Practicar
- Machine Learning básico
- Clasificación binaria
- Preprocesamiento
- Validación de modelos
- Métricas de evaluación
- Scikit-learn API
