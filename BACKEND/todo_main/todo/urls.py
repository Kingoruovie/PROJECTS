from django.urls import path
from . import views

app_name = 'todo'
urlpatterns = [
    path(route='', view=views.index, name='index'),
    path(route="welcome", view=views.welcome, name="welcome"),
    path(route='login/', view=views.login_view, name='login'),
    path(route='logout/', view=views.logout_view, name='logout'),
    path(route='signup/', view=views.signup_view, name='signup'),
    # Basic CRUD
    path(route='create/', view=views.todo_create, name='create'),
    path(route='<int:pk>/', view=views.todo_detail, name='detail'),
    path(route='<int:pk>/edit/', view=views.todo_edit, name='edit'),
    path(route='<int:pk>/delete/', view=views.todo_delete, name='delete'),
    path(route='toggle/<int:pk>/', view=views.todo_toggle_completed, name='toggle')
]
