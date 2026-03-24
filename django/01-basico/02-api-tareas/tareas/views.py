from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Tarea
from .forms import TareaForm

class ListaTareas(ListView):
    model = Tarea
    template_name = 'tareas/lista.html'
    context_object_name = 'tareas'

class CrearTarea(CreateView):
    model = Tarea
    form_class = TareaForm
    template_name = 'tareas/formulario.html'
    success_url = reverse_lazy('lista_tareas')

class EditarTarea(UpdateView):
    model = Tarea
    form_class = TareaForm
    template_name = 'tareas/formulario.html'
    success_url = reverse_lazy('lista_tareas')

class EliminarTarea(DeleteView):
    model = Tarea
    template_name = 'tareas/confirmar_eliminar.html'
    success_url = reverse_lazy('lista_tareas')

def togglear(request, tarea_id):
    tarea = get_object_or_404(Tarea, pk=tarea_id)
    tarea.completada = not tarea.completada
    tarea.save()
    return redirect('lista_tareas')
