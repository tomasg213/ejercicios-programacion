from typing import Optional
from .schemas.producto import Producto, ProductoCreate, ProductoUpdate


class ProductoRepository:
    def __init__(self):
        self.db: dict[int, Producto] = {}
        self.next_id = 1

    def get_all(self, categoria: str = None, disponible: bool = None, 
                min_precio: float = None, max_precio: float = None, 
                busqueda: str = None) -> list[Producto]:
        result = list(self.db.values())
        
        if categoria:
            result = [p for p in result if p.categoria == categoria]
        if disponible is not None:
            result = [p for p in result if p.disponible == disponible]
        if min_precio:
            result = [p for p in result if p.precio >= min_precio]
        if max_precio:
            result = [p for p in result if p.precio <= max_precio]
        if busqueda:
            busq = busqueda.lower()
            result = [p for p in result if busq in p.nombre.lower() or busq in (p.descripcion or "").lower()]
        
        return result

    def get_by_id(self, id: int) -> Optional[Producto]:
        return self.db.get(id)

    def create(self, producto_data: ProductoCreate) -> Producto:
        producto = Producto(id=self.next_id, **producto_data.model_dump())
        self.db[self.next_id] = producto
        self.next_id += 1
        return producto

    def update(self, id: int, producto_data: ProductoUpdate) -> Optional[Producto]:
        existing = self.db.get(id)
        if not existing:
            return None
        
        update_data = producto_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(existing, key, value)
        return existing

    def delete(self, id: int) -> bool:
        if id in self.db:
            del self.db[id]
            return True
        return False

    def update_stock(self, id: int, cantidad: int) -> Optional[Producto]:
        producto = self.db.get(id)
        if not producto:
            return None
        
        nuevo_stock = producto.stock + cantidad
        if nuevo_stock < 0:
            raise ValueError("Stock no puede ser negativo")
        
        producto.stock = nuevo_stock
        producto.disponible = nuevo_stock > 0
        return producto


producto_repo = ProductoRepository()