/**
 * Ejercicio 2: Cliente HTTP - API de Rick and Morty
 * 
 * Frontend - Consumo de API pública.
 */

const BASE_URL = 'https://rickandmortyapi.com/api';

async function obtenerPersonajePorId(id) {
    try {
        const respuesta = await fetch(`${BASE_URL}/character/${id}`);
        
        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                throw new Error(`Personaje con ID ${id} no encontrado`);
            }
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        throw error;
    }
}

async function buscarPersonajesPorNombre(nombre) {
    try {
        const respuesta = await fetch(`${BASE_URL}/character/?name=${encodeURIComponent(nombre)}`);
        
        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                return [];
            }
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        return datos.results;
    } catch (error) {
        throw error;
    }
}

function formatearPersonaje(personaje) {
    return `
---
Nombre: ${personaje.name}
Estado: ${personaje.status}
Especie: ${personaje.species}
Genero: ${personaje.gender}
Origen: ${personaje.origin.name}
---
    `.trim();
}

function formatearListaPersonajes(personajes) {
    if (personajes.length === 0) {
        return 'No se encontraron personajes';
    }
    
    return personajes.map((p, i) => 
        `${i + 1}. ${p.name} (${p.status} - ${p.species})`
    ).join('\n');
}

async function main() {
    console.log('=== Rick and Morty API Client ===\n');
    
    console.log('Buscando personaje con ID 1...');
    try {
        const rick = await obtenerPersonajePorId(1);
        console.log(formatearPersonaje(rick));
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
    
    console.log('\nBuscando personajes con nombre "Morty"...');
    try {
        const mortys = await buscarPersonajesPorNombre('Morty');
        console.log(formatearListaPersonajes(mortys));
        console.log(`\nTotal encontrados: ${mortys.length}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

main();
