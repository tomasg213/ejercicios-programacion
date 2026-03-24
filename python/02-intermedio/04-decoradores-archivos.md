# Ejercicio 4: Decoradores y Processing de Archivos

## Caso Real
Trabajas en data engineering. Necesitas procesar grandes archivos CSV y aplicar transformaciones de manera eficiente con logging y medición de tiempo.

## Problema
Procesar archivos CSV de ventas con:
1. **Medición de tiempo**: Cuánto tarda cada operación
2. **Logging**: Registrar qué se procesa
3. **Validación**: Verificar datos antes de procesar
4. **Retry**: Reintentar operaciones fallidas

## Requisitos
1. Crear decorador `@medir_tiempo` que registre duración
2. Crear decorador `@loggear` que registre llamadas
3. Crear decorador `@reintentar` para reintentar en caso de error
4. Función para procesar CSV y calcular estadísticas
5. Generar datos de prueba

## Archivo CSV de Entrada
```csv
fecha,producto,cantidad,precio
2024-01-15,Laptop,2,999.99
2024-01-15,Mouse,10,29.99
2024-01-16,Teclado,5,79.99
```

## Salida Esperada
```
[LOG] Iniciando procesamiento de archivo: ventas.csv
[LOG] Total de registros: 3
[TIME] Procesamiento completado en 0.045 segundos
[RESULT] Ventas totales: $2,349.91
[RESULT] Producto más vendido: Laptop
[RESULT] Promedio por venta: $783.30
```

## Pistas
- Los decoradores reciben la función original como argumento
- `*args, **kwargs` para pasar cualquier argumento
- `time.time()` para medir tiempo
- `functools.wraps` preserva el nombre de la función
- Genéricos (`typing`) para mejor tipado

## Conceptos a Practicar
- Decoradores
- Closures
- Args y kwargs
- Manejo de archivos CSV
- contextlib
- Type hints
