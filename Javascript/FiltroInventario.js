//Escribe una función que devuelva solo los nombres de los productos que tienen stock y cuyo precio sea menor a 60.

//inventario

const productos = [
  { nombre: 'Laptop', precio: 1000, stock: 5 },
  { nombre: 'Ratón', precio: 20, stock: 0 },
  { nombre: 'Teclado', precio: 50, stock: 10 }
];

function filtrarProductos() {
    const productosFiltrados = productos.filter(producto => producto.stock > 0 && producto.precio < 60);
    return productosFiltrados;
  }
  
  console.log(filtrarProductos());