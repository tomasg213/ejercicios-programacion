"""
App Flask Dockerizada.
"""

from flask import Flask, jsonify, request
from datetime import datetime
import os

app = Flask(__name__)

app.config.from_object('config')

visitas = {}

def get_db():
    """Simulacion de base de datos."""
    return {
        'productos': [
            {'id': 1, 'nombre': 'Laptop', 'precio': 999.99},
            {'id': 2, 'nombre': 'Mouse', 'precio': 29.99},
            {'id': 3, 'nombre': 'Teclado', 'precio': 79.99},
        ]
    }


@app.route('/')
def index():
    return jsonify({
        'nombre': 'API de Productos',
        'version': '1.0.0',
        'endpoints': [
            'GET /health',
            'GET /productos',
            'GET /productos/<id>',
            'POST /productos',
        ]
    })


@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'web',
        'version': '1.0.0'
    })


@app.route('/productos')
def listar_productos():
    db = get_db()
    return jsonify(db['productos'])


@app.route('/productos/<int:id>')
def obtener_producto(id):
    db = get_db()
    producto = next((p for p in db['productos'] if p['id'] == id), None)
    
    if producto:
        return jsonify(producto)
    return jsonify({'error': 'Producto no encontrado'}), 404


@app.route('/productos', methods=['POST'])
def crear_producto():
    datos = request.get_json()
    
    if not datos or 'nombre' not in datos or 'precio' not in datos:
        return jsonify({'error': 'Datos invalidos'}), 400
    
    db = get_db()
    nuevo_id = max(p['id'] for p in db['productos']) + 1
    
    producto = {
        'id': nuevo_id,
        'nombre': datos['nombre'],
        'precio': float(datos['precio'])
    }
    
    db['productos'].append(producto)
    
    return jsonify(producto), 201


@app.route('/visitas')
def contador_visitas():
    ip = request.remote_addr
    visitas[ip] = visitas.get(ip, 0) + 1
    
    return jsonify({
        'tu_ip': ip,
        'tus_visitas': visitas[ip],
        'total_ips': len(visitas)
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
