document.addEventListener("DOMContentLoaded", function() {

    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Basic validation
        let isValid = true;
        const name = form.querySelector('input[name="txtName"]').value.trim();
        const email = form.querySelector('input[name="txtEmail"]').value.trim();
        const message = form.querySelector('textarea[name="txtMsg"]').value.trim();

        if (name === '') {
            alert('Please enter your name.');
            isValid = false;
        }

        if (email === '' || !email.includes('@')) {
            alert('Please enter a valid email address.');
            isValid = false;
        }

        if (message === '') {
            alert('Please enter your message.');
            isValid = false;
        }

        // Log the form data to the console if validation passes
        if (isValid) {
            console.log("Form Data:");
            console.log("Name: ", name);
            console.log("Email: ", email);
            console.log("Message: ", message);
        }
    });
});
