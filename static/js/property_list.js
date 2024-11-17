document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const propertyGrid = document.getElementById('property-grid');
    const priceRangeInput = document.getElementById('price-range');
    const locationSelect = document.getElementById('location-select');
    const availabilityCheckbox = document.getElementById('availability-checkbox');
    const sortBySelect = document.getElementById('sort-by-select');

    // Function to fetch properties based on the filters and sorting
    function fetchProperties() {
        const formData = new FormData(searchForm);

        if (priceRangeInput) {
            formData.append('price_range', priceRangeInput.value);
        }
        if (locationSelect) {
            formData.append('location', locationSelect.value);
        }
        if (availabilityCheckbox) {
            formData.append('availability', availabilityCheckbox.checked);
        }
        if (sortBySelect) {
            formData.append('sort_by', sortBySelect.value);
        }

        // Fetch filtered properties from the server
        fetch(searchForm.action + '?' + new URLSearchParams(formData), {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        .then(response => response.json())
        .then(data => updatePropertyGrid(data))
        .catch(error => console.error('Error fetching properties:', error));
    }

    // Update the property grid with fetched data
    function updatePropertyGrid(properties) {
        if (propertyGrid) {
            propertyGrid.innerHTML = ''; // Clear the existing grid

            if (properties.length === 0) {
                propertyGrid.innerHTML = '<p>No properties found.</p>';
            } else {
                properties.forEach(property => {
                    const propertyItem = document.createElement('div');
                    propertyItem.classList.add('property-item');

                    propertyItem.innerHTML = `
                        <a href="#" class="property-link" data-id="${property.id}">
                            <img src="${property.image ? property.image : '/static/images/placeholder.png'}" alt="${property.title}">
                            <h3>${property.title}</h3>
                        </a>
                        <p>Price: $${property.price}</p>
                        <p>Location: ${property.location}</p>
                        <p>${property.available ? 'Available' : 'Not Available'}</p>
                    `;

                    propertyGrid.appendChild(propertyItem);
                });

                // Add event listeners to property links to fetch details when clicked
                document.querySelectorAll('.property-link').forEach(link => {
                    link.addEventListener('click', function(event) {
                        event.preventDefault();
                        const propertyId = this.getAttribute('data-id');
                        fetchPropertyDetail(propertyId);
                    });
                });
            }
        }
    }

    // Fetch and display the details of an individual property
    function fetchPropertyDetail(propertyId) {
        fetch(`/properties/api/${propertyId}/`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        .then(response => response.json())
        .then(data => displayPropertyDetail(data))
        .catch(error => console.error('Error fetching property details:', error));
    }

    // Display property details in a modal or detail section
    function displayPropertyDetail(property) {
        const detailSection = document.getElementById('property-detail');
        if (detailSection) {
            detailSection.innerHTML = `
                <div class="property-detail-content">
                    <img src="${property.image ? property.image : '/static/images/placeholder.png'}" alt="${property.title}">
                    <h2>${property.title}</h2>
                    <p>${property.description}</p>
                    <p>Price: $${property.price}</p>
                    <p>Location: ${property.location}</p>
                    <p>${property.available ? 'Available' : 'Not Available'}</p>
                    ${property.is_owner ? '<button id="edit-property">Edit</button>' : ''}
                </div>
            `;
        }
    }

    // Initialize search functionality and load properties
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            fetchProperties();
        });
    }

    // Initial fetch on page load
    fetchProperties();
});
