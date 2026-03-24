# Ejercicio 2: Imagen Personalizada

## Caso Real
Crea una imagen Docker personalizada para una aplicación Node.js.

## Dockerfile

### 2.1 Estructura básica
```dockerfile
# Imagen base
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando inicial
CMD ["node", "index.js"]
```

### 2.2 Optimizaciones
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Cache de dependencias
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "index.js"]
```

## Comandos

### 2.3 Construir imagen
```bash
# Construir con tag
docker build -t mi-app:1.0 .

# Construir sin cache
docker build --no-cache -t mi-app:1.0 .
```

### 2.4 Ejecutar imagen personalizada
```bash
docker run -d -p 3000:3000 --name mi-app mi-app:1.0
```

### 2.5 Ver imágenes
```bash
docker images
docker image ls
```

## Ejercicios
```bash
# 1. Crear Dockerfile para app Node.js
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
EOF

# 2. Construir imagen
docker build -t mi-app:1.0 .

# 3. Etiquetar imagen
docker tag mi-app:1.0 mi-app:latest

# 4. Ver historial
docker history mi-app:1.0

# 5. Limpiar imágenes sin usar
docker image prune
```
