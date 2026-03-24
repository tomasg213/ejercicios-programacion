"""
Ejercicio 3: Agenda de Contactos

Startup - Gestión simple de contactos de clientes.
"""

contactos = []

def agregar_contacto():
    print("\n--- Agregar Contacto ---")
    nombre = input("Nombre: ").strip()
    telefono = input("Telefono: ").strip()
    email = input("Email (opcional): ").strip()
    if not email:
        email = "-"
    
    print("Categoria (Cliente/Proveedor/Empleado): ")
    categoria = input().strip()
    
    contacto = {
        'nombre': nombre,
        'telefono': telefono,
        'email': email,
        'categoria': categoria
    }
    contactos.append(contacto)
    print(f"Contacto agregado: {nombre}")


def buscar_contacto():
    print("\n--- Buscar Contacto ---")
    busqueda = input("Nombre a buscar: ").strip().lower()
    
    encontrados = [c for c in contactos if busqueda in c['nombre'].lower()]
    
    if encontrados:
        print(f"\nEncontrados: {len(encontrados)}")
        for i, c in enumerate(encontrados, 1):
            print(f"{i}. {c['nombre']} | {c['telefono']} | {c['email']} | {c['categoria']}")
    else:
        print("No se encontraron contactos")


def listar_contactos():
    print("\n=== Lista de Contactos ({}) ===".format(len(contactos)))
    
    if not contactos:
        print("No hay contactos registrados")
        return
    
    for i, c in enumerate(contactos, 1):
        print(f"{i}. {c['nombre']} | {c['telefono']} | {c['email']} | {c['categoria']}")


def eliminar_contacto():
    print("\n--- Eliminar Contacto ---")
    nombre = input("Nombre del contacto a eliminar: ").strip()
    
    for i, c in enumerate(contactos):
        if c['nombre'].lower() == nombre.lower():
            contactos.pop(i)
            print(f"Contacto '{c['nombre']}' eliminado")
            return
    
    print("Contacto no encontrado")


def mostrar_menu():
    print("\n=== Agenda de Contactos ===")
    print("1. Agregar contacto")
    print("2. Buscar contacto")
    print("3. Listar todos")
    print("4. Eliminar contacto")
    print("5. Salir")


def main():
    while True:
        mostrar_menu()
        opcion = input("\nOpcion: ").strip()
        
        if opcion == '1':
            agregar_contacto()
        elif opcion == '2':
            buscar_contacto()
        elif opcion == '3':
            listar_contactos()
        elif opcion == '4':
            eliminar_contacto()
        elif opcion == '5':
            print("¡Hasta luego!")
            break
        else:
            print("Opcion no valida")


if __name__ == "__main__":
    main()
