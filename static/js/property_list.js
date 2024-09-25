document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(searchForm); // Collect form data

        fetch(searchForm.action, {
            method: 'GET',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest', // Indicate that this is an AJAX request
            },
        })
        .then(response => response.json())
        .then(data => {
            updatePropertyList(data); // Update the property list dynamically
        })
        .catch(error => console.error('Error:', error));
    });

    function updatePropertyList(properties) {
        const propertyList = document.getElementById('property-list'); // Get the <ul> for the properties
        propertyList.innerHTML = ''; // Clear the existing list

        properties.forEach(property => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="/properties/${property.id}/">${property.title}</a>`;
            propertyList.appendChild(listItem);
        });
    }
});
