"""
Ejercicio 1: Calculadora de Presupuesto Personal

Finanzas personales - Análisis de equilibrio presupuestario.
"""

def calcular_porcentaje(valor, total):
    return (valor / total) * 100

def analizar_presupuesto(ingreso, esenciales, entretenimiento):
    total_gastos = esenciales + entretenimiento
    ahorro = ingreso - total_gastos
    porcentaje_ahorro = calcular_porcentaje(ahorro, ingreso)
    porcentaje_esenciales = calcular_porcentaje(esenciales, ingreso)
    porcentaje_entrenamiento = calcular_porcentaje(entretenimiento, ingreso)
    
    es_saludable = (
        porcentaje_esenciales <= 50 and
        porcentaje_entrenamiento <= 30 and
        porcentaje_ahorro >= 20
    )
    
    return {
        'ingreso': ingreso,
        'total_gastos': total_gastos,
        'ahorro': ahorro,
        'porcentaje_ahorro': porcentaje_ahorro,
        'porcentaje_esenciales': porcentaje_esenciales,
        'porcentaje_entrenamiento': porcentaje_entrenamiento,
        'es_saludable': es_saludable
    }

def main():
    print("=== Calculadora de Presupuesto ===")
    ingreso = float(input("Ingreso mensual: $"))
    
    if ingreso <= 0:
        print("Error: El ingreso debe ser positivo")
        return
    
    esenciales = float(input("Gastos esenciales (alquiler, comida): $"))
    entretenimiento = float(input("Gastos entretenimiento: $"))
    
    if esenciales < 0 or entretenimiento < 0:
        print("Error: Los gastos no pueden ser negativos")
        return
    
    resultado = analizar_presupuesto(ingreso, esenciales, entretenimiento)
    
    print("\n=== Análisis ===")
    print(f"Ingreso: ${resultado['ingreso']:.2f}")
    print(f"Total gastos: ${resultado['total_gastos']:.2f}")
    print(f"Ahorro: ${resultado['ahorro']:.2f} ({resultado['porcentaje_ahorro']:.2f}%)")
    
    print(f"\nEstado: {'SALUDABLE ✓' if resultado['es_saludable'] else 'ALERTA ⚠'}")
    print(f"- Gastos esenciales: {resultado['porcentaje_esenciales']:.2f}% (límite: 50%)")
    print(f"- Entretenimiento: {resultado['porcentaje_entrenamiento']:.2f}% (límite: 30%)")
    print(f"- Ahorro: {resultado['porcentaje_ahorro']:.2f}% (mínimo: 20%)")
    
    if resultado['es_saludable']:
        print("\nRecomendación: ¡Buen trabajo! Estás ahorrando bien.")
    else:
        print("\nRecomendación: Revisa tus gastos para mejorar tu situación.")

if __name__ == "__main__":
    main()
