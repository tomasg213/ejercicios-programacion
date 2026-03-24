"""
OpenAI - Ejercicio 3: Asistente con Function Calling
=====================================================
Asistente que puede realizar acciones usando function calling
"""

import os
import json
from datetime import datetime
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

print("=" * 60)
print("Ejercicio 3: Function Calling")
print("=" * 60)

# ============================================
# 1. DEFINIR FUNCIONES
# ============================================
print("\n1. DEFINIENDO HERRAMIENTAS")
print("-" * 40)

tools = [
    {
        "type": "function",
        "function": {
            "name": "obtener_clima",
            "description": "Obtiene el clima actual de una ciudad",
            "parameters": {
                "type": "object",
                "properties": {
                    "ciudad": {
                        "type": "string",
                        "description": "Nombre de la ciudad"
                    },
                    "unidad": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Unidad de temperatura"
                    }
                },
                "required": ["ciudad"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "crear_recordatorio",
            "description": "Crea un recordatorio en el sistema",
            "parameters": {
                "type": "object",
                "properties": {
                    "titulo": {
                        "type": "string",
                        "description": "Título del recordatorio"
                    },
                    "fecha": {
                        "type": "string",
                        "description": "Fecha y hora del recordatorio (YYYY-MM-DD HH:MM)"
                    },
                    "prioridad": {
                        "type": "string",
                        "enum": ["alta", "media", "baja"],
                        "description": "Prioridad del recordatorio"
                    }
                },
                "required": ["titulo", "fecha"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "buscar_producto",
            "description": "Busca un producto en el inventario",
            "parameters": {
                "type": "object",
                "properties": {
                    "nombre": {
                        "type": "string",
                        "description": "Nombre del producto a buscar"
                    },
                    "categoria": {
                        "type": "string",
                        "enum": ["electronica", "accesorios", "audio", "oferta"],
                        "description": "Categoría del producto"
                    }
                }
            }
        }
    }
]

# ============================================
# 2. IMPLEMENTAR FUNCIONES
# ============================================
print("\n2. IMPLEMENTANDO FUNCIONES")
print("-" * 40)

def obtener_clima(ciudad, unidad="celsius"):
    """Simula obtener el clima de una API"""
    climas = {
        "madrid": {"temp": 22, "condicion": "Soleado"},
        "barcelona": {"temp": 20, "condicion": "Parcialmente nublado"},
        "sevilla": {"temp": 28, "condicion": "Caluroso"},
        "valencia": {"temp": 24, "condicion": "Despejado"}
    }
    
    clima = climas.get(ciudad.lower(), {"temp": 20, "condicion": "Desconocido"})
    temp = clima["temp"]
    
    if unidad == "fahrenheit":
        temp = temp * 9/5 + 32
        unidad = "°F"
    else:
        unidad = "°C"
    
    return f"El clima en {ciudad.title()} es {clima['condicion']} con {temp}{unidad}"

def crear_recordatorio(titulo, fecha, prioridad="media"):
    """Simula crear un recordatorio"""
    recordatorio = {
        "id": f"rem_{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "titulo": titulo,
        "fecha": fecha,
        "prioridad": prioridad,
        "creado": datetime.now().isoformat()
    }
    print(f"[Sistema] Recordatorio creado: {json.dumps(recordatorio, indent=2)}")
    return f"Recordatorio '{titulo}' creado para {fecha} con prioridad {prioridad}"

def buscar_producto(nombre=None, categoria=None):
    """Simula búsqueda en inventario"""
    productos = [
        {"id": 1, "nombre": "Laptop HP", "categoria": "electronica", "precio": 599},
        {"id": 2, "nombre": "Mouse Inalámbrico", "categoria": "accesorios", "precio": 29},
        {"id": 3, "nombre": "Auriculares Sony", "categoria": "audio", "precio": 149},
        {"id": 4, "nombre": "Monitor Dell", "categoria": "electronica", "precio": 299},
    ]
    
    resultados = productos
    
    if nombre:
        resultados = [p for p in resultados if nombre.lower() in p["nombre"].lower()]
    if categoria:
        resultados = [p for p in resultados if p["categoria"] == categoria]
    
    return resultados

# ============================================
# 3. ASISTENTE CON FUNCTION CALLING
# ============================================
print("\n3. ASISTENTE INTELIGENTE")
print("-" * 40)

def asistente(pregunta):
    messages = [
        {"role": "system", "content": """Eres un asistente virtual helpful. 
Tienes acceso a las siguientes herramientas:
- obtener_clima: Para consultar el clima de ciudades
- crear_recordatorio: Para crear recordatorios
- buscar_producto: Para buscar en el inventario

Responde de manera amigable. Si el usuario quiere hacer algo que puedas hacer con las herramientas, házlo."""},
        {"role": "user", "content": pregunta}
    ]
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )
    
    response_message = response.choices[0].message
    
    # Verificar si hay llamada a función
    if response_message.tool_calls:
        print(f"[Debug] El modelo quiere llamar a: {[tc.function.name for tc in response_message.tool_calls]}")
        
        # Ejecutar las funciones
        tool_results = []
        
        for tool_call in response_message.tool_calls:
            function_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)
            
            print(f"[Debug] Ejecutando {function_name} con {arguments}")
            
            if function_name == "obtener_clima":
                result = obtener_clima(**arguments)
            elif function_name == "crear_recordatorio":
                result = crear_recordatorio(**arguments)
            elif function_name == "buscar_producto":
                result = buscar_producto(**arguments)
            else:
                result = "Función desconocida"
            
            tool_results.append({
                "tool_call_id": tool_call.id,
                "function_name": function_name,
                "result": result
            })
        
        # Agregar respuesta del asistente
        messages.append(response_message)
        
        # Agregar resultados de las funciones
        for tr in tool_results:
            messages.append({
                "role": "tool",
                "tool_call_id": tr["tool_call_id"],
                "content": str(tr["result"])
            })
        
        # Obtener respuesta final
        final_response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=messages
        )
        
        return final_response.choices[0].message.content
    
    return response_message.content

# ============================================
# 4. PRUEBAS
# ============================================
print("\n4. PRUEBAS")
print("-" * 40)

preguntas = [
    "¿Qué clima hace en Madrid?",
    "Busca productos de audio",
    "Créame un recordatorio para mañana a las 10am: Reunión con el equipo",
    "¿Tienes laptops en oferta?"
]

for pregunta in preguntas:
    print(f"\nUsuario: {pregunta}")
    respuesta = asistente(pregunta)
    print(f"Asistente: {respuesta}")

print("\n" + "=" * 60)
print("¡Ejercicio completado!")
print("=" * 60)
