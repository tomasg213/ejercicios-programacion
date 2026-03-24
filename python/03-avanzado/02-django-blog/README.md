# Ejercicio 2: Blog con Django

## Caso Real
Trabajas en una editorial digital. Necesitas un blog completo con autenticación, CRUD de posts, comentarios y categorías.

## Requisitos Funcionales
1. **Autenticación**: Registro, login, logout
2. **Posts**: Crear, editar, eliminar, publicar/borrador
3. **Categorías**: CRUD completo
4. **Comentarios**: Sistema de comentarios en posts
5. **Usuarios**: Perfiles con avatar
6. **Búsqueda**: Buscar posts por título/contenido
7. **Paginación**: 10 posts por página

## Modelos

### Post
```python
class Post(models.Model):
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    contenido = models.TextField()
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)
    estado = models.CharField(choices=[('draft','Borrador'),('published','Publicado')])
    fecha_publicacion = models.DateTimeField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
```

### Categoria
```python
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
```

### Comentario
```python
class Comentario(models.Model):
    post = models.ForeignKey(Post, related_name='comentarios', on_delete=models.CASCADE)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    contenido = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)
```

## URLs
```
/                          - Lista de posts
/blog/<slug>/              - Detalle del post
/blog/nuevo/               - Crear post (login required)
/blog/<slug>/editar/       - Editar post (autor only)
/blog/<slug>/eliminar/     - Eliminar post (autor only)
/categorias/               - Lista categorías
/categorias/<slug>/         - Posts por categoría
/registro/                 - Registro de usuario
/login/                    - Login
/logout/                   - Logout
/buscar/                   - Búsqueda
```

## Instalación
```bash
cd python/03-avanzado/02-django-blog
pip install django
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Conceptos a Practicar
- Django ORM
- Modelos y relaciones
- Vistas basadas en clases
- Templates (HTML/CSS)
- Formularios
- Autenticación
- Admin de Django
- Middleware
