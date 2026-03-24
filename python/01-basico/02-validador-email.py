"""
Ejercicio 2: Validador de Email

Sistema de registro - Validación de formato de email.
"""


def validar_email(email):
    email = email.strip()
    
    if not email:
        return False, "El email está vacío"
    
    if ' ' in email:
        return False, "El email contiene espacios"
    
    if email.count('@') != 1:
        return False, f"Tiene {email.count('@')} simbolos @ (debe ser exactamente 1)"
    
    partes = email.split('@')
    usuario = partes[0]
    dominio = partes[1]
    
    if not usuario:
        return False, "No hay usuario antes del @"
    
    if not dominio:
        return False, "No hay dominio después del @"
    
    if '.' not in dominio:
        return False, "El dominio debe tener al menos un punto (ej: gmail.com)"
    
    return True, "Email valido"


def main():
    print("=== Validador de Email ===")
    email = input("Ingrese email: ")
    
    es_valido, razon = validar_email(email)
    
    print(f"\nEmail: {email}")
    print(f"Estado: {'VALIDO ✓' if es_valido else 'INVALIDO ✗'}")
    
    if not es_valido:
        print(f"Razón: {razon}")


if __name__ == "__main__":
    main()
