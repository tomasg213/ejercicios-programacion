/**
 * Ejercicio 04: Async/Await y Promesas
 * ======================================
 * 
 * JavaScript es single-threaded pero maneja asincronía con:
 * - Callbacks (antiguo)
 * - Promises
 * - Async/Await (syntax sugar sobre Promises)
 */

/**
 * DESAFÍO 1: Callbacks a Promesas
 * Convierte esta función con callback a Promise
 */

// Versión con callback (antiguo):
function obtenerUsuarioCallback(id, callback) {
    setTimeout(() => {
        if (id > 0) {
            callback(null, { id, nombre: 'Usuario ' + id });
        } else {
            callback(new Error('ID inválido'));
        }
    }, 100);
}

// Tu versión con Promise:
function obtenerUsuario(id) {
    return new Promise((resolve, reject) => {
        // Tu código aquí
    });
}

/**
 * DESAFÍO 2: Encadenamiento de Promesas
 * Ejecuta estas operaciones en secuencia:
 * 1. obtenerUsuario(1)
 * 2. obtenerPosts del usuario
 * 3. obtenerComentarios del primer post
 */
function obtenerPosts(usuarioId) {
    return Promise.resolve([
        { id: 101, titulo: 'Post 1' },
        { id: 102, titulo: 'Post 2' }
    ]);
}

function obtenerComentarios(postId) {
    return Promise.resolve([
        { id: 1, texto: 'Comentario 1' },
        { id: 2, texto: 'Comentario 2' }
    ]);
}

// Encadenamiento con .then():
obtenerUsuario(1)
    .then(usuario => {
        console.log('Usuario:', usuario);
        return obtenerPosts(usuario.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
        return obtenerComentarios(posts[0].id);
    })
    .then(comentarios => {
        console.log('Comentarios:', comentarios);
    })
    .catch(error => {
        console.error('Error:', error);
    });

/**
 * DESAFÍO 3: Promise.all, Promise.race, Promise.allSettled
 */
const urls = [
    'https://api.example.com/1',
    'https://api.example.com/2',
    'https://api.example.com/3'
];

// Simular fetch:
function fakeFetch(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve({ url, data: 'datos' });
            } else {
                reject(new Error(`Error en ${url}`));
            }
        }, Math.random() * 1000);
    });
}

// Promise.all: Falla si cualquiera falla
Promise.all(urls.map(fakeFetch))
    .then(results => console.log('Todos:', results))
    .catch(err => console.log('Alguno falló:', err.message));

// Promise.allSettled: Nunca falla, reporta todos los resultados
Promise.allSettled(urls.map(fakeFetch))
    .then(results => {
        results.forEach((result, i) => {
            if (result.status === 'fulfilled') {
                console.log(`${urls[i]}: ${result.value.data}`);
            } else {
                console.log(`${urls[i]}: ${result.reason.message}`);
            }
        });
    });

// Promise.race: El primero en resolverse o rechazarse gana
Promise.race(urls.map(fakeFetch))
    .then(result => console.log('Primero en terminar:', result.url));

/**
 * DESAFÍO 4: Convierte a async/await
 */
async function obtenerTodo() {
    try {
        // Tu código aquí: hacer lo mismo que el encadenamiento anterior
        // usando async/await
        
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * DESAFÍO 5: Implementa tu propia versión de:
 * - Promise.all
 * - Promise.race
 */
function myPromiseAll(promises) {
    // Tu código aquí
}

function myPromiseRace(promises) {
    // Tu código aquí
}

/**
 * AVANZADO: Async Generators
 * Genera valores asíncronos uno por uno
 */
async function* generarNumerosAsync(limite) {
    for (let i = 0; i < limite; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

async function demo() {
    for await (const num of generarNumerosAsync(5)) {
        console.log(num);
    }
}

// demo();
