"""
Ejercicio 1: FastAPI con Async/Await

Backend de alta disponibilidad - API asincrona.
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import asyncio
import random

app = FastAPI(
    title="API de Productos Async",
    description="API asincrona de alta disponibilidad",
    version="1.0.0"
)

class Producto(BaseModel):
    id: Optional[int] = None
    nombre: str = Field(..., min_length=1, max_length=100)
    precio: float = Field(..., gt=0)
    stock: int = Field(default=0, ge=0)
    categoria: str = Field(..., min_length=1)
    creado_en: Optional[datetime] = None

class ProductoCreate(BaseModel):
    nombre: str
    precio: float
    stock: int = 0
    categoria: str

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    precio: Optional[float] = None
    stock: Optional[int] = None
    categoria: Optional[str] = None

productos_db: List[Producto] = []
contador_id = 1

@app.get("/")
async def root():
    return {
        "mensaje": "API de Productos Async",
        "version": "1.0.0",
        "documentacion": "/docs"
    }

@app.get("/health")
async def health_check():
    await asyncio.sleep(0.01)
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "productos_cantidad": len(productos_db)
    }

@app.get("/productos", response_model=List[Producto])
async def listar_productos(categoria: Optional[str] = None):
    await asyncio.sleep(0.05)
    
    if categoria:
        return [p for p in productos_db if p.categoria.lower() == categoria.lower()]
    
    return productos_db

@app.post("/productos", response_model=Producto, status_code=201)
async def crear_producto(producto: ProductoCreate):
    global contador_id
    
    await asyncio.sleep(0.02)
    
    nuevo = Producto(
        id=contador_id,
        nombre=producto.nombre,
        precio=producto.precio,
        stock=producto.stock,
        categoria=producto.categoria,
        creado_en=datetime.now()
    )
    
    contador_id += 1
    productos_db.append(nuevo)
    
    return nuevo

@app.get("/productos/{producto_id}", response_model=Producto)
async def obtener_producto(producto_id: int):
    await asyncio.sleep(0.02)
    
    producto = next((p for p in productos_db if p.id == producto_id), None)
    
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    return producto

@app.put("/productos/{producto_id}", response_model=Producto)
async def actualizar_producto(producto_id: int, updates: ProductoUpdate):
    await asyncio.sleep(0.03)
    
    producto = next((p for p in productos_db if p.id == producto_id), None)
    
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    if updates.nombre is not None:
        producto.nombre = updates.nombre
    if updates.precio is not None:
        producto.precio = updates.precio
    if updates.stock is not None:
        producto.stock = updates.stock
    if updates.categoria is not None:
        producto.categoria = updates.categoria
    
    return producto

@app.delete("/productos/{producto_id}")
async def eliminar_producto(producto_id: int):
    await asyncio.sleep(0.02)
    
    producto = next((p for p in productos_db if p.id == producto_id), None)
    
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    productos_db.remove(producto)
    
    return {"mensaje": "Producto eliminado", "producto": producto.nombre}

@app.get("/productos/{producto_id}/stats")
async def obtener_estadisticas(producto_id: int):
    await asyncio.sleep(0.5)
    
    producto = next((p for p in productos_db if p.id == producto_id), None)
    
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    valor_inventario = producto.precio * producto.stock
    
    return {
        "producto_id": producto_id,
        "nombre": producto.nombre,
        "precio": producto.precio,
        "stock": producto.stock,
        "valor_inventario": valor_inventario,
        "disponible": producto.stock > 0,
        "categoria": producto.categoria
    }

@app.post("/procesar")
async def procesar_datos(background_tasks: BackgroundTasks):
    async def proceso_lento():
        await asyncio.sleep(3)
        return {"resultado": "procesamiento completado"}
    
    background_tasks.add_task(proceso_lento)
    
    return {"mensaje": "Procesamiento iniciado", "tiempo_estimado": "3 segundos"}

async def tarea_en_segundo_plano(mensaje: str):
    await asyncio.sleep(2)
    print(f"Tarea completada: {mensaje}")

@app.post("/tareas")
async def crear_tarea(mensaje: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(tarea_en_segundo_plano, mensaje)
    return {"mensaje": "Tarea creada", "tarea": mensaje}

if __name__ == "__main__":
    import uvicorn
    print("=== FastAPI Async ===")
    print("Documentacion: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
