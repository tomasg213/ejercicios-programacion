# Ejercicio 2: Editor de Notas Colaborativo

## Caso Real
Trabajas en una herramienta de productividad. Necesitas crear un editor de notas con colaboración en tiempo real (simulada), markdown, y sincronización.

## Requisitos
1. Crear, editar y eliminar notas
2. Soporte básico de markdown (bold, italic, listas)
3. Previsualización de markdown
4. Notas con título y contenido
5. Búsqueda de notas
6. Persistencia local con sync simulado

## Estructura de Nota
```typescript
interface Nota {
  id: string
  titulo: string
  contenido: string
  creado: Date
  modificado: Date
  color: string
}
```

## Ejemplo de Salida
```
=== 📝 Editor de Notas ===

[Buscar notas...    ]

Mis Notas | Compartidas | Archivadas
=====================================
📌 Reunión equipo
   Modificada: hace 2 horas
   [📋] [🗑️]

📌 Ideas proyecto
   Modificada: ayer
   [📋] [🗑️]
=====================================

+ Nueva Nota

=== EDITOR ===
Titulo: [Reunión equipo    ]
[Vista previa] [Editar]

# Notas de la reunión
- Revisar el roadmap
- Asignar tareas
- *Próxima reunión: lunes*

[Guardar] [Cancelar]
```

## Estructura de Archivos
```
02-editor-notas/
├── src/
│   ├── components/
│   │   ├── ListaNotas.tsx
│   │   ├── EditorNota.tsx
│   │   ├── VistaPrevia.tsx
│   │   └── Buscador.tsx
│   ├── hooks/
│   │   └── useNotas.ts
│   ├── utils/
│   │   └── markdown.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Pistas
- Implementa un parser simple de markdown
- Usa `contentEditable` o textarea para el editor
- Simula colaboración con `setInterval` y estados random
- Usa `localStorage` para persistencia

## Conceptos a Practicar
- Manipulación de strings avanzada
- Expresiones regulares
- useEffect para sincronización
- State management

## Desafío Extra
- Añade soporte para código syntax highlighted
- Implementa export a PDF
- Añade etiquetas/tags
- Simula edición colaborativa real con múltiples cursores
