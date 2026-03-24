"""
Ejercicio 4: Calculadora de Estadísticas de Ventas

Departamento de ventas - Análisis de métricas.
"""

ventas = [150, 200, 175, 300, 250, 180, 220, 190, 210, 240, 160, 200]


def calcular_estadisticas(datos):
    total = sum(datos)
    promedio = total / len(datos)
    maxima = max(datos)
    minima = min(datos)
    arriba_promedio = len([v for v in datos if v > promedio])
    ranking = sorted(datos, reverse=True)
    
    return {
        'total': total,
        'promedio': promedio,
        'maxima': maxima,
        'minima': minima,
        'arriba_promedio': arriba_promedio,
        'ranking': ranking
    }


def formatear_moneda(valor):
    return f"${valor:,.2f}"


def main():
    print("=== Estadisticas de Ventas ===")
    print(f"Datos: {ventas}")
    
    stats = calcular_estadisticas(ventas)
    
    print("\n--- Resultados ---")
    print(f"Total de ventas: {formatear_moneda(stats['total'])}")
    print(f"Promedio: {formatear_moneda(stats['promedio'])}")
    print(f"Venta maxima: {formatear_moneda(stats['maxima'])}")
    print(f"Venta minima: {formatear_moneda(stats['minima'])}")
    print(f"Ventas arriba del promedio: {stats['arriba_promedio']}")
    
    print("\n--- Ranking (mayor a menor) ---")
    for i, venta in enumerate(stats['ranking'], 1):
        print(f"{i}. {formatear_moneda(venta)}")


if __name__ == "__main__":
    main()
