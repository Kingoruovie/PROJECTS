from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from .models import Todo

from .forms import LoginForm, SignUpForm, TodoForm


def welcome(request):
    return render(request, 'todo/base/_base.html')


# Basic CRUD
@login_required
def index(request):
    print(request.user.is_authenticated)
    error_message: str = ''
    todo_list = []
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user)
        todo_list = Todo.objects.filter(user=user)
    else:
        error_message = 'No todo yet'
    return render(
        request, 
        'todo/index.html', 
        {
            'todo_list': todo_list,
            'error_message': error_message
        }
    )


@login_required
def todo_detail(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    return render(request, 'todo/detail.html', {'todo': todo})
    

@login_required
def todo_edit(request, pk):
    instance = get_object_or_404(Todo, pk=pk)
    if request.method == 'POST':
        form = TodoForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return redirect(reverse('todo:detail', args=[pk,]))
    else:
        form = TodoForm(instance=instance)
    return render(request, 'todo/edit.html', {'form': form})
        
        


@login_required
def todo_delete(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    if request.method == 'POST':
        todo.delete()
        return redirect(reverse('todo:index'))
    else:
        return render(request, 'todo/delete.html', {'todo': todo})


@login_required
def todo_create(request):
    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            form.instance.user = User.objects.get(username=request.user)
            new_todo = form.save()
            return redirect(reverse('todo:detail', args=[new_todo.id,]))
    else:
        form = TodoForm()
    return render(request, 'todo/create.html', {'form': form})


@login_required
def todo_toggle_completed(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    todo.completed = not todo.completed
    todo.save()
    return redirect(reverse('todo:index'))


# Authentication system
def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request=request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect(reverse('todo:index'))
            else:
                form.add_error(None, 'Invalid username or password')
    else:
        form = LoginForm()
    
    return render(request, 'todo/login_form.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect(reverse('todo:login'))


def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(reverse('todo:index'))
    else:
        form = SignUpForm()
    return render(request, 'todo/signup.html', {'form': form})