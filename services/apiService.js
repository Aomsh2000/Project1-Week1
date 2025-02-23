// Fetch company registration details from an external API
async function fetchCompanyData() {
    const companyDetailsElement = document.getElementById('companyDetails');

    try {
        // Make the API call using fetch
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Check if the response is ok (status code 200)
        if (!response.ok) {
            throw new Error('Failed to fetch company data');
        }
        
        // Parse the response data
        const data = await response.json();
        
        // Create a list of company details
        const companyList = data.map(user => {
            return `
                <div class="company-card bg-gray-100 p-4 rounded-md mb-4">
                    <h4 class="font-bold text-xl">${user.company.name}</h4>
                    <p><strong>Catch Phrase:</strong> ${user.company.catchPhrase}</p>
                    <p><strong>Business:</strong> ${user.company.bs}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                </div>
            `;
        }).join('');
        
        // Insert the company details into the DOM
        companyDetailsElement.innerHTML = companyList;

    } catch (error) {
        // Handle any errors during the fetch
        console.error('Error fetching company data:', error);
        companyDetailsElement.innerHTML = `<p class="text-red-500">Failed to load company data. Please try again later.</p>`;
    }
}

// Call the fetchCompanyData function when the page loads
document.addEventListener('DOMContentLoaded', fetchCompanyData);
