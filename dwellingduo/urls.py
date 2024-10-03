from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from properties import views as property_views  # Import property views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', property_views.home, name='home'),  # Set home view as the root
    path('properties/', include(('properties.urls', 'properties'), namespace='properties')),
    path('about/', property_views.about, name='about'),  # Move about here
    path('accounts/', include(('accounts.urls', 'accounts'), namespace='accounts')),  # Include your accounts app
    path('accounts/', include('django.contrib.auth.urls')),  # Add built-in auth URLs without namespace
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
