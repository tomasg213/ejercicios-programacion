"""
Ejercicio 09: Concurrencia en Python
=====================================

Python tiene múltiples modelos de concurrencia:
- threading: para I/O-bound (GIL se libera en operaciones de I/O)
- multiprocessing: para CPU-bound (evita GIL)
- asyncio: para I/O asíncrono cooperativo
- concurrent.futures: abstracción de alto nivel
"""

"""
DESAFÍO 1: Threading - Race condition
--------------------------------------
Este código tiene un race condition. Identifica y corrige:
"""

import threading

contador = 0

def incrementar():
    global contador
    for _ in range(100000):
        contador += 1

def demo_race_condition():
    threads = [threading.Thread(target=incrementar) for _ in range(10)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    print(f"Contador final (con race condition): {contador}")


"""
DESAFÍO 2: Lock para sincronización
-----------------------------------
Corrige el código anterior usando threading.Lock:
"""

def incrementar_seguro(lock):
    global contador
    for _ in range(100000):
        with lock:
            contador += 1


"""
DESAFÍO 3: Threading vs Multiprocessing
-----------------------------------------
Compara tiempos de ejecución para CPU-bound vs I/O-bound:
"""

import time
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def cpu_bound(n):
    """Simula trabajo CPU-intensive"""
    return sum(i*i for i in range(n))

def io_bound(n):
    """Simula trabajo I/O-bound"""
    time.sleep(0.001)
    return n * 2


def comparar_concurrencia():
    n_tasks = 100
    n_iterations = 100000
    
    # CPU-bound con threading
    inicio = time.time()
    with ThreadPoolExecutor(max_workers=10) as executor:
        list(executor.map(cpu_bound, [n_iterations] * n_tasks))
    print(f"CPU-bound con threads: {time.time() - inicio:.2f}s")
    
    # CPU-bound con multiprocessing
    inicio = time.time()
    with ProcessPoolExecutor(max_workers=4) as executor:
        list(executor.map(cpu_bound, [n_iterations] * n_tasks))
    print(f"CPU-bound con processes: {time.time() - inicio:.2f}s")


"""
DESAFÍO 4: asyncio básico
-------------------------
Implementa operaciones asíncronas:
"""

import asyncio

async def fetch_data(delay, id):
    """Simula una petición HTTP"""
    await asyncio.sleep(delay)
    return f"data_{id}"


async def main_asyncio():
    """Ejecuta múltiples fetch_data concurrentemente"""
    # Versión secuencial (lenta)
    inicio = time.time()
    resultados = []
    for i in range(5):
        resultados.append(await fetch_data(0.1, i))
    print(f"Sequencial: {time.time() - inicio:.2f}s")
    
    # Versión concurrente (rápida)
    inicio = time.time()
    resultados = await asyncio.gather(*[fetch_data(0.1, i) for i in range(5)])
    print(f"Concurrente: {time.time() - inicio:.2f}s")


"""
DESAFÍO 5: Semaphore para limitar concurrencia
-----------------------------------------------
Simula un pool de conexiones con semaphore:
"""

class ConnectionPool:
    def __init__(self, max_connections=3):
        self.semaphore = asyncio.Semaphore(max_connections)
    
    async def acquire(self):
        await self.semaphore.acquire()
    
    def release(self):
        self.semaphore.release()
    
    async def __aenter__(self):
        await self.acquire()
        return self
    
    async def __aexit__(self, *args):
        self.release()


"""
DESAFÍO 6: Producer-Consumer con Queue
---------------------------------------
Implementa producer-consumer usando queue:
"""

from queue import Queue
import threading

def producer(queue, items):
    for item in items:
        queue.put(item)
    queue.put(None)  # Señal de fin

def consumer(queue, name):
    while True:
        item = queue.get()
        if item is None:
            break
        print(f"{name} procesó: {item}")


"""
AVANZADO: GIL profundo
----------------------
¿Puedes probar que el GIL afecta solo a threads de Python?
"""

import sys

def test_gil_behavior():
    # Pista: subprocess y ctypes pueden liberar el GIL
    pass


"""
PREGUNTAS DE REFLEXIÓN:
-----------------------
1. ¿Cuándo prefieres threading sobre multiprocessing?
2. ¿Qué es el GIL y por qué existe?
3. ¿Cuándo usar asyncio vs threading?
"""
