from src.memoria import SmartAssistant, LongTermMemory

if __name__ == "__main__":
    print("=" * 60)
    print("Chat con Memoria - OpenAI")
    print("=" * 60)
    
    print("\n1. Conversación con memoria:")
    assistant = SmartAssistant()
    
    conversation = [
        "Hola, me llamo Juan",
        "¿Cómo estás?",
        "Vivo en Madrid",
        "¿Cuál es mi nombre?",
        "¿Dónde vivo?"
    ]
    
    for msg in conversation:
        print(f"\nUsuario: {msg}")
        response = assistant.chat(msg)
        print(f"Asistente: {response}")
    
    print("\n2. Memoria a largo plazo:")
    ltm = LongTermMemory()
    ltm.add_fact("Juan trabaja como desarrollador", "trabajo")
    ltm.add_fact("Juan prefiere café sobre té", "preferencia")
    ltm.add_fact("Juan vive en Madrid", "personal")
    
    print(f"Hechos relevantes: {ltm.get_relevant_facts('¿Qué sabe Juan de bebidas?')}")
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)