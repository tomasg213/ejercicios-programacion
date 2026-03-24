---
title: "Guía de Estilos para CSS Moderno"
date: "2024-01-25"
category: "Diseño"
tags: ["css", "frontend", "diseno"]
excerpt: "Aprende las mejores prácticas y técnicas modernas para escribir CSS limpio y mantenible."
---

# Guía de Estilos para CSS Moderno

El CSS ha evolucionado significativamente. Hoy tenemos herramientas y técnicas que facilitan enormemente el desarrollo deInterfaces atractivas.

## Variables CSS

Las variables permiten definir valores reutilizables:

```css
:root {
  --color-primary: #2563eb
  --color-secondary: #1e40af
  --spacing-md: 1rem
}

.button {
  background: var(--color-primary)
  padding: var(--spacing-md)
}
```

## Flexbox

Flexbox es ideal para layouts unidimensionales:

```css
.container {
  display: flex
  justify-content: center
  align-items: center
  gap: 1rem
}
```

## CSS Grid

CSS Grid es perfecto para layouts bidimensionales:

```css
.grid {
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: 1.5rem
}
```

## Selectores Modernos

```css
/* Selector :not() */
button:not(.primary) {
  background: gray
}

/* Selectores :is() y :where() */
:is(header, footer) nav a {
  color: blue
}
```

## Conclusión

CSS moderno nos permite escribir código más limpio, mantenible y flexible. Domina estas técnicas y tus proyectos mejorarán significativamente.
