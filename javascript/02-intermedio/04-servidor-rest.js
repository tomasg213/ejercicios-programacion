/**
 * Ejercicio 4: Servidor REST con Express
 * 
 * Backend - API RESTful para gestion de tareas.
 */

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tareas = [];
let idActual = 1;

function crearTarea(datos) {
    return {
        id: idActual++,
        titulo: datos.titulo,
        descripcion: datos.descripcion || '',
        completada: datos.completada || false,
        prioridad: datos.prioridad || 'baja',
        fechaCreacion: new Date().toISOString()
    };
}

function encontrarTareaPorId(id) {
    return tareas.findIndex(t => t.id === parseInt(id));
}

app.get('/tareas', (req, res) => {
    const { prioridad, completada } = req.query;
    
    let resultado = tareas;
    
    if (prioridad) {
        resultado = resultado.filter(t => t.prioridad === prioridad);
    }
    
    if (completada !== undefined) {
        const estado = completada === 'true';
        resultado = resultado.filter(t => t.completada === estado);
    }
    
    res.json(resultado);
});

app.get('/tareas/:id', (req, res) => {
    const indice = encontrarTareaPorId(req.params.id);
    
    if (indice === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.json(tareas[indice]);
});

app.post('/tareas', (req, res) => {
    const { titulo, prioridad } = req.body;
    
    if (!titulo) {
        return res.status(400).json({ error: 'El titulo es requerido' });
    }
    
    if (prioridad && !['alta', 'media', 'baja'].includes(prioridad)) {
        return res.status(400).json({ error: 'Prioridad invalida. Use: alta, media, baja' });
    }
    
    const tarea = crearTarea(req.body);
    tareas.push(tarea);
    
    res.status(201).json(tarea);
});

app.put('/tareas/:id', (req, res) => {
    const indice = encontrarTareaPorId(req.params.id);
    
    if (indice === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const { titulo, descripcion, completada, prioridad } = req.body;
    
    if (titulo !== undefined) tareas[indice].titulo = titulo;
    if (descripcion !== undefined) tareas[indice].descripcion = descripcion;
    if (completada !== undefined) tareas[indice].completada = completada;
    if (prioridad !== undefined) {
        if (!['alta', 'media', 'baja'].includes(prioridad)) {
            return res.status(400).json({ error: 'Prioridad invalida' });
        }
        tareas[indice].prioridad = prioridad;
    }
    
    res.json(tareas[indice]);
});

app.delete('/tareas/:id', (req, res) => {
    const indice = encontrarTareaPorId(req.params.id);
    
    if (indice === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const tareaEliminada = tareas.splice(indice, 1)[0];
    res.json({ mensaje: 'Tarea eliminada', tarea: tareaEliminada });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('\nEndpoints disponibles:');
    console.log('GET    /tareas          - Listar todas las tareas');
    console.log('GET    /tareas/:id      - Obtener tarea por ID');
    console.log('POST   /tareas          - Crear tarea');
    console.log('PUT    /tareas/:id      - Actualizar tarea');
    console.log('DELETE /tareas/:id      - Eliminar tarea');
});
