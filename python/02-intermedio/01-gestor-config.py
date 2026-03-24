"""
Ejercicio 1: Gestor de Configuracion (JSON)

Startup - Sistema de configuracion multi-ambiente.
"""

import json
import os
from pathlib import Path


class Config:
    def __init__(self):
        self.datos = {}
        self.ruta_archivo = None
    
    def cargar(self, archivo):
        ruta = Path(archivo)
        
        if not ruta.exists():
            raise FileNotFoundError(f"Archivo de configuracion no encontrado: {archivo}")
        
        with open(ruta, 'r', encoding='utf-8') as f:
            self.datos = json.load(f)
        
        self.ruta_archivo = str(ruta.resolve())
        print(f"Configuracion cargada desde: {self.ruta_archivo}")
    
    def guardar(self, archivo=None):
        ruta = archivo or self.ruta_archivo
        
        if not ruta:
            raise ValueError("No hay archivo configurado para guardar")
        
        with open(ruta, 'w', encoding='utf-8') as f:
            json.dump(self.datos, f, indent=2, ensure_ascii=False)
        
        print(f"Configuracion guardada en: {ruta}")
    
    def obtener(self, ruta, valor_default=None):
        partes = ruta.split('.')
        actual = self.datos
        
        for parte in partes:
            if isinstance(actual, dict) and parte in actual:
                actual = actual[parte]
            else:
                return valor_default
        
        return actual
    
    def establecer(self, ruta, valor):
        partes = ruta.split('.')
        actual = self.datos
        
        for i, parte in enumerate(partes[:-1]):
            if parte not in actual:
                actual[parte] = {}
            actual = actual[parte]
        
        actual[partes[-1]] = valor
    
    def obtener_todo(self):
        return self.datos.copy()
    
    @classmethod
    def crear_desde_dict(cls, datos):
        config = cls()
        config.datos = datos
        return config


def main():
    config = Config()
    
    config.datos = {
        "app": {
            "nombre": "Mi Aplicacion",
            "version": "1.0.0",
            "debug": True
        },
        "database": {
            "host": "localhost",
            "puerto": 5432,
            "nombre": "mi_db",
            "usuarios": {
                "admin": "password123"
            }
        },
        "api": {
            "timeout": 30,
            "rate_limit": 100
        }
    }
    
    print("=== Gestor de Configuracion ===\n")
    
    print(f"App nombre: {config.obtener('app.nombre')}")
    print(f"Database host: {config.obtener('database.host')}")
    print(f"Database puerto: {config.obtener('database.puerto')}")
    print(f"API timeout: {config.obtener('api.timeout')}")
    print(f"Usuario admin: {config.obtener('database.usuarios.admin')}")
    print(f"Valor inexistente: {config.obtener('no.existe', 'default')}")
    
    print("\n--- Modificando config ---")
    config.establecer('app.debug', False)
    config.establecer('app.nueva_opcion', 'valor_nuevo')
    config.establecer('database.puerto', 3306)
    
    print(f"\nDebug actualizado: {config.obtener('app.debug')}")
    print(f"Nueva opcion: {config.obtener('app.nueva_opcion')}")
    print(f"Puerto DB: {config.obtener('database.puerto')}")
    
    print("\n--- Configuracion completa ---")
    import json
    print(json.dumps(config.obtener_todo(), indent=2))


if __name__ == "__main__":
    main()
