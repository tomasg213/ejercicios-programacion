"""
Blog con Django - Vistas.
"""

from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import reverse_lazy
from django.db.models import Q
from django.core.paginator import Paginator
from .models import Post, Categoria, Comentario


class InicioView(ListView):
    model = Post
    template_name = 'blog/inicio.html'
    context_object_name = 'posts'
    paginate_by = 10
    
    def get_queryset(self):
        return Post.objects.filter(estado='published', fecha_publicacion__isnull=False).select_related('autor', 'categoria')


class PostDetailView(DetailView):
    model = Post
    template_name = 'blog/detalle.html'
    context_object_name = 'post'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        post = self.get_object()
        context['comentarios'] = post.comentarios.filter(activo=True)
        return context


class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    template_name = 'blog/formulario.html'
    fields = ['titulo', 'categoria', 'contenido', 'imagen', 'estado']
    
    def form_valid(self, form):
        form.instance.autor = self.request.user
        return super().form_valid(form)


class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    template_name = 'blog/formulario.html'
    fields = ['titulo', 'categoria', 'contenido', 'imagen', 'estado']
    
    def test_func(self):
        return self.get_object().autor == self.request.user


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    template_name = 'blog/eliminar.html'
    success_url = reverse_lazy('inicio')
    
    def test_func(self):
        return self.get_object().autor == self.request.user


class CategoriaListView(ListView):
    model = Categoria
    template_name = 'blog/categorias.html'
    context_object_name = 'categorias'


class PostsPorCategoriaView(ListView):
    model = Post
    template_name = 'blog/categoria.html'
    context_object_name = 'posts'
    paginate_by = 10
    
    def get_queryset(self):
        self.categoria = get_object_or_404(Categoria, slug=self.kwargs['slug'])
        return Post.objects.filter(
            categoria=self.categoria,
            estado='published',
            fecha_publicacion__isnull=False
        ).select_related('autor', 'categoria')
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categoria'] = self.categoria
        return context


class BusquedaView(ListView):
    model = Post
    template_name = 'blog/busqueda.html'
    context_object_name = 'posts'
    paginate_by = 10
    
    def get_queryset(self):
        query = self.request.GET.get('q')
        if query:
            return Post.objects.filter(
                Q(titulo__icontains=query) | Q(contenido__icontains=query),
                estado='published',
                fecha_publicacion__isnull=False
            ).select_related('autor', 'categoria')
        return Post.objects.none()
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['query'] = self.request.GET.get('q', '')
        return context


class RegistroView(CreateView):
    form_class = UserCreationForm
    template_name = 'blog/registro.html'
    success_url = reverse_lazy('login')


class CustomLoginView(LoginView):
    template_name = 'blog/login.html'
    redirect_authenticated_user = True


class CustomLogoutView(LogoutView):
    next_page = 'inicio'


def agregar_comentario(request, slug):
    post = get_object_or_404(Post, slug=slug)
    
    if request.method == 'POST' and request.user.is_authenticated:
        contenido = request.POST.get('contenido')
        if contenido:
            Comentario.objects.create(
                post=post,
                autor=request.user,
                contenido=contenido
            )
    
    return redirect('detalle_post', slug=slug)
