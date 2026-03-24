from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum


class Categoria(str, Enum):
    electronica = "electrónica"
    ropa = "ropa"
    alimentos = "alimentos"
    hogar = "hogar"


class ProductoBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    precio: float = Field(..., gt=0)
    categoria: str
    stock: int = Field(default=0, ge=0)
    disponible: bool = True


class ProductoCreate(ProductoBase):
    pass


class ProductoUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[float] = Field(None, gt=0)
    categoria: Optional[str] = None
    stock: Optional[int] = Field(None, ge=0)
    disponible: Optional[bool] = None


class Producto(ProductoBase):
    id: int

    class Config:
        from_attributes = True