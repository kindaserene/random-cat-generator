document.addEventListener('DOMContentLoaded', () => {
    const catImage = document.getElementById('cat-image');
    const loadingSpinner = document.getElementById('loading-spinner');
    const newCatBtn = document.getElementById('new-cat-btn');
    
    // Your API key for The Cat API
    // Replace 'YOUR_API_KEY' with your actual API key from https://thecatapi.com/
    const API_KEY = 'live_OkKdJNTAPmYipqsZEELIAUBaolMSN3PP6ADkk3fBQU8ZiykqoctsEZpGDKe2A0RK';
    
    // Function to fetch a random cat image
    async function fetchRandomCat() {
        // Show loading spinner and hide current image
        loadingSpinner.style.display = 'block';
        catImage.style.display = 'none';
        
        try {
            // Using The Cat API with API key authentication
            const headers = {
                'x-api-key': API_KEY
            };
            
            // API endpoint with parameters
            // With an API key, you can get more features like breed filtering
            const url = 'https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1';
            
            const response = await fetch(url, {
                headers: API_KEY !== 'live_OkKdJNTAPmYipqsZEELIAUBaolMSN3PP6ADkk3fBQU8ZiykqoctsEZpGDKe2A0RK' ? headers : {} // Only send API key if it's been set
            });
            
            const data = await response.json();
            
            // Get the URL of the random cat image
            const catImageUrl = data[0].url;
            
            // Set the image source and add event listener for when image loads
            catImage.src = catImageUrl;
            
            // If the API returned breed information and the image has breeds
            if (data[0].breeds && data[0].breeds.length > 0) {
                const breed = data[0].breeds[0];
                catImage.alt = `A ${breed.name} cat`;
                
                // You could display breed information here if you wanted
                console.log('Breed info:', breed);
            } else {
                catImage.alt = 'A cute random cat';
            }
            
            catImage.onload = () => {
                // Hide loading spinner and show the image once it's loaded
                loadingSpinner.style.display = 'none';
                catImage.style.display = 'block';
            };
            
            catImage.onerror = () => {
                // If there's an error loading the image, try again
                loadingSpinner.style.display = 'none';
                catImage.alt = 'Failed to load cat image. Click the button to try again.';
                console.error('Failed to load cat image');
            };
        } catch (error) {
            // Handle any errors
            loadingSpinner.style.display = 'none';
            console.error('Error fetching cat image:', error);
            alert('Failed to fetch a cat image. Please try again later.');
        }
    }
    
    // Load a random cat image when the page loads
    fetchRandomCat();
    
    // Add event listener to button for getting a new cat
    newCatBtn.addEventListener('click', fetchRandomCat);
});