/**
 * Ejercicio 2: Sistema de Autenticacion JWT
 * 
 * Seguridad - Autenticacion basada en tokens.
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'mi-secret-key-super-segura-2024';
const REFRESH_SECRET = 'refresh-secret-key-2024';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

const usuarios = [];
const refreshTokens = new Set();
const intentosLogin = new Map();

let idSiguiente = 1;

function generarTokens(usuario) {
    const payload = { userId: usuario.id, email: usuario.email, rol: usuario.rol };
    
    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
    
    const refreshToken = jwt.sign({ userId: usuario.id }, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    
    refreshTokens.add(refreshToken);
    
    return { accessToken, refreshToken };
}

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expirado' });
        }
        return res.status(403).json({ error: 'Token invalido' });
    }
}

function verificarAdmin(req, res, next) {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado. Se requiere rol admin' });
    }
    next();
}

function rateLimiter(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const intentos = intentosLogin.get(ip) || { count: 0, tiempo: Date.now() };
    
    if (Date.now() - intentos.tiempo > 15 * 60 * 1000) {
        intentos.count = 0;
        intentos.tiempo = Date.now();
    }
    
    if (intentos.count >= 5) {
        return res.status(429).json({ error: 'Demasiados intentos. Espera 15 minutos' });
    }
    
    intentos.count++;
    intentosLogin.set(ip, intentos);
    next();
}

app.post('/auth/register', async (req, res) => {
    const { email, password, nombre } = req.body;
    
    if (!email || !password || !nombre) {
        return res.status(400).json({ error: 'Email, password y nombre son requeridos' });
    }
    
    if (usuarios.find(u => u.email === email)) {
        return res.status(409).json({ error: 'El email ya esta registrado' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const usuario = {
        id: idSiguiente++,
        email,
        password: passwordHash,
        nombre,
        rol: 'user',
        creadoEn: new Date().toISOString()
    };
    
    usuarios.push(usuario);
    
    const tokens = generarTokens(usuario);
    
    res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        usuario: { id: usuario.id, email, nombre, rol: usuario.rol },
        ...tokens
    });
});

app.post('/auth/login', rateLimiter, async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y password son requeridos' });
    }
    
    const usuario = usuarios.find(u => u.email === email);
    
    if (!usuario) {
        return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    
    const passwordValido = await bcrypt.compare(password, usuario.password);
    
    if (!passwordValido) {
        return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    
    const ip = req.ip || req.connection.remoteAddress;
    intentosLogin.delete(ip);
    
    const tokens = generarTokens(usuario);
    
    res.json({
        mensaje: 'Login exitoso',
        usuario: { id: usuario.id, email: usuario.email, nombre: usuario.nombre, rol: usuario.rol },
        ...tokens
    });
});

app.post('/auth/refresh', (req, res) => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token es requerido' });
    }
    
    if (!refreshTokens.has(refreshToken)) {
        return res.status(403).json({ error: 'Refresh token invalido' });
    }
    
    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        const usuario = usuarios.find(u => u.id === decoded.userId);
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        refreshTokens.delete(refreshToken);
        
        const tokens = generarTokens(usuario);
        
        res.json(tokens);
    } catch (error) {
        return res.status(403).json({ error: 'Refresh token invalido' });
    }
});

app.post('/auth/logout', (req, res) => {
    const { refreshToken } = req.body;
    
    if (refreshToken) {
        refreshTokens.delete(refreshToken);
    }
    
    res.json({ mensaje: 'Logout exitoso' });
});

app.get('/users/perfil', verificarToken, (req, res) => {
    const usuario = usuarios.find(u => u.id === req.usuario.userId);
    
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        creadoEn: usuario.creadoEn
    });
});

app.put('/users/perfil', verificarToken, async (req, res) => {
    const usuario = usuarios.find(u => u.id === req.usuario.userId);
    
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const { nombre, password } = req.body;
    
    if (nombre) usuario.nombre = nombre;
    
    if (password) {
        usuario.password = await bcrypt.hash(password, 10);
    }
    
    res.json({ mensaje: 'Perfil actualizado', usuario: { id: usuario.id, email: usuario.email, nombre: usuario.nombre } });
});

const productos = [
    { id: 1, nombre: 'Laptop', precio: 999.99, stock: 10 },
    { id: 2, nombre: 'Mouse', precio: 29.99, stock: 50 },
    { id: 3, nombre: 'Teclado', precio: 79.99, stock: 30 }
];

app.get('/productos', verificarToken, (req, res) => {
    res.json(productos);
});

app.post('/productos', verificarToken, verificarAdmin, (req, res) => {
    const { nombre, precio, stock } = req.body;
    
    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }
    
    const producto = {
        id: productos.length + 1,
        nombre,
        precio,
        stock: stock || 0
    };
    
    productos.push(producto);
    
    res.status(201).json(producto);
});

app.get('/admin/usuarios', verificarToken, verificarAdmin, (req, res) => {
    const listaUsuarios = usuarios.map(u => ({
        id: u.id,
        email: u.email,
        nombre: u.nombre,
        rol: u.rol,
        creadoEn: u.creadoEn
    }));
    
    res.json(listaUsuarios);
});

app.listen(3000, () => {
    console.log('=== Sistema de Autenticacion JWT ===');
    console.log('Servidor en http://localhost:3000');
    console.log('\nEndpoints:');
    console.log('POST /auth/register - Registrar usuario');
    console.log('POST /auth/login   - Iniciar sesion');
    console.log('POST /auth/refresh  - Renovar token');
    console.log('POST /auth/logout   - Cerrar sesion');
    console.log('GET  /users/perfil - Ver perfil (requiere JWT)');
    console.log('PUT  /users/perfil - Actualizar perfil (requiere JWT)');
    console.log('GET  /productos    - Listar productos (requiere JWT)');
    console.log('POST /productos    - Crear producto (requiere Admin)');
});
