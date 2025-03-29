// Follow the README.md to set up the rest of this file.

/*
 *  fetchMovies
 *  This should take two parameters
 *  -   The genre you want to filter by, defaults to null
 *  -   The rating you want to filter by, defaults to null
 *  It should return a list of movies
 *  It should throw an error if something went wrong
 *  You need to use the following classes: URLSearchParams, URL, Headers, and Request.
 */
async function fetchMovies(genre = null, rating = null) {
    try {
        const url = new URL('http://localhost:3022/api/movies');
        const params = new URLSearchParams();

        if (genre) params.append('genre', genre);
        if (rating) params.append('rating', rating);

        url.search = params.toString();

        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        const request = new Request(url, {
            method: 'GET',
            headers: headers,
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        throw error;
    }
}

/*
 *  insertMoviesIntoTable
 *  This should take two parameters
 *  - a reference to the table you want to populate
 *  - a list of movies to put in the table
 *  It should return nothing
 */
function insertMoviesIntoTable(table, movies) {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Empty the table first

    movies.forEach((movie) => {
        const row = tbody.insertRow();

        // Insert cells for each attribute of a movie
        const titleCell = row.insertCell(); // insert a row into your table element
        titleCell.textContent = movie.title;

        const genreCell = row.insertCell();
        genreCell.textContent = movie.genre;

        // the datetime is a "unix timestamp", measured in seconds.  
        // javascript dates are measured in milliseconds.
        // convert this timestamp to a javascript date and print out the date as a normal string
        const dateCell = row.insertCell();
        const date = new Date(movie.datetime * 1000);
        dateCell.textContent = date.toLocaleString();

        const directorCell = row.insertCell();
        directorCell.textContent = movie.director;

        const ratingCell = row.insertCell();
        ratingCell.textContent = movie.rating;
        
        // Apply row color based on rating
        if (movie.rating <= 2) {
            // if a movie is rated two or below, make this row red
            row.style.backgroundColor = 'red';
        } else if (movie.rating > 2 && movie.rating <= 5) {
            // if this movie is rated higher than two but less than or equal to five, make this row orange
            row.style.backgroundColor = 'orange';
        } else if (movie.rating > 5 && movie.rating <= 8) {
            // if this movie is rated higher than five but less than or equal to 8, make this row blue
            row.style.backgroundColor = 'blue';
        } else if (movie.rating > 8) {
            // if this movie is rated higher than eight, make this row green
            row.style.backgroundColor = 'green';
        }
    });
}