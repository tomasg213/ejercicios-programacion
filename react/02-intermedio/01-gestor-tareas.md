# Ejercicio 1: Gestor de Tareas con Context API

## Caso Real
Trabajas en una startup de productividad. Necesitas construir un gestor de tareas con múltiples vistas, filtrado, y persistencia local.

## Requisitos
1. Crear, editar, eliminar y completar tareas
2. Filtrar por: todas, pendientes, completadas
3. Ordenar por: fecha, prioridad, alfabético
4. Persistencia en localStorage
5. Estadísticas (total, completadas, porcentaje)

## Estructura de Tarea
```typescript
interface Tarea {
  id: string
  titulo: string
  descripcion: string
  prioridad: 'baja' | 'media' | 'alta'
  completada: boolean
  fechaCreacion: Date
  fechaVencimiento?: Date
}
```

## Ejemplo de Salida
```
=== Gestor de Tareas ===

[Buscar...]

Filtro: [Todas ▼]  Ordenar: [Fecha ▼]

=====================================
📌 Aprende TypeScript
   Prioridad: Alta | Vence: 2024-03-20
   [✓] [✏️] [🗑️]

📌 Revisar PR
   Prioridad: Media | Vence: 2024-03-22
   [✓] [✏️] [🗑️]

📌 Documentación
   Prioridad: Baja | Completada ✓
   [✓] [✏️] [🗑️]
=====================================

[+ Nueva Tarea]

Estadísticas: 5/8 completadas (62.5%)
```

## Estructura de Archivos
```
01-gestor-tareas/
├── src/
│   ├── context/
│   │   └── TareasContext.tsx
│   ├── components/
│   │   ├── ListaTareas.tsx
│   │   ├── TareaItem.tsx
│   │   ├── Filtros.tsx
│   │   ├── FormularioTarea.tsx
│   │   └── Estadisticas.tsx
│   ├── types/
│   │   └── index.ts
│   ├── hooks/
│   │   └── useTareas.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Pistas
- Usa `createContext` y `useReducer` para estado complejo
- Crea un hook personalizado `useTareas` para abstraer la lógica
- Usa `useEffect` para persistencia en localStorage
- Implementa `useMemo` para filtrado/ordenamiento eficiente

## Conceptos a Practicar
- Context API con useReducer
- useMemo y useCallback
- Custom hooks
- TypeScript generics

## Desafío Extra
- Añade categorías/tag para las tareas
- Implementa arrastrar y soltar para reordenar
- Añade modo oscuro
- Sincronización con backend simulado
