from src.chatbot import chatbot, SYSTEM_PROMPT, FAQ_CONTEXT

if __name__ == "__main__":
    print("=" * 60)
    print("Chatbot FAQ - OpenAI")
    print("=" * 60)
    
    print("\n1. Chat básico:")
    response = chatbot.chat("¿Cuál es el precio de la laptop más cara?")
    print(f"Usuario: ¿Cuál es el precio de la laptop más cara?")
    print(f"Asistente: {response}")
    
    print("\n2. Chat con streaming:")
    full_response = chatbot.chat_stream("¿Hacen envíos a provincia?")
    print(f"Usuario: ¿Hacen envíos a provincia?")
    print(f"Asistente: {full_response}")
    
    print("\n3. Conversación seguida:")
    response = chatbot.chat("¿Cuánto tarda el envío?")
    print(f"Usuario: ¿Cuánto tarda el envío?")
    print(f"Asistente: {response}")
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)