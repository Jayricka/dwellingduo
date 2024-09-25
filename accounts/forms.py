# accounts/forms.py
from django import forms
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUserCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())  # Hide the password input

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password')  # Add other fields as necessary

    def save(self, commit=True):
        user = super().save(commit=False)  # Create user object without saving
        user.set_password(self.cleaned_data['password'])  # Hash the password
        if commit:
            user.save()  # Save the user to the database
        return user
