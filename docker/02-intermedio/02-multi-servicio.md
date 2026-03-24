# Ejercicio 2: Multi-servicio

## Caso Real
Configura una aplicación full-stack con frontend, backend y base de datos.

## Arquitectura
```
┌─────────────┐
│   Nginx     │ :80 → reverse proxy
└──────┬──────┘
       │
   ┌───┴───┐
   │       │
┌──┴──┐  ┌┴─────┐
│ API │  │ Static│ Node.js  Next.js
└──┬──┘  └──────┘
   │
┌──┴──────────┐
│ PostgreSQL  │
└─────────────┘
```

## docker-compose.yml

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - api
      - frontend
    networks:
      - app-network

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    networks:
      - app-network

  api:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://app:secret@db:5432/app
    depends_on:
      - db
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  pgdata:

networks:
  app-network:
    driver: bridge
```

## nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        
        location /api/ {
            proxy_pass http://api:4000/;
            proxy_set_header Host $host;
        }
        
        location / {
            proxy_pass http://frontend:3000;
        }
    }
}
```

## Ejercicios
```bash
# 1. Estructura de directorios
mkdir -p backend frontend nginx

# 2. Crear docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  backend:
    image: node:18-alpine
    command: sh -c "echo API && sleep infinity"
    networks:
      - app
  frontend:
    image: node:18-alpine  
    command: sh -c "echo Frontend && sleep infinity"
    networks:
      - app
  db:
    image: postgres:15-alpine
    networks:
      - app
networks:
  app:
    driver: bridge
EOF

# 3. Iniciar
docker-compose up -d

# 4. Ver logs
docker-compose logs -f

# 5. Escalar
docker-compose up -d --scale backend=3
```
