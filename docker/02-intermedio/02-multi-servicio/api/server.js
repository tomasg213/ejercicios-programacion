const express = require('express');
const app = express();
const PORT = 4000;

let productos = [
  { id: 1, nombre: 'Laptop', precio: 999 },
  { id: 2, nombre: 'Mouse', precio: 29 },
  { id: 3, nombre: 'Teclado', precio: 79 }
];

app.use(express.json());

app.get('/api/productos', (req, res) => {
  res.json({ data: productos });
});

app.get('/api/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

app.post('/api/productos', (req, res) => {
  const nuevoProducto = {
    id: productos.length + 1,
    ...req.body
  };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

app.put('/api/productos/:id', (req, res) => {
  const index = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  productos[index] = { ...productos[index], ...req.body };
  res.json(productos[index]);
});

app.delete('/api/productos/:id', (req, res) => {
  const index = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  productos.splice(index, 1);
  res.json({ mensaje: 'Producto eliminado' });
});

app.get('/api/salud', (req, res) => {
  res.json({ estado: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
