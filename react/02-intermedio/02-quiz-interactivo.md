# Ejercicio 2: Quiz Interactivo

## Caso Real
Trabajas en una empresa EdTech. Necesitas crear un quiz interactivo con múltiples categorías, temporizador, scoring y guardado de resultados.

## Requisitos
1. Preguntas de opción múltiple (4 opciones)
2. Temporizador por pregunta (30 segundos)
3. Sistema de puntuación
4. Multiple categorías (Ciencia, Historia, Tecnología, Cultura)
5. Pantalla de resultados finales
6. Reiniciar quiz

## Estructura de Pregunta
```typescript
interface Pregunta {
  id: number
  categoria: string
  pregunta: string
  opciones: string[]
  respuestaCorrecta: number
  explicacion: string
}
```

## Ejemplo de Salida
```
=== QUIZ DE CONOCIMIENTOS ===
Categoría: CIENCIA | Pregunta 3/10
⏱️ Tiempo: 15s

¿En qué año se descubrió la penicilina?
A) 1928
B) 1915
C) 1940
D) 1950

[ A ] [ B ] [ C ] [ D ]

--- Puntuación: 70/100 ---
```

## Estructura de Archivos
```
02-quiz-interactivo/
├── src/
│   ├── data/
│   │   └── preguntas.ts
│   ├── components/
│   │   ├── Quiz.tsx
│   │   ├── Pregunta.tsx
│   │   ├── Temporizador.tsx
│   │   └── Resultados.tsx
│   ├── types/
│   │   └── index.ts
│   ├── hooks/
│   │   └── useQuiz.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Pistas
- Usa `useState` para estado del quiz
- Usa `useEffect` para el temporizador
- Crea un hook personalizado para la lógica del quiz
- Usa `useCallback` para optimizar

## Conceptos a Practicar
- useEffect con cleanup
- Gestión de estado compleja
- Conditional rendering avanzado
- TypeScript strict mode

## Desafío Extra
- Añade modo competitivo (vs tiempo)
- Implementa ranking de puntuaciones
- Añade animaciones con Framer Motion
- Soporta preguntas de verdadero/falso
