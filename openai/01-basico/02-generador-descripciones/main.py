from src.generador import generador

if __name__ == "__main__":
    producto = "Auriculares Inalámbricos ProSound X1"
    caracteristicas = """
- Bluetooth 5.2
- Cancelación de ruido activa
- 30 horas de batería
- Carga rápida (10 min = 3 horas)
- Micrófono integrado
- Plegables y ligeros
"""
    
    print("=" * 60)
    print("Generador de Descripciones - OpenAI")
    print("=" * 60)
    
    print("\n1. Descripción básica:")
    descripcion = generador.generar(producto, caracteristicas)
    print(f"Producto: {producto}")
    print(descripcion)
    
    print("\n2. Múltiples tonos:")
    multiples = generador.generar_multiples(producto, caracteristicas)
    print(multiples["multiples"])
    
    print("\n3. Redes sociales:")
    for red in ["Instagram", "Twitter"]:
        print(f"\n{red}:")
        post = generador.generar_social(producto, caracteristicas, red)
        print(post)
    
    print("\n4. Batch generator:")
    productos = [
        {"nombre": "Laptop UltraBook 15", "caracteristicas": "Pantalla 4K, Intel i7, 16GB RAM"},
        {"nombre": "Smartwatch FitTrack", "caracteristicas": "GPS, ritmo cardíaco, 7 días batería"},
    ]
    batch = generador.generar_batch(productos)
    print(batch)
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)