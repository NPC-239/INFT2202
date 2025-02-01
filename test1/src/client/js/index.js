// import the movies array from the supplied data file.
import { movies } from '../movies.js';
console.log(movies);

// write the array to the console, so you can see that they are loading properly
/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table
const table = document.getElementById('moviesTable').getElementsByTagName('tbody')[0];
insertMoviesIntoTable(table, movies);

// get a list of `pinnedMovies` from local storage
// log them out so you can see that you have working pins
// if there are no pinned movies, put a message on the screen that says so
// but if there are, hide the message
const pinnedMovies = getPinnedMoviesFromStorage();
if (pinnedMovies.length === 0) {
    const noPinnedMessage = document.getElementById('noPinnedMessage');
    noPinnedMessage.style.display = 'block';
} else {
    const noPinnedMessage = document.getElementById('noPinnedMessage');
    noPinnedMessage.style.display = 'none';
    insertMoviesIntoTable(table, pinnedMovies);
}

/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table

/* 
 *  getPinnedMoviesFromStorage
 *  This should take no parameters, and return an array.
 */
function getPinnedMoviesFromStorage() {
    const pinnedMovies = localStorage.getItem('pinnedMovies');
    return pinnedMovies ? JSON.parse(pinnedMovies) : [];
}

/*
 *  insertMoviesIntoTable
 *  This should take two parameters,
 *  - a reference to the table you want to populate
 *  - a list of movies to put in the table
 *  It should return nothing
 */
function insertMoviesIntoTable(eleTable, movies) {
    // sort the list of movies by rating, highest to lowest
    movies.sort((a, b) => b.rating - a.rating);
    eleTable.innerHTML = '';
    
    // for each movie
    movies.forEach(movie => {
        // if this movie is a drama, don't add it to the list
        if (movie.genre === 'Drama') return;
        
        // insert a row
        const row = document.createElement('tr');
        
        // insert a cell for each attribute of a movie
        const titleCell = document.createElement('td');
        titleCell.textContent = movie.title;
        row.appendChild(titleCell);
        
        const ratingCell = document.createElement('td');
        ratingCell.textContent = movie.rating;
        row.appendChild(ratingCell);
        
        const releaseDateCell = document.createElement('td');
        // the datetime is a "unix timestamp", measured in seconds.  
        //   javascript dates are measured in milliseconds.
        const releaseDate = new Date(movie.releaseDate * 1000);
        // convert this timestamp to a javascript date and print out the date as a normal string in english
        releaseDateCell.textContent = releaseDate.toDateString();
        row.appendChild(releaseDateCell);
        
        // create a new button element
        const buttonCell = document.createElement('td');
        const pinButton = document.createElement('button');
        
        const pinnedMovies = getPinnedMoviesFromStorage();
        const isPinned = pinnedMovies.some(pinnedMovie => pinnedMovie.id === movie.id);
        
        //   if it's already pinned, make it red, otherwise make it blue
        pinButton.style.backgroundColor = isPinned ? 'red' : 'blue';
        // set the html so it shows a font-awesome icon
        //   if it's already pinned, show an x, otherwise show a pencil
        //   https://fontawesome.com/icons/categories/design
        pinButton.innerHTML = isPinned ? '<i class="fa-solid fa-x"></i>' : '<i class="fa-solid fa-pencil"></i>';
        
        // add an event listener, when this button is clicked...
        // look in local storage to see if this item is already pinned
        pinButton.addEventListener('click', () => {
            let updatedPinnedMovies;
            // if it is, remove it from the list
            if (isPinned) {
                updatedPinnedMovies = pinnedMovies.filter(pinnedMovie => pinnedMovie.id !== movie.id);
                // it it's not, add it to the list 
            } else {
                updatedPinnedMovies = [...pinnedMovies, movie];
            }
            // refresh the page
            localStorage.setItem('pinnedMovies', JSON.stringify(updatedPinnedMovies));
            insertMoviesIntoTable(eleTable, movies);
        });
        
        // create another table row and put the button in it
        buttonCell.appendChild(pinButton);
        row.appendChild(buttonCell);
        
        // Set the row color based on rating
        const rowColor = 
        // if a movie is rated two or below, make this row red
        movie.rating <= 2 ? 'red' :
        // if this movie is rated higher than two but less than or equal to five, make this row orange
        movie.rating <= 5 ? 'orange' :
        // if this movie is rated higher than five but less than or equal to 8, make this row blue
        movie.rating <= 8 ? 'blue' : 
        // if this movie is rated higher than eight, make this row green
        'green';
        
        row.style.backgroundColor = rowColor;
        
        // Append the row to the table
        eleTable.appendChild(row);
    });
}