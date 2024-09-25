from django.urls import path
from . import views

app_name = 'accounts'  # Make sure this is present

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register_view, name='register'),  # This should be here
]
