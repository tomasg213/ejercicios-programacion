# Ejercicio 3: Sistema de Gestión de Productos (POO)

## Caso Real
Trabajas en un e-commerce. Necesitas un sistema para gestionar el catálogo de productos con descuentos y categorías.

## Modelos

### Producto
```javascript
{
  id: string,
  nombre: string,
  precio: number,
  categoria: string,
  stock: number
}
```

### Descuento
```javascript
{
  tipo: 'porcentaje' | 'fijo',
  valor: number,  // 20 para 20%, o 10 para $10 de descuento
  productoId: string
}
```

## Requisitos
1. Clase `Producto` con métodos:
   - `aplicarDescuento(porcentaje)`
   - `actualizarStock(cantidad)`
   - `obtenerPrecioFinal(descuento)`
2. Clase `Tienda` con métodos:
   - `agregarProducto(producto)`
   - `buscarPorCategoria(categoria)`
   - `obtenerInventario()`
   - `venderProducto(id, cantidad)`
3. Calcular valor total del inventario
4. Aplicar descuentos correctamente

## Ejemplo de Salida
```
=== Sistema de Gestion de Productos ===

Inventario actual:
- Laptop HP (Electronica) - Stock: 10 - $699.99
- Camisa Nike (Ropa) - Stock: 25 - $49.99
- Cafe Premium (Alimentos) - Stock: 50 - $12.99

Productos Electronica:
1. Laptop HP - $699.99

Venta realizada: Laptop HP x 2 = $1,399.98
Stock actualizado: 8
```

## Pistas
- Usa clases con `constructor`
- Métodos getters/setters con `get` y `set`
- Validaciones en setters
- `toFixed(2)` para formatear moneda

## Conceptos a Practicar
- Clases y objetos
- Encapsulamiento
- Métodos estáticos
- Herencia (opcional)
- Validación de datos
