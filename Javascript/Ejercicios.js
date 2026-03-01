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

console.log("El total de los productos caros es: " + productosCaros + "$");

