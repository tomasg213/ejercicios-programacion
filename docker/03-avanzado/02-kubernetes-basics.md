# Ejercicio 2: Kubernetes Basics

## Caso Real
Conceptos básicos de Kubernetes para orquestación de contenedores.

## Conceptos Fundamentales

### 1.1 Pod
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mi-app
spec:
  containers:
  - name: app
    image: mi-app:latest
    ports:
    - containerPort: 3000
```

### 1.2 Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mi-app
  template:
    metadata:
      labels:
        app: mi-app
    spec:
      containers:
      - name: app
        image: mi-app:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### 1.3 Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: mi-app-svc
spec:
  selector:
    app: mi-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### 1.4 Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mi-app-ingress
spec:
  rules:
  - host: miapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: mi-app-svc
            port:
              number: 80
```

## Comandos

### 1.5 Gestión de recursos
```bash
# Aplicar configuración
kubectl apply -f deployment.yaml

# Ver pods
kubectl get pods

# Ver servicios
kubectl get svc

# Ver deployments
kubectl get deployments

# Escalar
kubectl scale deployment mi-app --replicas=5

# Actualizar imagen
kubectl set image deployment/mi-app app=mi-app:v2

# Ver logs
kubectl logs -f deployment/mi-app

# Eliminar
kubectl delete -f deployment.yaml
```

## Ejercicios
```bash
# 1. Crear Pod
kubectl run mi-app --image=nginx --port=80

# 2. Exponer Pod
kubectl expose pod mi-app --port=80 --type=NodePort

# 3. Ver estado
kubectl get pods -o wide

# 4. Describir recurso
kubectl describe pod mi-app

# 5. Editar en vivo
kubectl edit pod mi-app

# 6. Eliminar
kubectl delete pod mi-app
kubectl delete service mi-app
```
