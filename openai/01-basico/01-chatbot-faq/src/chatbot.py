import os
from openai import OpenAI
from typing import List, Dict

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


class ChatbotFAQ:
    def __init__(self, system_prompt: str, context: str):
        self.messages = [
            {"role": "system", "content": f"{system_prompt}\n\n{context}"}
        ]
    
    def add_message(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})
    
    def chat(self, user_input: str, temperature: float = 0.7, max_tokens: int = 500) -> str:
        self.add_message("user", user_input)
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=self.messages,
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        assistant_response = response.choices[0].message.content
        self.add_message("assistant", assistant_response)
        
        return assistant_response
    
    def chat_stream(self, user_input: str, temperature: float = 0.7, max_tokens: int = 500) -> str:
        self.add_message("user", user_input)
        
        stream = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=self.messages,
            stream=True,
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        full_response = ""
        for chunk in stream:
            if chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                full_response += content
        
        self.add_message("assistant", full_response)
        return full_response
    
    def reset(self):
        self.messages = [self.messages[0]]


SYSTEM_PROMPT = """Eres un asistente de atención al cliente para una tienda de tecnología.
Responde de manera amigable y concisa.
Solo habla sobre nuestros productos: laptops, smartphones, tablets, y accesorios.
Si te preguntan sobre algo fuera de estos temas, redirige amablemente."""

FAQ_CONTEXT = """
Nuestros productos:
- Laptops: Desde $499 hasta $1999
- Smartphones: Desde $299 hasta $1299
- Tablets: Desde $249 hasta $899
- Accesorios: Cargadores, audífonos, fundas (desde $19)

Envío: Gratis en pedidos mayores a $50
Devoluciones: 30 días sin costo
Garantía: 1 año en todos los productos
"""

chatbot = ChatbotFAQ(SYSTEM_PROMPT, FAQ_CONTEXT)

if __name__ == "__main__":
    response = chatbot.chat("¿Cuál es el precio de la laptop más cara?")
    print(f"Usuario: ¿Cuál es el precio de la laptop más cara?")
    print(f"Asistente: {response}")