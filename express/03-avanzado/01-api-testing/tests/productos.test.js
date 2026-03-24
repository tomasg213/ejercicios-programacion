const request = require('supertest')
const app = require('../src/index')

describe('API de Productos', () => {
  
  describe('GET /productos', () => {
    it('debe retornar lista de productos', async () => {
      const res = await request(app).get('/productos')
      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })

    it('debe filtrar por categoría', async () => {
      const res = await request(app).get('/productos?categoria=Electrónica')
      expect(res.status).toBe(200)
    })
  })

  describe('POST /productos', () => {
    it('debe crear un producto válido', async () => {
      const nuevoProducto = {
        nombre: 'Laptop',
        precio: 999,
        categoria: 'Electrónica'
      }
      
      const res = await request(app)
        .post('/productos')
        .send(nuevoProducto)
      
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)
      expect(res.body.data.nombre).toBe('Laptop')
    })

    it('debe rechazar producto sin nombre', async () => {
      const res = await request(app)
        .post('/productos')
        .send({ precio: 100 })
      
      expect(res.status).toBe(400)
    })

    it('debe rechazar precio negativo', async () => {
      const res = await request(app)
        .post('/productos')
        .send({ nombre: 'Test', precio: -10 })
      
      expect(res.status).toBe(400)
    })
  })

  describe('GET /productos/:id', () => {
    it('debe retornar producto por ID', async () => {
      const res = await request(app).get('/productos/1')
      expect(res.status).toBe(200)
    })

    it('debe retornar 404 para ID inexistente', async () => {
      const res = await request(app).get('/productos/9999')
      expect(res.status).toBe(404)
    })
  })

  describe('DELETE /productos/:id', () => {
    it('debe eliminar un producto', async () => {
      const res = await request(app).delete('/productos/1')
      expect(res.status).toBe(200)
    })
  })
})
