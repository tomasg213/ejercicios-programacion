from django.contrib import admin
from .models import Producto

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'precio', 'categoria', 'stock', 'fecha_creacion']
    list_filter = ['categoria', 'fecha_creacion']
    search_fields = ['nombre', 'descripcion']
    list_editable = ['precio', 'stock']
    readonly_fields = ['fecha_creacion']
    
    fieldsets = (
        ('Información básica', {
            'fields': ('nombre', 'descripcion')
        }),
        ('Precio y stock', {
            'fields': ('precio', 'categoria', 'stock')
        }),
    )
