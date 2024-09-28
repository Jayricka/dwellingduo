document.addEventListener('DOMContentLoaded', () => {
    const propertyTitles = document.querySelectorAll('.property-title');
    const modal = document.getElementById('property-modal');
    const closeModal = document.querySelector('.close');
    const propertyDetails = document.getElementById('property-details');
    const backToListing = document.getElementById('back-to-listing');

    // Function to open the modal
    function openModal(propertyId) {
        fetch(`/properties/${propertyId}/`)
            .then(response => response.json())
            .then(data => {
                // Populate the modal with property details
                propertyDetails.innerHTML = `
                    <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto;">
                    <h2>${data.title}</h2>
                    <p>Price: $${data.price}</p>
                    <p>Location: ${data.location}</p>
                    <p>Availability: ${data.available ? 'On Rent' : 'Sale'}</p>
                    <p>${data.description}</p>
                `;

                // If the current user is the owner, show Edit and Delete buttons
                if (data.is_owner) {
                    const editButton = document.createElement('button');
                    editButton.innerText = 'Edit';
                    editButton.style = "margin-right: 10px;";
                    editButton.addEventListener('click', function() {
                        window.location.href = `/properties/${propertyId}/edit/`;
                    });

                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Delete';
                    deleteButton.style = "background-color: red; color: white;";
                    deleteButton.addEventListener('click', function() {
                        if (confirm('Are you sure you want to delete this property?')) {
                            deleteProperty(propertyId);
                        }
                    });

                    // Append Edit and Delete buttons to the modal content
                    propertyDetails.appendChild(editButton);
                    propertyDetails.appendChild(deleteButton);
                }

                modal.style.display = 'flex'; // Show the modal
            })
            .catch(error => console.error('Error:', error));
    }

    // Function to delete the property
    function deleteProperty(propertyId) {
        fetch(`/properties/${propertyId}/delete/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken') // Add CSRF token for security
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Property deleted successfully.');
                modal.style.display = 'none'; // Close the modal after deletion
                location.reload(); // Reload the property grid
            } else {
                alert('Failed to delete the property.');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Add event listener to each property title to trigger modal
    propertyTitles.forEach(title => {
        title.addEventListener('click', (event) => {
            event.preventDefault();
            const propertyId = event.target.dataset.id;
            openModal(propertyId);
        });
    });

    // Close modal functionality
    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    // Back to listing button functionality
    backToListing.onclick = function() {
        modal.style.display = 'none';
    };

    // Close the modal if clicked outside the content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Function to get the CSRF token
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
