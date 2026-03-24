# Chatbot FAQ con OpenAI

## Requisitos
1. API key de OpenAI
2. Context management
3. Streaming responses

## Código
```python
from openai import OpenAI

client = OpenAI(api_key="tu-api-key")

FAQ = """
Q: ¿Cuáles son los horarios?
A: Estamos abiertos 9am-6pm

Q: ¿Tienen garantía?
A: Sí, 1 año de garantía

Q: ¿Envían internacionalmente?
A: Sí, a más de 50 países
"""

def get_response(pregunta):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": f"Eres un FAQ bot. Usa esta info:\n{FAQ}"},
            {"role": "user", "content": pregunta}
        ],
        stream=True
    )
    
    for chunk in response:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="")

get_response("¿Tienen garantía?")
```
