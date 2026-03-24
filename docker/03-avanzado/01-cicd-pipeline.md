# Ejercicio 1: CI/CD Pipeline

## Caso Real
Configura un pipeline de CI/CD con GitHub Actions para construir y desplegar Docker.

## GitHub Actions

### 1.1 Workflow básico
```yaml
# .github/workflows/docker.yml
name: Docker Build and Push

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: mi-app:latest
```

### 1.2 Multi-stage build
```yaml
name: Build Production

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build image
        run: docker build -t mi-app:${{ github.sha }} .
      
      - name: Run tests
        run: docker run mi-app:${{ github.sha }} npm test
      
      - name: Tag and push
        if: github.event_name == 'push'
        run: |
          docker tag mi-app:${{ github.sha }} mi-app:latest
          docker push mi-app:latest
```

### 1.3 Docker Compose en CI
```yaml
name: Integration Tests

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Start services
        run: docker-compose up -d
      
      - name: Run tests
        run: docker-compose run test
      
      - name: Stop services
        if: always()
        run: docker-compose down
```

## Ejercicios
```bash
# 1. Crear directorio .github/workflows
mkdir -p .github/workflows

# 2. Crear workflow
cat > .github/workflows/docker.yml << 'EOF'
name: CI/CD

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: docker build .
      - name: Test
        run: docker run test
EOF

# 3. Verificar syntax de docker-compose
docker-compose config

# 4. Simular push a registry
docker tag mi-app mi-app:test
docker save mi-app:test > app.tar
```
