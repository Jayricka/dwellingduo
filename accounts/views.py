from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import CustomUserCreationForm
from django.contrib import messages

def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']  # Use email instead of username
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)  # Authenticate with email
        if user is not None:
            login(request, user)
            return redirect('home')  # Redirect to the home page after login
        else:
            return render(request, 'accounts/login.html', {'error': 'Invalid email or password.'})
    return render(request, 'accounts/login.html')

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Registration successful! You can now log in.')
            return redirect('accounts:login')  # Redirect to login after registration
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('accounts:login')  # Redirect to login page after logout
