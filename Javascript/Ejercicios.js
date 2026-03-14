const usuarios = [
  { id: 1, nombre: 'Ana', edad: 25, activo: true },
  { id: 2, nombre: 'Berto', edad: 30, activo: false },
  { id: 3, nombre: 'Clara', edad: 15, activo: true },
  { id: 4, nombre: 'Dani', edad: 40, activo: true },
];

// 1. Destructuring & Arrow: Crea una función que reciba el primer usuario 
// y devuelva "Hola, soy Ana".

const saludar = ({ nombre }) => "Hola soy" + " " + nombre;

//console.log(saludar(usuarios[0]));

// 2. .map(): Crea un array solo con los nombres de los usuarios.

const nombres = usuarios.map(({ nombre }) => nombre);

//console.log(nombres);

// 3. .find(): Encuentra al usuario con id 3.

const usuarioId3 = usuarios.find(({ id }) => id === 3);

//console.log(usuarioId3);

// 4. .some(): ¿Hay algún menor de edad (18) en la lista?

const menorEdad = usuarios.some(({ edad }) => edad < 18);

//console.log(menorEdad);

// Tienes un array de productos.
// Necesitas filtrar los que cuestan más de $50
//  y luego sumar el total de esos productos caros usando .reduce().



const carrito = [
  { nombre: 'Teclado Mecánico', precio: 80 },
  { nombre: 'Mouse Pad', precio: 15 },
  { nombre: 'Monitor 4K', precio: 300 },
  { nombre: 'Cable HDMI', precio: 10 },
  { nombre: 'Soporte Laptop', precio: 55 }
];

const productosCaros = carrito.filter(p => p.precio > 50).reduce((total, producto) => total + producto.precio, 0);

//console.log("El total de los productos caros es: " + productosCaros + "$");

// Practicando funciones asincronas, haciendo pedidos a api y manejando try/catch

//Crea una función asíncrona llamada obtenerTareas que consuma el endpoint https://jsonplaceholder.typicode.com/todos.
//Debe imprimir en consola los títulos de las primeras 5 tareas solamente.
//Usa un bloque try/catch para manejar errores.

async function obtenerTareas() {
  try {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=5`);
    if (!respuesta.ok) {
      throw new Error("No se pudo encontrar la tarea");
    }
    const tareas = await respuesta.json();
    tareas.forEach(tarea => console.log(tarea.title));
    
  } catch (error) {
    console.error("Hubo un problema:", error.message );
  }
}
//obtenerTareas();

//Modifica la URL de una petición para que apunte a un ID que no existe (ejemplo: /posts/999999).
//Asegúrate de que tu código detecte que la respuesta no es ok y lance un error personalizado que diga:
//  "Error: El post solicitado no existe".

async function obtenerPost() {
   try {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=2`);
    if (!respuesta.ok) {
      throw new Error("Error: El post solicitado no existe");
    }
    const post = await respuesta.json();
    console.log(post);
    
  } catch (error) {
    console.error("Hubo un problema:", error.message );
  }
}
//obtenerPost();

//Crea una función que haga lo siguiente:
//Pida los datos de un usuario (ej. ID 2).
//Con el id de ese usuario, haga una segunda petición para obtener sus posts: https://jsonplaceholder.typicode.com/posts?userId=2.
//Muestra en consola cuántos posts tiene ese usuario.

async function obtenerPostsUsuario() {
   try {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=2`);
    if (!respuesta.ok) {
      throw new Error("Error: El post solicitado no existe");
    }
    const post = await respuesta.json();    
    console.log("El usuario con id = 2 tiene " + post.length + " posts");
    
  } catch (error) {
    console.error("Hubo un problema:", error.message );
  }
}
obtenerPostsUsuario();