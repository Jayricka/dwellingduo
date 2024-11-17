from django.db import models
from django.conf import settings  # Import settings to reference the custom user model

class Property(models.Model):
    AVAILABILITY_CHOICES = [
        ('on_rent', 'On Rent'),
        ('for_sale', 'For Sale'),
    ]
    
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    available = models.CharField(max_length=10, choices=AVAILABILITY_CHOICES, default='on_rent')  # Updated to use choices
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Update to use AUTH_USER_MODEL
    image = models.ImageField(upload_to='property_images/', blank=True, null=True)

    def __str__(self):
        return self.title
