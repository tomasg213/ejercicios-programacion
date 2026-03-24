"""
Blog con Django - Admin.
"""

from django.contrib import admin
from .models import Post, Categoria, Comentario


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'slug']
    prepopulated_fields = {'slug': ('nombre',)}


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'autor', 'categoria', 'estado', 'fecha_publicacion', 'created']
    list_filter = ['estado', 'categoria', 'created']
    search_fields = ['titulo', 'contenido']
    prepopulated_fields = {'slug': ('titulo',)}
    raw_id_fields = ['autor']


@admin.register(Comentario)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ['autor', 'post', 'activo', 'created']
    list_filter = ['activo', 'created']
    search_fields = ['contenido']
