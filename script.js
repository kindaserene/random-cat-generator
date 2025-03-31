document.addEventListener('DOMContentLoaded', () => {
    const catImage = document.getElementById('cat-image');
    const loadingSpinner = document.getElementById('loading-spinner');
    const newCatBtn = document.getElementById('new-cat-btn');
    
    // Check if an API key is saved in localStorage
    let apiKey = localStorage.getItem('catApiKey');
    
    // Create API key input elements
    const apiKeyContainer = document.createElement('div');
    apiKeyContainer.className = 'api-key-container';
    
    const apiKeyInput = document.createElement('input');
    apiKeyInput.type = 'text';
    apiKeyInput.id = 'api-key-input';
    apiKeyInput.placeholder = 'Enter your Cat API key here';
    apiKeyInput.value = apiKey || '';
    
    const apiKeySaveBtn = document.createElement('button');
    apiKeySaveBtn.textContent = 'Save API Key';
    apiKeySaveBtn.className = 'api-key-btn';
    
    const apiKeyInfo = document.createElement('p');
    apiKeyInfo.className = 'api-key-info';
    apiKeyInfo.innerHTML = apiKey 
        ? 'Using saved API key. <a href="https://thecatapi.com" target="_blank">Need a key?</a>' 
        : 'Get a free API key at <a href="https://thecatapi.com" target="_blank">TheCatAPI.com</a>';
    
    // Add elements to the container
    apiKeyContainer.appendChild(apiKeyInput);
    apiKeyContainer.appendChild(apiKeySaveBtn);
    apiKeyContainer.appendChild(apiKeyInfo);
    
    // Add the container to the page
    document.querySelector('.container').insertBefore(apiKeyContainer, document.querySelector('footer'));
    
    // Save API key to localStorage when button is clicked
    apiKeySaveBtn.addEventListener('click', () => {
        const newApiKey = apiKeyInput.value.trim();
        
        if (newApiKey) {
            localStorage.setItem('catApiKey', newApiKey);
            apiKeyInfo.innerHTML = 'API key saved! <a href="https://thecatapi.com" target="_blank">Need a key?</a>';
            apiKey = newApiKey;
            
            // Fetch a new cat with the new API key
            fetchRandomCat();
        } else {
            apiKeyInfo.textContent = 'Please enter a valid API key';
            setTimeout(() => {
                apiKeyInfo.innerHTML = 'Get a free API key at <a href="https://thecatapi.com" target="_blank">TheCatAPI.com</a>';
            }, 3000);
        }
    });
    
    // Function to fetch a random cat image
    async function fetchRandomCat() {
        // Show loading spinner and hide current image
        loadingSpinner.style.display = 'block';
        catImage.style.display = 'none';
        
        try {
            // Configure request based on whether we have an API key
            const url = 'https://api.thecatapi.com/v1/images/search';
            const options = {};
            
            // Add API key to headers if available
            if (apiKey) {
                options.headers = {
                    'x-api-key': apiKey
                };
            }
            
            // Make the API request
            const response = await fetch(url, options);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            // Get the URL of the random cat image
            const catImageUrl = data[0].url;
            
            // Set the image source and add event listener for when image loads
            catImage.src = catImageUrl;
            
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
            
            // Check if the error might be related to the API key
            if (apiKey && error.message.includes('401')) {
                apiKeyInfo.textContent = 'Invalid API key. Please check and try again.';
                setTimeout(() => {
                    apiKeyInfo.innerHTML = 'Get a free API key at <a href="https://thecatapi.com" target="_blank">TheCatAPI.com</a>';
                }, 3000);
            } else {
                alert('Failed to fetch a cat image. Please try again later.');
            }
        }
    }
    
    // Load a random cat image when the page loads
    fetchRandomCat();
    
    // Add event listener to button for getting a new cat
    newCatBtn.addEventListener('click', fetchRandomCat);
});