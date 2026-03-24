from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Perfil, Post, Comentario

class RegistroForm(UserCreationForm):
    email = forms.EmailField(required=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['titulo', 'slug', 'contenido', 'imagen', 'publicado']
        widgets = {
            'contenido': forms.Textarea(attrs={'rows': 10}),
        }

class ComentarioForm(forms.ModelForm):
    class Meta:
        model = Comentario
        fields = ['contenido']
        widgets = {
            'contenido': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Escribe tu comentario...'})
        }
