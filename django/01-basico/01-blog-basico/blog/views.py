from django.shortcuts import render, get_object_or_404
from .models import Post

def lista_posts(request):
    posts = Post.objects.all()[:10]
    return render(request, 'blog/lista_posts.html', {'posts': posts})

def detalle_post(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    return render(request, 'blog/detalle_post.html', {'post': post})
