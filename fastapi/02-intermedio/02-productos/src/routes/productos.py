from fastapi import APIRouter, HTTPException
from typing import Optional
from .schemas.producto import ProductoCreate, ProductoUpdate
from .repositories.producto import producto_repo

router = APIRouter(prefix="/productos", tags=["productos"])


@router.get("", response_model=dict)
def listar_productos(
    categoria: Optional[str] = None,
    disponible: Optional[bool] = None,
    min_precio: Optional[float] = None,
    max_precio: Optional[float] = None,
    busqueda: Optional[str] = None
):
    productos = producto_repo.get_all(categoria, disponible, min_precio, max_precio, busqueda)
    return {"success": True, "data": productos}


@router.get("/{id}", response_model=dict)
def obtener_producto(id: int):
    producto = producto_repo.get_by_id(id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"success": True, "data": producto}


@router.post("", response_model=dict, status_code=201)
def crear_producto(producto: ProductoCreate):
    nuevo_producto = producto_repo.create(producto)
    return {"success": True, "data": nuevo_producto}


@router.put("/{id}", response_model=dict)
def actualizar_producto(id: int, producto: ProductoUpdate):
    producto_actualizado = producto_repo.update(id, producto)
    if not producto_actualizado:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"success": True, "data": producto_actualizado}


@router.delete("/{id}", response_model=dict)
def eliminar_producto(id: int):
    if not producto_repo.delete(id):
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"success": True, "message": "Producto eliminado"}


@router.post("/{id}/stock", response_model=dict)
def actualizar_stock(id: int, cantidad: int):
    try:
        producto = producto_repo.update_stock(id, cantidad)
        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        return {"success": True, "data": producto}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))