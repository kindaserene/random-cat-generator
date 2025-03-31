document.addEventListener('DOMContentLoaded', () => {
    const catImage = document.getElementById('cat-image');
    const loadingSpinner = document.getElementById('loading-spinner');
    const newCatBtn = document.getElementById('new-cat-btn');
    
    // Function to fetch a random cat image
    async function fetchRandomCat() {
        // Show loading spinner and hide current image
        loadingSpinner.style.display = 'block';
        catImage.style.display = 'none';
        
        try {
            // Simple API call without authentication
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data || !data.length || !data[0].url) {
                throw new Error('No image data received');
            }
            
            // Get the URL of the random cat image
            const catImageUrl = data[0].url;
            
            // Preload the image
            const img = new Image();
            
            img.onload = () => {
                catImage.src = catImageUrl;
                loadingSpinner.style.display = 'none';
                catImage.style.display = 'block';
            };
            
            img.onerror = () => {
                // If there's an error loading the image, try again
                loadingSpinner.style.display = 'none';
                catImage.alt = 'Failed to load cat image. Click the button to try again.';
                console.error('Failed to load cat image');
                setTimeout(fetchRandomCat, 1000); // Try another image after a short delay
            };
            
            // Start loading the image
            img.src = catImageUrl;
            
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
    newCatBtn.addEventListener('click', () => {
        // Disable the button temporarily to prevent multiple rapid requests
        newCatBtn.disabled = true;
        newCatBtn.textContent = 'Loading...';
        
        fetchRandomCat();
        
        // Re-enable the button after a short delay
        setTimeout(() => {
            newCatBtn.disabled = false;
            newCatBtn.textContent = 'Get New Cat';
        }, 1000);
    });
});