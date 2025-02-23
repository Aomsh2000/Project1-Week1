import { validateForm } from '/utils/formValidation.js';  // Validation function
import { submitFormData } from '/services/apiService.js'; // API service function


export class Form {
    constructor() {
        this.form = document.createElement("form");
        this.form.classList.add("animate__animated", "animate__bounce", "animate__fadeIn");

        this.form.innerHTML = `
            <header>
                <h4 class="text-center text-2xl">Permit Requester Registration</h4>
                <div class="processline flex text-center">
                    <img src="./processLine.png" />
                </div>
            </header>

            <div>
                <h3 class="text-2xl">Organization Information</h3>
                <div class="line mt-2"></div>
                <div class="grid my-10 px-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div class="grid-cols-1">
                        <label for="companyName" class="block text-sm font-medium text-gray-700">Company Name</label>
                        <input type="text" id="companyName" class="p-1.5 mt-3 border w-full" required />
                    </div>

                    <div class="grid-cols-1">
                        <label for="registrationNumber" class="block text-sm font-medium text-gray-700">Commercial Registration Number</label>
                        <input type="number" id="registrationNumber" class="p-1.5 mt-3 w-full" required />
                    </div>
                </div>
            </div>

            <div>
                <h3 class="text-2xl">Owner Information</h3>
                <div class="line mt-2"></div>
                <div class="grid my-10 px-2 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div class="grid-cols-1">
                        <label for="email">Email</label> 
                        <input type="email" id="email" class="p-1.5 mt-3 border w-full" required /> 
                    </div>

                    <div class="grid-cols-1">
                        <label for="phone">Phone Number</label>
                        <input type="number" id="phone" maxlength="10" class="p-1.5 mt-3 border w-full" required />  
                    </div>

                    <div class="grid-cols-1">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="p-1.5 mt-3 border w-full"/>
                    </div>

                    <div class="grid-cols-1">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" class="p-1.5 mt-3 border w-full"/>
                    </div>
                </div>

                <div class="px-2">
                    <label for="address">Address Fields</label>
                    <div class="px-2 gap-4 flex flex-wrap col-span-1">
                        <input placeholder="City" type="text" id="city" class="p-1.5 mt-3 border w-full sm:w-1/3 md:w-1/4 lg:w-1/4"/>
                        <input placeholder="Region" type="text" id="region" class="p-1.5 mt-3 border w-full sm:w-1/3 md:w-1/4 lg:w-1/4"/>
                        <input placeholder="Zip Code" type="number" id="zipCode" class="p-1.5 mt-3 border w-full sm:w-1/3 md:w-1/4 lg:w-1/4"/>
                    </div>    
                </div>
            </div>

            <div class="my-10">
                <h3 class="text-2xl">Organization Activity</h3>
                <div class="line mt-2"></div>
                <div class="grid grid-cols-1 my-10 px-2 gap-4">
                    <label for="businessType">Business Type</label>
                    <select id="businessType" required class="p-2 border rounded-md">
                        <option value="">Select a business type</option>
                        <option value="retail">Retail</option>
                        <option value="service">Service</option>
                        <option value="wholesale">Wholesale</option>
                    </select>
                </div>

                <div class="grid my-10 px-2 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div class="grid-cols-1">
                        <label for="terms">Terms & Conditions</label>
                        <div class="flex items-center mt-2">
                            <input type="checkbox" id="terms" class="mr-2 mx-5" required />
                            <span>I agree to the terms & conditions</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="endLine mt-2"></div>
           <div class="my-5">
                <button type="submit" id="submitButton" class="">
                    Submit
                </button>
            </div>
            <section id="company-info" class="my-10">
            <h3 class="text-2xl">Company Information</h3>
            <div id="companyDetails" class="mt-5">
                <!-- Company data will be inserted here dynamically -->
            </div>
        </section>  
        `;

        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Handle form submission
    async handleSubmit(event) {
        event.preventDefault();

        const companyName = document.getElementById("companyName").value.trim();
        const registrationNumber = document.getElementById("registrationNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const city = document.getElementById("city").value.trim();
        const region = document.getElementById("region").value.trim();
        const zipCode = document.getElementById("zipCode").value.trim();
        const businessType = document.getElementById("businessType").value;
        const termsAccepted = document.getElementById("terms").checked;

        // Validate form
        const errors = validateForm(companyName, registrationNumber, email, phone, password, confirmPassword, city, region, zipCode, businessType, termsAccepted);

        // Display errors (add error handling logic as necessary)

        if (Object.keys(errors).length === 0) {
            // Prepare data to submit
            const formData = {
                companyName,
                registrationNumber,
                email,
                phone,
                password,
                city,
                region,
                zipCode,
                businessType,
                termsAccepted
            };

            try {
                const response = await submitFormData(formData);

                if (response.ok) {
                    alert("Form submitted successfully");
                    localStorage.setItem("user", JSON.stringify(formData)); // Save user data to local storage if needed
                } else {
                    alert("Submission failed.");
                }
            } catch (error) {
                console.error("Form submission error: ", error);
                alert("An error occurred. Please try again later.");
            }
        }
    }

    render(parent) {
        parent.appendChild(this.form);
    }
}
