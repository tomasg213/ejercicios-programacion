# Ejercicio 4: Script de Deployment con Docker

## Caso Real
Trabajas en DevOps. Necesitas dockerizar una aplicación Flask y desplegarla con docker-compose.

## Estructura del Proyecto
```
proyecto/
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── app/
│   ├── __init__.py
│   ├── app.py
│   └── models.py
├── nginx/
│   └── nginx.conf
└── .env
```

## Componentes
1. **Flask App**: Aplicación web
2. **PostgreSQL**: Base de datos
3. **Redis**: Cache
4. **Nginx**: Proxy reverso
5. **Gunicorn**: Servidor WSGI

## Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

ENV FLASK_APP=app.app
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app.app:app"]
```

## docker-compose.yml
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  cache:
    image: redis:7-alpine
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - web

volumes:
  postgres_data:
```

## Comandos
```bash
# Desarrollo
docker-compose up --build

# Produccion
docker-compose -f docker-compose.prod.yml up -d

# Ver logs
docker-compose logs -f

# Escalar
docker-compose up --scale web=3

# Limpiar
docker-compose down -v
```

## Requisitos
1. Crear aplicación Flask funcional
2. Configuración con variables de entorno
3. Health checks
4. Redes entre contenedores
5. Persistencia de datos
6. Logs centralizados

## Conceptos a Practicar
- Docker
- Docker Compose
- Multi-container apps
- Redes Docker
- Volumes
- Environment variables
- Nginx como proxy reverso
- Gunicorn WSGI
