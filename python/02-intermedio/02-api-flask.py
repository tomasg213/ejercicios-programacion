"""
Ejercicio 2: API REST con Flask

Backend - API para gestion de biblioteca.
"""

from flask import Flask, jsonify, request, abort

app = Flask(__name__)

libros = [
    {
        "id": 1,
        "titulo": "Clean Code",
        "autor": "Robert C. Martin",
        "anio": 2008,
        "genero": "Programacion",
        "disponible": True
    },
    {
        "id": 2,
        "titulo": "The Pragmatic Programmer",
        "autor": "Andrew Hunt",
        "anio": 1999,
        "genero": "Programacion",
        "disponible": True
    },
    {
        "id": 3,
        "titulo": "1984",
        "autor": "George Orwell",
        "anio": 1949,
        "genero": "Ficcion",
        "disponible": False
    }
]
id_siguiente = 4


@app.route('/')
def index():
    return jsonify({
        "mensaje": "API de Biblioteca",
        "version": "1.0",
        "endpoints": {
            "GET /libros": "Lista todos los libros",
            "GET /libros/<id>": "Obtiene libro por ID",
            "POST /libros": "Crea un nuevo libro",
            "PUT /libros/<id>": "Actualiza un libro",
            "DELETE /libros/<id>": "Elimina un libro",
            "GET /libros/buscar": "Busca por autor o genero"
        }
    })


@app.route('/libros', methods=['GET'])
def listar_libros():
    return jsonify(libros)


@app.route('/libros/<int:id>', methods=['GET'])
def obtener_libro(id):
    libro = next((l for l in libros if l['id'] == id), None)
    
    if libro is None:
        abort(404)
    
    return jsonify(libro)


@app.route('/libros', methods=['POST'])
def crear_libro():
    global id_siguiente
    
    datos = request.get_json()
    
    if not datos:
        return jsonify({"error": "No se proporcionaron datos"}), 400
    
    if 'titulo' not in datos or 'autor' not in datos:
        return jsonify({"error": "Titulo y autor son requeridos"}), 400
    
    libro = {
        "id": id_siguiente,
        "titulo": datos['titulo'],
        "autor": datos['autor'],
        "anio": datos.get('anio', 2000),
        "genero": datos.get('genero', 'General'),
        "disponible": datos.get('disponible', True)
    }
    
    id_siguiente += 1
    libros.append(libro)
    
    return jsonify(libro), 201


@app.route('/libros/<int:id>', methods=['PUT'])
def actualizar_libro(id):
    libro = next((l for l in libros if l['id'] == id), None)
    
    if libro is None:
        abort(404)
    
    datos = request.get_json()
    
    if datos.get('titulo'):
        libro['titulo'] = datos['titulo']
    if datos.get('autor'):
        libro['autor'] = datos['autor']
    if datos.get('anio'):
        libro['anio'] = datos['anio']
    if datos.get('genero'):
        libro['genero'] = datos['genero']
    if 'disponible' in datos:
        libro['disponible'] = datos['disponible']
    
    return jsonify(libro)


@app.route('/libros/<int:id>', methods=['DELETE'])
def eliminar_libro(id):
    libro = next((l for l in libros if l['id'] == id), None)
    
    if libro is None:
        abort(404)
    
    libros.remove(libro)
    
    return jsonify({"mensaje": "Libro eliminado", "libro": libro})


@app.route('/libros/buscar', methods=['GET'])
def buscar_libros():
    autor = request.args.get('autor', '').lower()
    genero = request.args.get('genero', '').lower()
    
    resultados = libros
    
    if autor:
        resultados = [l for l in resultados if autor in l['autor'].lower()]
    
    if genero:
        resultados = [l for l in resultados if genero in l['genero'].lower()]
    
    return jsonify({
        "total": len(resultados),
        "resultados": resultados
    })


@app.errorhandler(404)
def error_404(e):
    return jsonify({"error": "Recurso no encontrado"}), 404


@app.errorhandler(400)
def error_400(e):
    return jsonify({"error": "Solicitud invalida"}), 400


if __name__ == '__main__':
    print("=== API de Biblioteca ===")
    print("Servidor en http://localhost:5000")
    app.run(debug=True, port=5000)
