"""
Ejercicio 10: Testing con pytest
=================================

TDD (Test Driven Development) significa:
1. Escribe el test PRIMERO
2. Ejecuta el test (debe fallar)
3. Escribe código mínimo para pasar
4. Refactoriza
"""

import pytest

"""
DESAFÍO 1: Tests básicos con pytest
----------------------------------
Sin ver la implementación, escribe tests para una función validate_email(email)
que:
- Retorna True si el email es válido
- Lanza ValueError si el email es inválido
"""

def validate_email(email):
    """Implementa esta función para que pase los tests"""
    import re
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        raise ValueError(f"Email inválido: {email}")
    return True


class TestValidateEmail:
    def test_email_valido(self):
        pass
    
    def test_email_sin_arroba(self):
        pass
    
    def test_email_sin_dominio(self):
        pass
    
    def test_email_vacio(self):
        pass


"""
DESAFÍO 2: Parametrización de tests
-------------------------------------
Usa @pytest.mark.parametrize para probar múltiples casos:
"""

@pytest.mark.parametrize("input,expected", [
    ("python@email.com", True),
    ("invalid", False),
    ("test@test.com", True),
])
def test_email_parametrizado(email, expected):
    pass


"""
DESAFÍO 3: Fixtures
-------------------
Crea fixtures para:
- database connection (con setup y teardown)
- sample data
- tmpdir para archivos temporales
"""

@pytest.fixture
def sample_users():
    return [
        {"name": "Ana", "age": 25},
        {"name": "Bob", "age": 30},
    ]


@pytest.fixture
def temp_db():
    """Simula una conexión a base de datos"""
    db = {"users": []}
    yield db
    # Cleanup
    db.clear()


"""
DESAFÍO 4: Mocks y Monkeypatching
----------------------------------
Mockea una función externa (como requests.get):
"""

import requests
from unittest.mock import patch, MagicMock


def get_user_from_api(user_id):
    """Llama a API externa"""
    response = requests.get(f"https://api.example.com/users/{user_id}")
    return response.json()


def test_get_user_mock():
    mock_response = MagicMock()
    mock_response.json.return_value = {"name": "Test User", "id": 123}
    
    with patch('requests.get', return_value=mock_response):
        result = get_user_from_api(123)
        assert result["name"] == "Test User"


"""
DESAFÍO 5: Excepciones con pytest.raises
-----------------------------------------
Verifica que tu código lance las excepciones correctas:
"""

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        1 / 0


"""
DESAFÍO 6: Cobertura de código
--------------------------------
Ejecuta: pytest --cov=modulo --cov-report=term-missing
Identifica las líneas no cubiertas por tests.
"""

def fizzbuzz(n):
    if n % 15 == 0:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    return str(n)


class TestFizzbuzz:
    def test_fizz(self):
        pass
    
    def test_buzz(self):
        pass
    
    def test_fizzbuzz(self):
        pass
    
    def test_numero_normal(self):
        pass


"""
AVANZADO: Testing asíncrono
----------------------------
Usa pytest-asyncio para testear funciones async:
"""

import pytest
import asyncio

@pytest.mark.asyncio
async def test_async_fetch():
    async def fetch():
        await asyncio.sleep(0.1)
        return "done"
    
    result = await fetch()
    assert result == "done"


"""
PREGUNTAS DE REFLEXIÓN:
-----------------------
1. ¿Qué es un "test flaky" y cómo evitarlos?
2. ¿Cuándo usar mocks vs integración real?
3. ¿Qué es property-based testing?
"""
