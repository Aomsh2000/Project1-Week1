document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("permitForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateForm()) {
            console.log("Form Submitted Successfully!");
            alert("Form Submitted Successfully!");
            form.reset();
        } else {
            console.log("Form validation failed.");
        }
    });
});

function validateForm() {
    const companyName = document.getElementById("companyName").value;
    const registrationNumber = document.getElementById("registrationNumber").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const city = document.getElementById("city").value;
    const region = document.getElementById("region").value;
    const zipCode = document.getElementById("zipCode").value;
    const businessType = document.getElementById("businessType").value;
    const terms = document.getElementById("terms").checked;

    let valid = true;

    if (!companyName) {
        alert("Please enter the company name.");
        valid = false;
    }

    if (!registrationNumber || isNaN(registrationNumber)) {
        alert("Please enter a valid commercial registration number.");
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        valid = false;
    }

    if (!phone || phone.length !== 10 || isNaN(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        valid = false;
    }

    if (!password || password.length < 6) {
        alert("Password must be at least 6 characters long.");
        valid = false;
    }

    if (password !== confirmPassword) {
        alert("Password and confirm password do not match.");
        valid = false;
    }

    if (!city || !region || !zipCode) {
        alert("Please fill out all address fields (City, Region, Zip Code).");
        valid = false;
    }

    if (!businessType) {
        alert("Please select a business type.");
        valid = false;
    }

    if (!terms) {
        alert("You must agree to the terms and conditions.");
        valid = false;
    }

    return valid;
}
