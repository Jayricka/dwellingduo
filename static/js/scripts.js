// Basic scripts for DwellingDuo

// Commented out the alert function to prevent pop-ups
// function showAlert(event) {
//     alert("Button clicked: " + event.target.innerText); // Show button text in alert
// }

// Event listener for button clicks
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll("button");

    if (buttons.length > 0) { // Check if buttons exist
        buttons.forEach(button => {
            // Remove the click event listener for buttons
            // button.addEventListener("click", showAlert); // Commented out
        });
    } else {
        console.warn('No buttons found on the page.');
    }
});
