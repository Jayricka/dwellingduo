// Basic scripts for DwellingDuo

// Function to show a simple alert when a button is clicked
function showAlert() {
    alert("Button clicked!");
}

// Event listener for button clicks
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll("button");
    
    buttons.forEach(button => {
        button.addEventListener("click", showAlert);
    });
});
