import os
from datetime import datetime
from typing import List, Dict, Optional
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


class ChatMemory:
    def __init__(self, max_messages: int = 20):
        self.messages: List[Dict] = []
        self.max_messages = max_messages
        self.user_info: Dict = {}
        self.summary: str = ""
    
    def add_message(self, role: str, content: str):
        self.messages.append({
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat()
        })
        
        if len(self.messages) > self.max_messages:
            self.summarize()
    
    def summarize(self):
        if len(self.messages) < 5:
            return
        
        summary_prompt = f"""Resume esta conversación de chat de manera concisa.
Incluye:
- Tema principal
- Información importante del usuario
- Decisiones o acciones tomadas

Conversación:
{chr(10).join([f"{m['role']}: {m['content']}" for m in self.messages[:10]])}"""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": summary_prompt}],
            max_tokens=200
        )
        
        self.summary = response.choices[0].message.content
        self.messages = [{"role": "system", "content": f"Resumen previo: {self.summary}"}] + self.messages[-5:]
    
    def get_context(self) -> List[Dict]:
        return self.messages
    
    def update_user_info(self, info: Dict):
        self.user_info.update(info)
    
    def clear(self):
        self.messages = []
        self.user_info = {}
        self.summary = ""


class SmartAssistant:
    def __init__(self, system_prompt: str = None):
        self.memory = ChatMemory()
        self.system_prompt = system_prompt or """Eres un asistente personal inteligente.
Mantienes contexto de las conversaciones previas.
Recuerdas preferencias del usuario y detalles importantes.
Respondes de manera amigable y personalizada."""
    
    def chat(self, user_input: str) -> str:
        self.memory.add_message("user", user_input)
        self.extract_user_info(user_input)
        
        messages = [
            {"role": "system", "content": self.build_system_prompt()}
        ]
        messages.extend(self.memory.get_context())
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.8,
            max_tokens=500
        )
        
        assistant_response = response.choices[0].message.content
        self.memory.add_message("assistant", assistant_response)
        
        return assistant_response
    
    def build_system_prompt(self) -> str:
        prompt = self.system_prompt
        
        if self.memory.user_info:
            prompt += "\n\nInformación del usuario:\n"
            for key, value in self.memory.user_info.items():
                prompt += f"- {key}: {value}\n"
        
        return prompt
    
    def extract_user_info(self, text: str):
        text_lower = text.lower()
        
        if "me llamo" in text_lower:
            parts = text_lower.split("me llamo")
            if len(parts) > 1:
                name = parts[1].strip().split()[0]
                self.memory.update_user_info({"nombre": name.title()})
        
        if "vivo en" in text_lower:
            parts = text_lower.split("vivo en")
            if len(parts) > 1:
                location = parts[1].strip().split()[0]
                self.memory.update_user_info({"ubicación": location.title()})
    
    def reset(self):
        self.memory.clear()


class LongTermMemory:
    def __init__(self):
        self.facts: List[Dict] = []
        self.preferences: Dict = {}
    
    def add_fact(self, fact: str, category: str = "general"):
        self.facts.append({
            "fact": fact,
            "category": category,
            "timestamp": datetime.now().isoformat()
        })
    
    def get_relevant_facts(self, query: str) -> str:
        prompt = f"""De los siguientes hechos, selecciona los relevantes para la consulta.
Si no hay ninguno relevante, responde "Ninguno".

Hechos:
{chr(10).join([f'- {f["fact"]}' for f in self.facts])}

Consulta: {query}"""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200
        )
        
        return response.choices[0].message.content