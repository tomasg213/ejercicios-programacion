# Ejercicio 1: Generador de Logs de Aplicación

## Caso Real
Trabajas en DevOps. Necesitas crear un sistema de logging para registrar eventos de una aplicación en producción.

## Tipos de Log
| Nivel | Color | Uso |
|-------|-------|-----|
| INFO | Azul | Eventos normales (inicio, fin de procesos) |
| WARNING | Amarillo | Situaciones inesperadas pero manejables |
| ERROR | Rojo | Fallos que requieren atención |

## Estructura del Log
```
[TIMESTAMP] [NIVEL] Mensaje
Ejemplo: [2024-01-15 14:32:01] [INFO] Servidor iniciado en puerto 3000
```

## Requisitos
1. Crear función `log(nivel, mensaje)` que escriba en consola
2. Crear función `logToFile(nivel, mensaje)` que guarde en archivo
3. Los logs deben guardarse en `logs/app.log`
4. Crear una clase `Logger` con métodos便捷
5. Implementar rotación simple (nuevo archivo por día)

## Ejemplo de Salida Consola
```
[2024-01-15 14:32:01] [INFO] Aplicacion iniciada
[2024-01-15 14:32:05] [WARNING] Intento de acceso sin autenticacion
[2024-01-15 14:32:10] [ERROR] Fallo al conectar con base de datos
```

## Estructura de Archivos
```
proyecto/
├── logger.js
├── app.js
└── logs/
    └── 2024-01-15.log
```

## Pistas
- `fs.appendFileSync()` para escribir archivos
- `path.join()` para rutas
- `new Date().toISOString()` para timestamps
- `fs.existsSync()` para verificar si existe
- Crea la carpeta `logs/` si no existe con `fs.mkdirSync()`

## Conceptos a Practicar
- Módulos fs y path
- Clases en JavaScript
- Formateo de fechas
- Manejo de errores try/catch
- Estructura de proyecto modular
