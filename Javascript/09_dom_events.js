/**
 * Ejercicio 09: DOM y Event Handling
 * ====================================
 * 
 * JavaScript en el navegador manipula el DOM.
 * Pero hay mucho más que querySelector y addEventListener.
 */

/**
 * DESAFÍO 1: Event delegation
 * En lugar de agregar listeners a cada hijo, usa un solo listener en el padre
 */
document.querySelector('.lista').addEventListener('click', (e) => {
    // e.target es el elemento clickeado
    // e.currentTarget es el elemento con el listener
    
    if (e.target.matches('.item')) {
        console.log('Clickeaste:', e.target.textContent);
    }
});

/**
 * DESAFÍO 2: Custom Events
 */
const miEvento = new CustomEvent('miAccion', {
    detail: { mensaje: 'Hola mundo' },
    bubbles: true
});

document.addEventListener('miAccion', (e) => {
    console.log(e.detail.mensaje);
});

// Disparar el evento:
document.dispatchEvent(miEvento);

/**
 * DESAFÍO 3: Intersection Observer
 * Detecta cuando elementos entran/salen del viewport
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Elemento visible:', entry.target);
        } else {
            console.log('Elemento oculto:', entry.target);
        }
    });
}, {
    root: null,          // viewport
    rootMargin: '0px',
    threshold: 0.5       // 50% visible
});

document.querySelectorAll('.lazy-image').forEach(img => {
    observer.observe(img);
});

/**
 * DESAFÍO 4: Mutation Observer
 * Detecta cambios en el DOM
 */
const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        console.log('Tipo:', mutation.type);
        console.log('Nodos añadidos:', mutation.addedNodes.length);
        console.log('Nodos eliminados:', mutation.removedNodes.length);
    });
});

mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true
});

/**
 * DESAFÍO 5: Event loop y rendering
 * Explica por qué este código no funciona como esperas:
 */
function bloquearUI() {
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // Bloquea el thread principal por 3 segundos
    }
}

// El renderizado NO ocurre hasta que esta función termine
// porque JavaScript es single-threaded

/**
 * AVANZADO: requestAnimationFrame
 * Para animaciones suaves, usa requestAnimationFrame
 */
function animate(element, from, to, duration) {
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
        
        const value = from + (to - from) * eased;
        element.style.transform = `translateX(${value}px)`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}
