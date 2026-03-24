# Ejercicio 1: Gestor de Configuración (JSON)

## Caso Real
Trabajas en una startup. Necesitas un sistema de configuración para diferentes ambientes (desarrollo, staging, producción) que se cargue desde archivos JSON.

## Estructura de Configuración
```json
{
  "app": {
    "nombre": "Mi Aplicacion",
    "version": "1.0.0",
    "debug": true
  },
  "database": {
    "host": "localhost",
    "puerto": 5432,
    "nombre": "mi_db"
  },
  "api": {
    "timeout": 30,
    "rate_limit": 100
  }
}
```

## Requisitos
1. Crear clase `Config` que cargue desde archivo JSON
2. Método `cargar(archivo)` para leer configuración
3. Método `obtener(ruta)` para acceder a valores anidados (ej: `config.obtener('database.host')`)
4. Método `guardar(archivo)` para persistir cambios
5. Soporte para múltiples ambientes
6. Valores por defecto si no existen

## Estructura de Archivos
```
proyecto/
├── config/
│   ├── desarrollo.json
│   ├── produccion.json
│   └── local.json
├── config_manager.py
└── main.py
```

## Ejemplo de Uso
```python
config = Config()
config.cargar('config/desarrollo.json')

print(config.obtener('app.nombre'))        # "Mi Aplicacion"
print(config.obtener('database.host'))     # "localhost"
print(config.obtener('api.timeout'))       # 30

config.establecer('app.debug', False)
config.guardar()
```

## Pistas
- `json.load()` y `json.dump()` para leer/escribir
- Divide la ruta con `.split('.')` para acceder anidado
- `os.path.join()` para rutas de archivo
- Usa diccionarios anidados, no clases

## Conceptos a Practicar
- Archivos JSON
- Clases y métodos
- Diccionarios anidados
- Manejo de archivos
- Parámetros opcionales
