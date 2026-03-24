const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    mensaje: '¡Hola desde Docker!',
    timestamp: new Date().toISOString(),
    entorno: process.env.NODE_ENV || 'development'
  });
});

app.get('/saludo', (req, res) => {
  const nombre = req.query.nombre || 'Mundo';
  res.json({
    mensaje: `¡Hola, ${nombre}!`,
    fecha: new Date().toLocaleString('es-ES')
  });
});

app.get('/salud', (req, res) => {
  res.json({ estado: 'OK', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
