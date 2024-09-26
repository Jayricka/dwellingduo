from django.shortcuts import render, get_object_or_404, redirect
from .models import Property
from .forms import PropertyForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

# Home view
def home(request):
    return render(request, 'home.html')

# Property listing
def property_list(request):
    properties = Property.objects.all()

    # Filter functionality
    search_query = request.GET.get('search', '')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    location_query = request.GET.get('location', '')
    title_query = request.GET.get('title', '')

    if title_query:
        properties = properties.filter(title__icontains=title_query)

    if location_query:
        properties = properties.filter(location__icontains=location_query)

    if min_price and max_price:
        properties = properties.filter(price__gte=min_price, price__lte=max_price)

    # Sort functionality
    sort_option = request.GET.get('sort', '')

    if sort_option == 'price_asc':
        properties = properties.order_by('price')
    elif sort_option == 'price_desc':
        properties = properties.order_by('-price')
    elif sort_option == 'location_asc':
        properties = properties.order_by('location')
    elif sort_option == 'available':
        properties = properties.order_by('available')

    # Check if the request is AJAX
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        property_data = [
            {
                'id': property.pk,
                'title': property.title,
                'price': property.price,
                'location': property.location,
                'available': property.available,
            }
            for property in properties
        ]
        return JsonResponse(property_data, safe=False)

    return render(request, 'properties/property_list.html', {
        'properties': properties,
        'search_query': search_query,
        'min_price': min_price,
        'max_price': max_price,
        'location': location_query,
        'title': title_query,
        'sort_option': sort_option,
    })

# Property detail
def property_detail(request, pk):
    property_instance = get_object_or_404(Property, pk=pk)
    return render(request, 'properties/property_detail.html', {'property': property_instance})

# Create property
@login_required
def property_create(request):
    if request.method == 'POST':
        form = PropertyForm(request.POST, request.FILES)
        if form.is_valid():
            property_instance = form.save(commit=False)
            property_instance.owner = request.user
            property_instance.save()
            return redirect('properties:property_detail', pk=property_instance.pk)
    else:
        form = PropertyForm()
    return render(request, 'properties/property_form.html', {'form': form})

# Update property
@login_required
def property_update(request, pk):
    property_instance = get_object_or_404(Property, pk=pk, owner=request.user)
    if request.method == 'POST':
        form = PropertyForm(request.POST, request.FILES, instance=property_instance)
        if form.is_valid():
            form.save()
            return redirect('properties:property_detail', pk=property_instance.pk)
    else:
        form = PropertyForm(instance=property_instance)
    return render(request, 'properties/property_form.html', {'form': form})

# Delete property
@login_required
def property_delete(request, pk):
    property_instance = get_object_or_404(Property, pk=pk, owner=request.user)
    if request.method == 'POST':
        property_instance.delete()
        return redirect('properties:property_list')
    return render(request, 'properties/property_confirm_delete.html', {'property': property_instance})
