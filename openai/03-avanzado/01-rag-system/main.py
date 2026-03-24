from src.rag import VectorStore, RAGSystem

documents = [
    {
        "id": "1",
        "title": "Política de Devoluciones",
        "content": """Nuestra política de devoluciones permite devolver productos dentro de los 30 días posteriores a la compra.
El producto debe estar en su empaque original y sin usar.
Los reembolsos se procesan en 5-7 días hábiles.
No se aceptan devoluciones de productos personalizados.
Los gastos de envío no son reembolsables."""
    },
    {
        "id": "2",
        "title": "Métodos de Pago",
        "content": """Aceptamos los siguientes métodos de pago:
- Tarjetas de crédito: Visa, Mastercard, American Express
- Tarjetas de débito
- PayPal
- Transferencia bancaria
Todas las transacciones son seguras y encriptadas."""
    },
    {
        "id": "3",
        "title": "Envíos y Entregas",
        "content": """Ofrecemos las siguientes opciones de envío:
- Envío estándar (3-5 días): $5.99
- Envío exprés (1-2 días): $12.99
- Envío gratis: En pedidos mayores a $50
Seguimiento disponible para todos los pedidos."""
    },
    {
        "id": "4",
        "title": "Garantía de Productos",
        "content": """Todos nuestros productos tienen garantía de 1 año.
La garantía cubre defectos de fábrica.
No cubre daños por uso indebido o accidentes.
Para reclamar garantía, conserve su factura."""
    }
]

if __name__ == "__main__":
    print("=" * 60)
    print("RAG System - OpenAI")
    print("=" * 60)
    
    print("\n1. Inicializando vector store...")
    vector_store = VectorStore()
    vector_store.add_documents(documents)
    vector_store.generate_embeddings()
    
    print("\n2. Inicializando RAG...")
    rag = RAGSystem(vector_store)
    
    print("\n3. Consultas:")
    preguntas = [
        "¿Cuál es la política de devoluciones?",
        "¿Qué métodos de pago aceptan?",
        "¿Cuánto cuesta el envío exprés?"
    ]
    
    for pregunta in preguntas:
        print(f"\nPregunta: {pregunta}")
        respuesta, docs = rag.query(pregunta)
        print(f"Respuesta: {respuesta}")
        print(f"Documentos: {[d.title for d in docs]}")
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)