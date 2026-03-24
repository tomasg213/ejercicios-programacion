# Ejercicio 1: Contador y Carrito de Compras

## Caso Real
Trabajas en el frontend de un e-commerce. Necesitas crear un componente de contador para cantidad de productos y un mini-carrito que muestre los items seleccionados.

## Requisitos
1. Componente `Contador` con botones +/- y valor inicial
2. Componente `Producto` que use el Contador
3. Componente `Carrito` que liste productos agregados
4. Botón "Agregar al carrito" que actualice el total
5. Mostrar total de items y precio final

## Ejemplo de Salida
```
=== Carrito de Compras ===

[Producto: Camisa] [$29.99]
  Cantidad: [ - ] 2 [ + ]  [Eliminar]

[Producto: Pantalón] [$49.99]
  Cantidad: [ - ] 1 [ + ]  [Eliminar]

==========================
Total items: 3
Total precio: $109.97
```

## Estructura de Archivos
```
01-contador-carrito/
├── src/
│   ├── components/
│   │   ├── Contador.jsx
│   │   ├── Producto.jsx
│   │   ├── Carrito.jsx
│   │   └── CarritoProvider.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Pistas
- Usa `useState` para el estado del contador y carrito
- Crea un Context para compartir el carrito entre componentes
- Usa `useContext` para acceder al carrito

## Conceptos a Practicar
- useState hook
- Props y prop drilling
- Context API básico
- Event handling

## Desafío Extra
- Agrega persistencia con localStorage
- Implementa validación de stock máximo (10 por producto)
