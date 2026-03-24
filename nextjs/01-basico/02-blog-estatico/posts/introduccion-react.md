---
title: "Introducción a React"
date: "2024-01-15"
category: "Tutoriales"
tags: ["react", "javascript", "frontend"]
excerpt: "Aprende los conceptos básicos de React, la librería más popular para construir interfaces de usuario."
---

# Introducción a React

React es una librería JavaScript para construir interfaces de usuario. Fue desarrollada por Facebook y se ha convertido en una de las herramientas más populares para el desarrollo frontend.

## Componentes

Los componentes son la base de React. Nos permiten reutilizar código y crear interfaces modulares.

```jsx
function Saludo({ nombre }) {
  return <h1>Hola, {nombre}!</h1>
}
```

## JSX

JSX es una extensión de sintaxis que permite escribir HTML dentro de JavaScript.

## Estado y Props

- **Props**: Datos que se pasan de componente padre a hijo
- **Estado**: Datos que cambian dentro de un componente

## Hooks

Los hooks permiten usar estado y otras características de React sin escribir clases.

```jsx
import { useState } from 'react'

function Contador() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  )
}
```

## Conclusión

React nos permite crear aplicaciones interactivas y dinámicas de manera eficiente. En futuros posts profundizaremos en más conceptos avanzados.
