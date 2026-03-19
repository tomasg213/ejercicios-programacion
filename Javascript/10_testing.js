/**
 * Ejercicio 10: Testing en JavaScript
 * =====================================
 * 
 * Testing es fundamental para código robusto.
 * Herramientas: Jest, Vitest, Mocha, Jasmine
 */

/**
 * DESAFÍO 1: Jest - Tests básicos
 */
describe('Calculadora', () => {
    test('suma dos números', () => {
        expect(1 + 1).toBe(2);
    });
    
    test('resta dos números', () => {
        expect(5 - 3).toBe(2);
    });
    
    test('matchers comunes', () => {
        expect(true).toBe(true);
        expect([1, 2, 3]).toContain(2);
        expect({ nombre: 'Ana' }).toHaveProperty('nombre');
        expect(() => { throw new Error('Oops'); }).toThrow();
    });
});

/**
 * DESAFÍO 2: Arrange-Act-Assert pattern
 */
describe('Validación de email', () => {
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    test('email válido pasa la validación', () => {
        // Arrange
        const email = 'test@example.com';
        
        // Act
        const resultado = validarEmail(email);
        
        // Assert
        expect(resultado).toBe(true);
    });
    
    test.each([
        ['test@example.com', true],
        ['invalid', false],
        ['@example.com', false],
        ['test@', false],
    ])('"%s" es válido: %s', (email, esperado) => {
        expect(validarEmail(email)).toBe(esperado);
    });
});

/**
 * DESAFÍO 3: Mocking
 */
describe('Servicio de usuario', () => {
    test('obtiene usuario de la API', async () => {
        // Mock de fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ id: 1, name: 'Ana' })
            })
        );
        
        const response = await fetch('https://api.example.com/users/1');
        const user = await response.json();
        
        expect(user.name).toBe('Ana');
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
    });
    
    test('maneja errores de red', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
        
        await expect(fetch('https://api.example.com/users/1'))
            .rejects.toThrow('Network error');
    });
});

/**
 * DESAFÍO 4: Spies
 */
describe('Contador', () => {
    let contador;
    let spy;
    
    beforeEach(() => {
        contador = {
            valor: 0,
            incrementar: function() {
                this.valor++;
            }
        };
        spy = jest.spyOn(contador, 'incrementar');
    });
    
    afterEach(() => {
        spy.mockRestore();
    });
    
    test('incrementar fue llamado', () => {
        contador.incrementar();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

/**
 * DESAFÍO 5: Testing async
 */
describe('Operaciones asíncronas', () => {
    function fetchUser(id) {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ id, name: `User ${id}` }), 100);
        });
    }
    
    test('async/await', async () => {
        const user = await fetchUser(1);
        expect(user.name).toBe('User 1');
    });
    
    test('resolves matcher', async () => {
        await expect(fetchUser(2)).resolves.toEqual({ id: 2, name: 'User 2' });
    });
});

/**
 * AVANZADO: Snapshot testing
 */
describe('Componente UI', () => {
    test('renderiza correctamente', () => {
        const component = { 
            render: () => '<div class="card"><h1>Título</h1></div>' 
        };
        
        expect(component.render()).toMatchSnapshot();
    });
});
