from django import forms
from .models import Property

class PropertyForm(forms.ModelForm):
    class Meta:
        model = Property
        fields = ['title', 'description', 'price', 'location', 'available', 'image']

    available = forms.ChoiceField(
        choices=Property.AVAILABILITY_CHOICES,  # Use the choices defined in the model
        widget=forms.RadioSelect,  # Use radio buttons to display options
        label="Availability"  # Custom label for the field
    )
