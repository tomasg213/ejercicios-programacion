# Ejercicio 1: Blog Básico

## Caso Real
Crea un blog básico con Django MTV (Model-Template-View) desde cero.

## Requisitos
1. Model Post con título, contenido, fecha
2. Vistas para listar y mostrar posts
3. Templates básicos
4. URLs configuradas
5. Admin configurado

## Estructura del Proyecto
```
01-blog-basico/
├── blog/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── blog_basico/
│   ├── settings.py
│   └── urls.py
├── manage.py
```

## Modelo Post
```python
class Post(models.Model):
    titulo = models.CharField(max_length=200)
    contenido = models.TextField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
```

## Endpoints
```
/           - Lista de posts
/post/{id}/  - Detalle del post
/admin/      - Panel de administración
```
