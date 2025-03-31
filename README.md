# Random Cat Generator

A simple and fun website that displays random cat pictures every time you visit or click the button.

## Features

- Displays a random cat image from [The Cat API](https://thecatapi.com/)
- Simple, responsive design that works on desktop and mobile devices
- Loading spinner while images are being fetched
- One-click button to get a new random cat
- API key support for additional features (breed information, favorites, etc.)

## Demo

You can see a live demo of this project at: https://kindaserene.github.io/random-cat-generator

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- The Cat API

## API Key Setup

While the application works without an API key, it's recommended to get one for better functionality:

1. Register for a free API key at [The Cat API](https://thecatapi.com/)
2. Open `script.js` and replace `'YOUR_API_KEY'` with your actual API key:
   ```javascript
   const API_KEY = 'your-actual-api-key-here';
   ```

With an API key, you'll get:
- Access to more cat images
- Breed information
- Ability to upload images
- Access to save favorites and votes
- Future access to premium endpoints

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/random-cat-generator.git
   ```

2. Navigate to the project directory:
   ```
   cd random-cat-generator
   ```

3. Open `index.html` in your browser to view the project locally.

## Deployment

This project is deployed using GitHub Pages. Follow these steps to deploy your own version:

1. Create a new repository on GitHub
2. Push this code to your repository
3. Go to Settings > Pages
4. Select the main branch as the source
5. Click Save
6. Your site will be published at https://yourusername.github.io/repository-name/

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any ideas for improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Cat API](https://thecatapi.com/) for providing free cat images
- Inspiration from cat lovers everywhere