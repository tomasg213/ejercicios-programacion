/**
 * Ejercicio 3: Sistema de Gestion de Productos (POO)
 * 
 * E-commerce - Gestion de catalogo con descuentos.
 */

class Producto {
    #precio;
    #stock;
    
    constructor(id, nombre, precio, categoria, stock = 0) {
        this.id = id;
        this.nombre = nombre;
        this.#precio = precio;
        this.categoria = categoria;
        this.#stock = stock;
    }
    
    get precio() {
        return this.#precio;
    }
    
    get stock() {
        return this.#stock;
    }
    
    actualizarStock(cantidad) {
        const nuevoStock = this.#stock + cantidad;
        if (nuevoStock < 0) {
            throw new Error('Stock no puede ser negativo');
        }
        this.#stock = nuevoStock;
    }
    
    aplicarDescuento(porcentaje) {
        return this.#precio * (1 - porcentaje / 100);
    }
    
    obtenerPrecioFinal(descuento) {
        if (!descuento) return this.#precio;
        
        if (descuento.tipo === 'porcentaje') {
            return this.#precio * (1 - descuento.valor / 100);
        } else if (descuento.tipo === 'fijo') {
            return Math.max(0, this.#precio - descuento.valor);
        }
        return this.#precio;
    }
    
    toString() {
        return `${this.nombre} (${this.categoria}) - Stock: ${this.#stock} - $${this.#precio.toFixed(2)}`;
    }
}

class Tienda {
    constructor() {
        this.productos = [];
        this.descuentos = new Map();
    }
    
    agregarProducto(producto) {
        this.productos.push(producto);
    }
    
    agregarDescuento(productoId, tipo, valor) {
        this.descuentos.set(productoId, { tipo, valor });
    }
    
    buscarPorCategoria(categoria) {
        return this.productos.filter(p => 
            p.categoria.toLowerCase() === categoria.toLowerCase()
        );
    }
    
    obtenerProductoPorId(id) {
        return this.productos.find(p => p.id === id);
    }
    
    obtenerInventario() {
        return this.productos;
    }
    
    calcularValorInventario() {
        return this.productos.reduce((total, p) => total + p.precio * p.stock, 0);
    }
    
    venderProducto(id, cantidad) {
        const producto = this.obtenerProductoPorId(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        
        if (producto.stock < cantidad) {
            throw new Error('Stock insuficiente');
        }
        
        producto.actualizarStock(-cantidad);
        
        const descuento = this.descuentos.get(id);
        const precioUnitario = producto.obtenerPrecioFinal(descuento);
        const total = precioUnitario * cantidad;
        
        return { producto, cantidad, precioUnitario, total };
    }
}

function main() {
    const tienda = new Tienda();
    
    tienda.agregarProducto(new Producto('p001', 'Laptop HP', 699.99, 'Electronica', 10));
    tienda.agregarProducto(new Producto('p002', 'Camisa Nike', 49.99, 'Ropa', 25));
    tienda.agregarProducto(new Producto('p003', 'Cafe Premium', 12.99, 'Alimentos', 50));
    tienda.agregarProducto(new Producto('p004', 'Auriculares Sony', 149.99, 'Electronica', 15));
    
    tienda.agregarDescuento('p001', 'porcentaje', 10);
    
    console.log('=== Sistema de Gestion de Productos ===\n');
    
    console.log('Inventario actual:');
    tienda.obtenerInventario().forEach(p => console.log(`- ${p.toString()}`));
    
    console.log('\nProductos Electronica:');
    const electronica = tienda.buscarPorCategoria('Electronica');
    electronica.forEach((p, i) => console.log(`${i + 1}. ${p.nombre} - $${p.obtenerPrecioFinal(tienda.descuentos.get(p.id)).toFixed(2)}`));
    
    console.log('\n--- Venta ---');
    const venta = tienda.venderProducto('p001', 2);
    console.log(`Venta realizada: ${venta.producto.nombre} x ${venta.cantidad} = $${venta.total.toFixed(2)}`);
    console.log(`Stock actualizado: ${venta.producto.stock}`);
    
    console.log(`\nValor total del inventario: $${tienda.calcularValorInventario().toFixed(2)}`);
}

main();
