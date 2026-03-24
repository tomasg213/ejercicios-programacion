# Ejercicio 1: Docker Compose

## Caso Real
Orquestra múltiples servicios con Docker Compose.

## docker-compose.yml

### 1.1 Estructura básica
```yaml
version: '3.8'

services:
  web:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
```

### 1.2 Multi-servicio
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - redis

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

### 1.3 Volúmenes y networks
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - backend

volumes:
  pgdata:

networks:
  backend:
    driver: bridge
```

## Comandos

### 1.4 Gestión
```bash
# Iniciar servicios
docker-compose up

# Iniciar en background
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Escalar servicio
docker-compose up -d --scale web=3
```

## Ejercicios
```bash
# 1. Crear docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  app:
    image: node:18-alpine
    command: sh -c "echo Hello && sleep infinity"
    ports:
      - "3000:3000"
  db:
    image: redis:alpine
    ports:
      - "6379:6379"
EOF

# 2. Iniciar servicios
docker-compose up -d

# 3. Ver estado
docker-compose ps

# 4. Ver logs
docker-compose logs

# 5. Detener
docker-compose down
```
