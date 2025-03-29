import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import movies from './data/movies.json' assert { type: 'json' };

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the port for the server, use 3022
const port = 3022;

// Create a new server instance
const app = express();

// Configure the body renderer to parse JSON inputs
app.use(express.json());

// Automatically serve static assets from the client folder
app.use(express.static(path.join(__dirname, '../../client')));

// Automatically serve static assets from the node_modules folder
app.use('/node_modules', express.static(path.join(__dirname, '../../../node_modules')));

// Create a new router instance
const router = express.Router();

// Create a new route and route handler
router.get('/api/movies', (req, res) => {
    const { rating, genre } = req.query;
    let filteredMovies = movies;

    // Check for the rating parameter
    if (rating) {
        const ratingNum = parseFloat(rating);
        if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
            return res.status(400).json({ error: 'Rating must be a number between 1 and 10.' });
        }
        filteredMovies = filteredMovies.filter(movie => movie.rating >= ratingNum);
    }

    // Check for the genre parameter
    if (genre) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.genre.toLowerCase() === genre.toLowerCase()
        );
    }

    // Sort the movies from highest rated to lowest rated
    filteredMovies.sort((a, b) => b.rating - a.rating);

    res.json(filteredMovies);
});

// Configure the server to use your new router instance
app.use('/api', router);

// Fallback route to serve `index.html` for all other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});