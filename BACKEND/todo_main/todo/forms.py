from django.db import models
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from .models import Todo


class LoginForm(forms.Form):
    username = forms.CharField(max_length=255)
    password = forms.CharField(widget=forms.PasswordInput)
    

class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email']
        
        
class TodoForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = ['title', 'description', 'start_time', 'end_time', 'priority', 'status', 'completed']