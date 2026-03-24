const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Mi Tienda</title></head>
      <body>
        <h1>Bienvenido a Mi Tienda</h1>
        <p>API de ejemplo</p>
        <a href="/api/productos">Ver productos</a>
      </body>
    </html>
  `);
});

app.get('/api/productos', async (req, res) => {
  try {
    const response = await fetch('http://api:4000/api/productos');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con API' });
  }
});

app.get('/salud', (req, res) => {
  res.json({ estado: 'OK', servicio: 'frontend' });
});

app.listen(PORT, () => {
  console.log(`Frontend corriendo en http://localhost:${PORT}`);
});
