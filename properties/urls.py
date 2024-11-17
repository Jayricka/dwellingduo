from django.urls import path
from . import views

app_name = 'properties'

urlpatterns = [
    # Existing URL patterns
    path('', views.property_list, name='property_list'),
    path('property/<int:pk>/', views.property_detail, name='property_detail'),
    path('property/create/', views.property_create, name='property_create'),
    path('property/<int:pk>/update/', views.property_update, name='property_update'),
    path('property/<int:pk>/delete/', views.property_delete, name='property_delete'),
    path('api/properties/<int:pk>/', views.property_detail_api, name='property_detail_api'),
]
