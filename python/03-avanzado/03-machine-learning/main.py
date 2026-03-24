"""
Ejercicio 3: Machine Learning con Scikit-Learn

E-commerce - Modelo de prediccion de compras.
"""

import numpy as np
import pandas as pd
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix
import pickle
from datetime import datetime


def generar_dataset(n_muestras=1000, random_state=42):
    """Genera dataset sintético de clientes."""
    
    X, y = make_classification(
        n_samples=n_muestras,
        n_features=5,
        n_informative=5,
        n_redundant=0,
        n_classes=2,
        weights=[0.7, 0.3],
        random_state=random_state
    )
    
    columnas = ['edad', 'ingreso_anual', 'tiempo_sitio', 'paginas_visitadas', 'compras_anteriores']
    df = pd.DataFrame(X, columns=columnas)
    
    df['edad'] = np.clip(df['edad'] * 0.5 + 35, 18, 70).astype(int)
    df['ingreso_anual'] = np.clip(df['ingreso_anual'] * 5000 + 60000, 20000, 150000).astype(int)
    df['tiempo_sitio'] = np.clip(df['tiempo_sitio'] * 5 + 15, 1, 60).astype(int)
    df['paginas_visitadas'] = np.clip(df['paginas_visitadas'] * 2 + 8, 1, 30).astype(int)
    df['compras_anteriores'] = np.clip(df['compras_anteriores'] * 3 + 3, 0, 20).astype(int)
    
    df['compro'] = y
    
    return df


def explorar_datos(df):
    """Muestra estadísticas del dataset."""
    print("\n=== Estadisticas del Dataset ===")
    print(f"Total muestras: {len(df)}")
    print(f"Compradores: {df['compro'].sum()} ({df['compro'].mean()*100:.1f}%)")
    print(f"No compradores: {len(df) - df['compro'].sum()} ({(1-df['compro'].mean())*100:.1f}%)")
    
    print("\n--- Estadisticas por feature ---")
    print(df.describe().round(2))
    
    print("\n--- Correlacion con compra ---")
    correlaciones = df.corr()['compro'].drop('compro').sort_values(ascending=False)
    print(correlaciones.round(3))


def entrenar_modelos(X_train, X_test, y_train, y_test):
    """Entrena múltiples modelos y los compara."""
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    modelos = {
        'Regresion Logistica': LogisticRegression(random_state=42, max_iter=1000),
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42)
    }
    
    resultados = {}
    
    print("\n=== Entrenamiento de Modelos ===")
    
    for nombre, modelo in modelos.items():
        print(f"\n--- {nombre} ---")
        
        modelo.fit(X_train_scaled, y_train)
        y_pred = modelo.predict(X_test_scaled)
        
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred)
        recall = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        
        print(f"Accuracy:  {accuracy:.3f}")
        print(f"Precision: {precision:.3f}")
        print(f"Recall:    {recall:.3f}")
        print(f"F1 Score:  {f1:.3f}")
        
        print(f"\n{classification_report(y_test, y_pred, target_names=['No Compra', 'Compra'])}")
        
        cm = confusion_matrix(y_test, y_pred)
        print(f"Matriz de confusion:\n{cm}")
        
        resultados[nombre] = {
            'modelo': modelo,
            'scaler': scaler,
            'accuracy': accuracy,
            'f1': f1,
            'predictions': y_pred
        }
    
    mejor_modelo = max(resultados.items(), key=lambda x: x[1]['f1'])
    print(f"\n=== Mejor modelo: {mejor_modelo[0]} (F1: {mejor_modelo[1]['f1']:.3f}) ===")
    
    return resultados, mejor_modelo[1]


def predecir_nuevos_clientes(modelo_entrenado, scaler):
    """Predice para nuevos clientes."""
    
    nuevos_clientes = [
        {'edad': 25, 'ingreso_anual': 35000, 'tiempo_sitio': 5, 'paginas_visitadas': 3, 'compras_anteriores': 0},
        {'edad': 45, 'ingreso_anual': 85000, 'tiempo_sitio': 30, 'paginas_visitadas': 15, 'compras_anteriores': 8},
        {'edad': 35, 'ingreso_anual': 75000, 'tiempo_sitio': 25, 'paginas_visitadas': 12, 'compras_anteriores': 5},
    ]
    
    print("\n=== Predicciones para Nuevos Clientes ===")
    
    for cliente in nuevos_clientes:
        df_cliente = pd.DataFrame([cliente])
        X_cliente = scaler.transform(df_cliente)
        
        prediccion = modelo_entrenado.predict(X_cliente)[0]
        probabilidad = modelo_entrenado.predict_proba(X_cliente)[0]
        
        resultado = "COMPRADOR" if prediccion == 1 else "NO COMPRADOR"
        confianza = probabilidad[1] if prediccion == 1 else probabilidad[0]
        
        print(f"\nCliente: Edad={cliente['edad']}, Ingreso=${cliente['ingreso_anual']:,}, "
              f"Tiempo={cliente['tiempo_sitio']}min, Paginas={cliente['paginas_visitadas']}")
        print(f"Prediccion: {resultado} (confianza: {confianza*100:.1f}%)")


def guardar_modelo(modelo, scaler, nombre_archivo='modelo_compras.pkl'):
    """Guarda el modelo entrenado."""
    with open(nombre_archivo, 'wb') as f:
        pickle.dump({'modelo': modelo, 'scaler': scaler}, f)
    print(f"\nModelo guardado en: {nombre_archivo}")


def main():
    print("=" * 50)
    print(" MODELO DE PREDICCION DE COMPRAS")
    print("=" * 50)
    
    df = generar_dataset(1000)
    
    explorar_datos(df)
    
    X = df.drop('compro', axis=1)
    y = df['compro']
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    resultados, mejor = entrenar_modelos(X_train, X_test, y_train, y_test)
    
    predecir_nuevos_clientes(mejor['modelo'], mejor['scaler'])
    
    guardar_modelo(mejor['modelo'], mejor['scaler'])
    
    print("\n" + "=" * 50)
    print(" EJERCICIOS SUGERIDOS")
    print("=" * 50)
    print("""
1. Agregar mas features (ej: dispositivo, ubicacion)
2. Probar otros modelos (SVM, Gradient Boosting)
3. Optimizar hiperparametros con GridSearchCV
4. Hacer validacion cruzada (cross-validation)
5. Crear API REST para predicciones en tiempo real
6. Guardar predicciones en base de datos
    """)


if __name__ == "__main__":
    main()
