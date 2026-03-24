"""
Blog con Django - URLs de la app.
"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.InicioView.as_view(), name='inicio'),
    path('post/<slug:slug>/', views.PostDetailView.as_view(), name='detalle_post'),
    path('post/nuevo/', views.PostCreateView.as_view(), name='crear_post'),
    path('post/<slug:slug>/editar/', views.PostUpdateView.as_view(), name='editar_post'),
    path('post/<slug:slug>/eliminar/', views.PostDeleteView.as_view(), name='eliminar_post'),
    path('post/<slug:slug>/comentar/', views.agregar_comentario, name='agregar_comentario'),
    
    path('categorias/', views.CategoriaListView.as_view(), name='categorias'),
    path('categorias/<slug:slug>/', views.PostsPorCategoriaView.as_view(), name='categoria'),
    
    path('buscar/', views.BusquedaView.as_view(), name='buscar'),
    
    path('registro/', views.RegistroView.as_view(), name='registro'),
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('logout/', views.CustomLogoutView.as_view(), name='logout'),
]
