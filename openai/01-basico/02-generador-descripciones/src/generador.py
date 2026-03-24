import os
from openai import OpenAI
from typing import List, Dict, Optional

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


class GeneradorDescripciones:
    def __init__(self):
        self.system_prompt = "Eres un experto redactor de descripciones de productos para e-commerce."
    
    def generar(self, producto: str, caracteristicas: str, tono: str = "profesional") -> str:
        prompt = f"""Genera una descripción de producto para e-commerce.

Producto: {producto}
Características: {caracteristicas}
Tono: {tono}

La descripción debe:
- Tener entre 100-150 palabras
- Incluir título atractivo
- Mencionar 3-5 características principales
- Incluir llamada a la acción
- Estar optimizada para SEO (incluir palabras clave naturales)

Formato de salida:
Título:
Descripción:
Palabras clave:"""

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            max_tokens=600
        )
        
        return response.choices[0].message.content
    
    def generar_multiples(self, producto: str, caracteristicas: str) -> Dict[str, str]:
        prompt = f"""Genera 3 versiones de descripción para el mismo producto, cada una con un tono diferente:

Producto: {producto}
Características: {caracteristicas}

Tonos a usar:
1. Profesional/Técnico - Enfocado en especificaciones
2. Casual/Amigable - Dirigido a consumidores normales
3. Premium/Lujo - Posicionamiento de alta gama

Formato:
[TONO 1: Profesional]
Título:
Descripción:

[TONO 2: Casual]
Título:
Descripción:

[TONO 3: Premium]
Título:
Descripción:"""

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            max_tokens=1000
        )
        
        return {"multiples": response.choices[0].message.content}
    
    def generar_social(self, producto: str, caracteristicas: str, red_social: str = "Instagram") -> str:
        prompt = f"""Genera contenido para {red_social} sobre este producto:

Producto: {producto}
Caracteristicas: {caracteristicas}

Incluye:
- Caption (texto principal)
- 3-5 hashtags relevantes
- 3 emojis relevantes

Red social: {red_social}"""

        max_tokens = 400 if red_social == "Instagram" else 300 if red_social == "Twitter" else 500
        
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Eres un experto en marketing de redes sociales."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.9,
            max_tokens=max_tokens
        )
        
        return response.choices[0].message.content
    
    def generar_batch(self, productos: List[Dict[str, str]], tono: str = "profesional") -> str:
        prompt = f"Genera descripciones breves (50 palabras cada una) para estos productos.\n\n"
        
        for i, p in enumerate(productos, 1):
            prompt += f"\n{i}. {p['nombre']}\n   Características: {p['caracteristicas']}\n"
        
        prompt += f"\nTono: {tono}"
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Eres un experto redactor de e-commerce."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        return response.choices[0].message.content


generador = GeneradorDescripciones()