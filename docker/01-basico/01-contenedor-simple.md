# Ejercicio 1: Contenedor Simple

## Caso Real
Crea y ejecuta tu primer contenedor Docker con una aplicación simple.

## Pasos

### 1.1 Extraer imagen
```bash
docker pull nginx:latest
```

### 1.2 Ejecutar contenedor
```bash
# Básico
docker run nginx

# Con puerto mapeado
docker run -p 8080:80 nginx

# Con nombre
docker run -d --name mi-nginx -p 8080:80 nginx

# Con variables de entorno
docker run -d -e NOMBRE=Ana -p 8080:80 nginx
```

### 1.3 Gestionarlo
```bash
# Ver contenedores activos
docker ps

# Ver todos los contenedores
docker ps -a

# Detener contenedor
docker stop mi-nginx

# Iniciar contenedor
docker start mi-nginx

# Eliminar contenedor
docker rm mi-nginx
```

### 1.4 Ver logs
```bash
docker logs mi-nginx
docker logs -f mi-nginx
```

## Ejercicios
```bash
# 1. Ejecutar nginx en puerto 80
docker run -d -p 80:80 nginx

# 2. Ejecutar con nombre personalizado
docker run -d --name mi-web -p 8080:80 nginx

# 3. Ver logs en tiempo real
docker logs -f mi-web

# 4. Acceder al contenedor
docker exec -it mi-web bash

# 5. Ver recursos
docker stats mi-web

# 6. Limpiar
docker stop mi-web && docker rm mi-web
```
