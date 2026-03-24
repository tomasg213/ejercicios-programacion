"""
Ejercicio 3: Base de Datos SQLite - Sistema de Empleados

RRHH - Gestion de empleados y departamentos.
"""

import sqlite3
import json
from datetime import datetime


class Database:
    def __init__(self, db_name='empresa.db'):
        self.db_name = db_name
        self.conn = None
    
    def conectar(self):
        self.conn = sqlite3.connect(self.db_name)
        self.conn.row_factory = sqlite3.Row
        return self.conn
    
    def cerrar(self):
        if self.conn:
            self.conn.close()
    
    def __enter__(self):
        return self.conectar()
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.conn.rollback()
        else:
            self.conn.commit()
        self.cerrar()


class SistemaEmpleados:
    def __init__(self, db_name='empresa.db'):
        self.db_name = db_name
        self.inicializar_db()
    
    def inicializar_db(self):
        with Database(self.db_name) as conn:
            cursor = conn.cursor()
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS departamentos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT UNIQUE NOT NULL,
                    presupuesto REAL DEFAULT 0
                )
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS empleados (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    email TEXT UNIQUE,
                    departamento_id INTEGER,
                    salario REAL DEFAULT 0,
                    fecha_contratacion TEXT,
                    activo INTEGER DEFAULT 1,
                    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
                )
            ''')
    
    def agregar_departamento(self, nombre, presupuesto=0):
        with Database(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO departamentos (nombre, presupuesto) VALUES (?, ?)',
                (nombre, presupuesto)
            )
            return cursor.lastrowid
    
    def agregar_empleado(self, nombre, email, departamento_id, salario, fecha=None):
        fecha = fecha or datetime.now().strftime('%Y-%m-%d')
        
        with Database(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO empleados (nombre, email, departamento_id, salario, fecha_contratacion)
                VALUES (?, ?, ?, ?, ?)
            ''', (nombre, email, departamento_id, salario, fecha))
            return cursor.lastrowid
    
    def obtener_empleados(self, solo_activos=True):
        with Database(self.db_name) as conn:
            cursor = conn.cursor()
            
            if solo_activos:
                cursor.execute('''
                    SELECT e.*, d.nombre as departamento
                    FROM empleados e
                    LEFT JOIN departamentos d ON e.departamento_id = d.id
                    WHERE e.activo = 1
                ''')
            else:
                cursor.execute('''
                    SELECT e.*, d.nombre as departamento
                    FROM empleados e
                    LEFT JOIN departamentos d ON e.departamento_id = d.id
                ''')
            
            return [dict(row) for row in cursor.fetchall()]
    
    def obtener_empleado_por_id(self, id):
        with Database(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT e.*, d.nombre as departamento
                FROM empleados e
                LEFT JOIN departamentos d ON e.departamento_id = d.id
                WHERE e.id = ?
            ''', (id,))
            row = cursor.fetchone()
            return dict(row) if row else None
    
    def actualizar_salario(self, id, nuevo_salario):
        with Database(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute('UPDATE empleados SET salario = ? WHERE id = ?', (nuevo_salario, id))
            return cursor.rowcount > 0
    
    def eliminar_empleado(self, id):
        with Database(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute('UPDATE empleados SET activo = 0 WHERE id = ?', (id,))
            return cursor.rowcount > 0
    
    def salario_promedio_por_departamento(self):
        with Database(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT d.nombre, AVG(e.salario) as promedio, COUNT(e.id) as cantidad
                FROM departamentos d
                LEFT JOIN empleados e ON d.id = e.departamento_id AND e.activo = 1
                GROUP BY d.id
            ''')
            return [dict(row) for row in cursor.fetchall()]
    
    def empleado_mayor_salario(self):
        with Database(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT e.*, d.nombre as departamento
                FROM empleados e
                LEFT JOIN departamentos d ON e.departamento_id = d.id
                WHERE e.activo = 1
                ORDER BY e.salario DESC
                LIMIT 1
            ''')
            row = cursor.fetchone()
            return dict(row) if row else None
    
    def exportar_json(self, archivo='backup.json'):
        empleados = self.obtener_empleados(solo_activos=False)
        with open(archivo, 'w') as f:
            json.dump(empleados, f, indent=2, default=str)
        return archivo


def poblar_datos(sistema):
    sistema.agregar_departamento('Ingenieria', 100000)
    sistema.agregar_departamento('Ventas', 50000)
    sistema.agregar_departamento('Marketing', 40000)
    
    sistema.agregar_empleado('Juan Perez', 'juan@empresa.com', 1, 25000, '2022-01-15')
    sistema.agregar_empleado('Maria Garcia', 'maria@empresa.com', 1, 22000, '2022-03-20')
    sistema.agregar_empleado('Carlos Lopez', 'carlos@empresa.com', 1, 20000, '2023-02-10')
    sistema.agregar_empleado('Ana Martinez', 'ana@empresa.com', 2, 12000, '2021-11-05')
    sistema.agregar_empleado('Pedro Sanchez', 'pedro@empresa.com', 2, 10000, '2023-06-01')
    sistema.agregar_empleado('Laura Torres', 'laura@empresa.com', 3, 15000, '2022-08-15')


def main():
    sistema = SistemaEmpleados('empresa.db')
    
    print("=== Sistema de Gestion de Empleados ===")
    print(f"Base de datos: {sistema.db_name}\n")
    
    poblar_datos(sistema)
    
    print("--- Empleados Activos ---")
    empleados = sistema.obtener_empleados()
    for emp in empleados:
        print(f"- {emp['nombre']} ({emp['email']}) - {emp['departamento']} - ${emp['salario']:,.2f}")
    
    print("\n--- Estadisticas por Departamento ---")
    stats = sistema.salario_promedio_por_departamento()
    for stat in stats:
        print(f"{stat['nombre']}: {stat['cantidad']} empleados - Promedio: ${stat['promedio']:,.2f}" if stat['promedio'] else f"{stat['nombre']}: Sin empleados")
    
    print("\n--- Empleado con Mayor Salario ---")
    top = sistema.empleado_mayor_salario()
    if top:
        print(f"{top['nombre']} - {top['departamento']} - ${top['salario']:,.2f}")
    
    archivo = sistema.exportar_json()
    print(f"\n--- Backup exportado ---")
    print(f"Archivo: {archivo}")


if __name__ == "__main__":
    main()
