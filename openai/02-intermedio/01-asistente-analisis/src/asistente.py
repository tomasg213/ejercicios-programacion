import os
import json
from typing import List, Dict, Callable, Any
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


class Tool:
    def __init__(self, name: str, description: str, function: Callable):
        self.name = name
        self.description = description
        self.function = function
    
    def execute(self, **kwargs) -> Any:
        return self.function(**kwargs)


class FunctionCaller:
    def __init__(self):
        self.tools: List[Tool] = []
        self.system_prompt = """Eres un asistente de análisis de datos.
Puedes usar herramientas para realizar análisis.
Cuando necesites usar una herramienta, specifies la herramienta a usar y sus argumentos."""
    
    def add_tool(self, tool: Tool):
        self.tools.append(tool)
    
    def call(self, user_input: str, context: Dict = None) -> str:
        tools_schema = [
            {
                "type": "function",
                "function": {
                    "name": tool.name,
                    "description": tool.description,
                    "parameters": {"type": "object", "properties": {}}
                }
            }
            for tool in self.tools
        ]
        
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": user_input}
        ]
        
        if context:
            messages.insert(1, {"role": "system", "content": f"Contexto: {json.dumps(context)}"})
        
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            tools=tools_schema or None,
            temperature=0.3
        )
        
        if response.choices[0].message.tool_calls:
            tool_call = response.choices[0].message.tool_calls[0]
            tool_name = tool_call.function.name
            tool_args = json.loads(tool_call.function.arguments) if tool_call.function.arguments else {}
            
            for tool in self.tools:
                if tool.name == tool_name:
                    result = tool.execute(**tool_args)
                    return f"Resultado: {result}"
        
        return response.choices[0].message.content


def analyze_sales(data: List[Dict]) -> Dict:
    total = sum(d.get("ventas", 0) for d in data)
    avg = total / len(data) if data else 0
    return {"total": total, "promedio": avg, "registros": len(data)}

def calculate_growth(current: float, previous: float) -> Dict:
    if previous == 0:
        return {"crecimiento": 0, "porcentaje": 0}
    growth = current - previous
    percentage = (growth / previous) * 100
    return {"crecimiento": growth, "porcentaje": round(percentage, 2)}


if __name__ == "__main__":
    print("=" * 60)
    print("Asistente de Análisis - OpenAI")
    print("=" * 60)
    
    assistant = FunctionCaller()
    
    sales_data = [
        {"mes": "Enero", "ventas": 10000},
        {"mes": "Febrero", "ventas": 12000},
        {"mes": "Marzo", "ventas": 15000}
    ]
    
    print("\n1. Analizando ventas...")
    result = analyze_sales(sales_data)
    print(f"Análisis: {result}")
    
    print("\n2. Calculando crecimiento...")
    growth = calculate_growth(15000, 10000)
    print(f"Crecimiento: {growth}")
    
    print("\n" + "=" * 60)
    print("¡Completado!")
    print("=" * 60)