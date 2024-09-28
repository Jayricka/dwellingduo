document.addEventListener('DOMContentLoaded', () => {
    const propertyTitles = document.querySelectorAll('.property-title');
    const modal = document.getElementById('property-modal');
    const closeModal = document.querySelector('.close');
    const propertyDetails = document.getElementById('property-details');
    const backToListing = document.getElementById('back-to-listing');

    // Function to open the modal with property details
    function openModal(propertyId) {
        fetch(`/properties/${propertyId}/`)
            .then(response => response.json())
            .then(data => {
                populateModalWithData(data, propertyId);
                modal.style.display = 'flex'; // Show modal
            })
            .catch(error => console.error('Error fetching property details:', error));
    }

    // Function to populate the modal with property data
    function populateModalWithData(data, propertyId) {
        propertyDetails.innerHTML = `
            <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto;">
            <h2>${data.title}</h2>
            <p>Price: $${data.price}</p>
            <p>Location: ${data.location}</p>
            <p>Availability: ${data.available ? 'On Rent' : 'Sale'}</p>
            <p>${data.description}</p>
        `;

        // Append edit and delete buttons if the user is the owner
        if (data.is_owner) {
            addOwnerControls(propertyId);
        }
    }

    // Function to add edit and delete buttons for property owners
    function addOwnerControls(propertyId) {
        const editButton = createButton('Edit', () => {
            window.location.href = `/properties/${propertyId}/edit/`;
        });

        const deleteButton = createButton('Delete', () => {
            if (confirm('Are you sure you want to delete this property?')) {
                deleteProperty(propertyId);
            }
        }, 'red', 'white');

        // Append the buttons to the modal content
        propertyDetails.appendChild(editButton);
        propertyDetails.appendChild(deleteButton);
    }

    // Function to create a button element
    function createButton(text, onClick, backgroundColor = '', color = '') {
        const button = document.createElement('button');
        button.innerText = text;
        button.style.marginRight = '10px';
        if (backgroundColor) button.style.backgroundColor = backgroundColor;
        if (color) button.style.color = color;
        button.addEventListener('click', onClick);
        return button;
    }

    // Function to delete the property
    function deleteProperty(propertyId) {
        fetch(`/properties/${propertyId}/delete/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken') // CSRF token for security
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Property deleted successfully.');
                modal.style.display = 'none'; // Close modal after deletion
                location.reload(); // Reload the property list
            } else {
                alert('Failed to delete the property.');
            }
        })
        .catch(error => console.error('Error deleting property:', error));
    }

    // Add event listener to each property title to trigger modal
    propertyTitles.forEach(title => {
        title.addEventListener('click', (event) => {
            event.preventDefault();
            const propertyId = event.target.dataset.id;
            openModal(propertyId);
        });
    });

    // Close modal when close button is clicked
    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    // Back to listing button functionality
    backToListing.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside the content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
