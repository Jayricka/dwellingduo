document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const propertyGrid = document.getElementById('property-grid'); // Ensure this is defined at the top

    if (searchForm) { // Check if the form exists to avoid errors
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const formData = new FormData(searchForm); // Collect form data

            fetch(searchForm.action + '?' + new URLSearchParams(formData), {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest', // Indicate that this is an AJAX request
                },
            })
            .then(response => response.json())
            .then(data => {
                updatePropertyGrid(data); // Update the property grid dynamically
            })
            .catch(error => console.error('Error:', error));
        });
    }

    function updatePropertyGrid(properties) {
        if (propertyGrid) { // Check if the property grid exists
            propertyGrid.innerHTML = ''; // Clear the existing grid

            properties.forEach(property => {
                const propertyItem = document.createElement('div');
                propertyItem.classList.add('property-item');

                propertyItem.innerHTML = `
                    <a href="/properties/${property.id}/">
                        <img src="${property.image ? property.image.url : '/static/images/placeholder.png'}" alt="${property.title}">
                        <h3>${property.title}</h3>
                    </a>
                    <p>Price: $${property.price}</p>
                    <p>Location: ${property.location}</p>
                    <p>${property.available ? 'Available' : 'Not Available'}</p>
                `;

                propertyGrid.appendChild(propertyItem);
            });
        } else {
            console.error('Property grid element not found!');
        }
    }
});
