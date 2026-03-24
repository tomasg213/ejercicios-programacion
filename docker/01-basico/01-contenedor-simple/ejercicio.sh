#!/bin/bash

echo "=========================================="
echo "Ejercicio 1: Contenedor Simple"
echo "=========================================="
echo ""

echo "Paso 1: Verificando que Docker está instalado..."
docker --version || { echo "Docker no está instalado"; exit 1; }

echo ""
echo "Paso 2: Ejercicios interactivos"
echo ""

echo "1) Para ejecutar nginx en puerto 80:"
echo "   docker run -d -p 80:80 nginx"
echo ""

echo "2) Para ejecutar con nombre personalizado:"
echo "   docker run -d --name mi-web -p 8080:80 nginx"
echo ""

echo "3) Para ver logs en tiempo real:"
echo "   docker logs -f mi-web"
echo ""

echo "4) Para acceder al contenedor:"
echo "   docker exec -it mi-web bash"
echo ""

echo "5) Para ver recursos:"
echo "   docker stats mi-web"
echo ""

echo "6) Para limpiar:"
echo "   docker stop mi-web && docker rm mi-web"
echo ""

echo "=========================================="
echo "Comandos útiles de referencia"
echo "=========================================="
echo ""
echo "# Gestión de contenedores"
echo "docker ps                    # Ver contenedores activos"
echo "docker ps -a                 # Ver todos los contenedores"
echo "docker stop <nombre>         # Detener contenedor"
echo "docker start <nombre>        # Iniciar contenedor"
echo "docker rm <nombre>           # Eliminar contenedor"
echo "docker logs <nombre>         # Ver logs"
echo "docker logs -f <nombre>      # Ver logs en tiempo real"
echo "docker exec -it <nombre> bash # Acceder al contenedor"
echo "docker stats                 # Ver uso de recursos"
echo ""
