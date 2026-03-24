"""
Ejercicio 4: Decoradores y Processing de Archivos

Data Engineering - Procesamiento eficiente con logging y timing.
"""

import time
import csv
import random
from functools import wraps
from datetime import datetime, timedelta
from pathlib import Path


def medir_tiempo(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = func(*args, **kwargs)
        duracion = time.time() - inicio
        print(f"[TIME] {func.__name__} completado en {duracion:.4f} segundos")
        return resultado
    return wrapper


def loggear(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[LOG] Ejecutando: {func.__name__}")
        print(f"[LOG] Argumentos: {args}, {kwargs}")
        try:
            resultado = func(*args, **kwargs)
            print(f"[LOG] {func.__name__} completada exitosamente")
            return resultado
        except Exception as e:
            print(f"[LOG] Error en {func.__name__}: {str(e)}")
            raise
    return wrapper


def reintentar(max_intentos=3, delay=1):
    def decorador(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for intento in range(1, max_intentos + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if intento == max_intentos:
                        raise
                    print(f"[RETRY] Intento {intento}/{max_intentos} fallido: {str(e)}")
                    time.sleep(delay)
            return None
        return wrapper
    return decorador


def generar_datos_prueba(archivo, num_registros=100):
    productos = [
        ('Laptop', 999.99), ('Mouse', 29.99), ('Teclado', 79.99),
        ('Monitor', 299.99), ('Audifonos', 149.99), ('Webcam', 89.99),
        ('Impresora', 199.99), ('Router', 59.99), ('Disco SSD', 119.99)
    ]
    
    with open(archivo, 'w', newline='') as f:
        escritor = csv.writer(f)
        escritor.writerow(['fecha', 'producto', 'cantidad', 'precio'])
        
        fecha_actual = datetime.now()
        for _ in range(num_registros):
            producto, precio = random.choice(productos)
            cantidad = random.randint(1, 10)
            fecha = (fecha_actual - timedelta(days=random.randint(0, 30))).strftime('%Y-%m-%d')
            escritor.writerow([fecha, producto, cantidad, precio])


@medir_tiempo
@loggear
def procesar_ventas(archivo):
    ventas = []
    
    with open(archivo, 'r') as f:
        lector = csv.DictReader(f)
        for fila in lector:
            fila['cantidad'] = int(fila['cantidad'])
            fila['precio'] = float(fila['precio'])
            fila['total'] = fila['cantidad'] * fila['precio']
            ventas.append(fila)
    
    return ventas


@medir_tiempo
def calcular_estadisticas(ventas):
    total_ventas = sum(v['total'] for v in ventas)
    promedio = total_ventas / len(ventas) if ventas else 0
    
    ventas_por_producto = {}
    for venta in ventas:
        producto = venta['producto']
        if producto not in ventas_por_producto:
            ventas_por_producto[producto] = 0
        ventas_por_producto[producto] += venta['cantidad']
    
    producto_top = max(ventas_por_producto, key=ventas_por_producto.get) if ventas_por_producto else 'N/A'
    
    return {
        'total': total_ventas,
        'promedio': promedio,
        'producto_top': producto_top,
        'cantidad_registros': len(ventas),
        'ventas_por_producto': ventas_por_producto
    }


@loggear
def mostrar_resultados(estadisticas):
    print(f"[RESULT] Total de ventas: ${estadisticas['total']:,.2f}")
    print(f"[RESULT] Total de registros: {estadisticas['cantidad_registros']}")
    print(f"[RESULT] Producto mas vendido: {estadisticas['producto_top']}")
    print(f"[RESULT] Promedio por venta: ${estadisticas['promedio']:,.2f}")
    
    print("\n[RESULT] Ventas por producto:")
    for producto, cantidad in estadisticas['ventas_por_producto'].items():
        print(f"  - {producto}: {cantidad} unidades")


@reintentar(max_intentos=3, delay=0.5)
def procesar_con_reintento(archivo):
    print(f"[RETRY-DEMO] Procesando archivo...")
    raise Exception("Simulacion de error")


def main():
    archivo_prueba = 'ventas.csv'
    
    print("=== Procesador de Ventas ===\n")
    
    print("[LOG] Generando datos de prueba...")
    generar_datos_prueba(archivo_prueba, 50)
    print(f"[LOG] Archivo generado: {archivo_prueba}\n")
    
    ventas = procesar_ventas(archivo_prueba)
    
    estadisticas = calcular_estadisticas(ventas)
    
    mostrar_resultados(estadisticas)
    
    print("\n--- Demo de Reintento ---")
    try:
        procesar_con_reintento(archivo_prueba)
    except Exception as e:
        print(f"[ERROR] Despues de reintentos: {str(e)}")


if __name__ == "__main__":
    main()
