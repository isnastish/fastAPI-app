// NOTE: The main problem is that if we reload the page, 
//       all the data will go away, that's why we need to store in a database

console.log("executing js script");

const modalCard = document.querySelector("#add-modal");

const backdrop = document.getElementById("backdrop");

// query for cancel button
const cancelButton = modalCard.querySelector(".modal__actions").children[0];

// query for add button
const addMovieButton = modalCard.querySelector(".modal__actions").children[1];

// selecting the button
const startAddMovieButton = document.querySelector("header").children[1];

const confirmAddMovieButton = cancelButton.nextElementSibling;
console.log(confirmAddMovieButton);

const userInputs = modalCard.querySelectorAll("input");
console.log(userInputs);

// select section
const entryTextSection = document.getElementById("entry-text"); 

const moviesDB = [];

////////////////////////////////////////////////////////////////////
// Callbacks

const updateUI = () => {
    console.log("update UI was triggered");

    if (moviesDB.length === 0) {
        console.log("display all movies here");
        entryTextSection.style.display = 'block';
    } else {
        console.log("movies list is empty, do nothing");
        entryTextSection.style.display = 'none';
    }
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0; 
    for (var id = 0; id < moviesDB.length; id++) {
        if (id === movieId) {
            console.log("corresponding movie id has been found");
            break;
        }
        movieIndex++;
    }

    // remove an item from the list
    moviesDB.slice();
};

// TODO: This function should accept an id as well
const renderNewMovieElement = (movieId, title, imageURL, rating, feedback) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageURL}" alt="${title}">
    </div>
    <div class"movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
        <p>${feedback}</p>
    </div>`;

    // const stringizedFunction = deleteMovieHandler.toString();
    // console.log("function" + stringizedFunction);
    // add event listener that deletes that movie
    // newMovieElement.addEventListener('click', deleteMovieHandler.bind());

    const movieList = document.getElementById("movie-list");
    movieList.append(newMovieElement);

    deleteMovieHandler(movieId);
};

const toggleBackdrop = () => {
    console.log("toggled visibility");
    backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {
    console.log("add movie button is toggled");
    modalCard.classList.toggle("visible");
};

const toggleCancelButton = () => {
    console.log("cancel button is toggled");
    // remove menu and the background
    // modalCard.classList.toggle("visible");
    // backdrop.classList.toggle("visible");

    toggleMovieModal();
    toggleBackdrop();

    clearMovieInputs();
};

// TODO(alx): We should remove the menu when we click on the background

const backdropClickHandler = () => {
    console.log("backdrop was clicked");
    toggleMovieModal();
    toggleBackdrop();
};

const clearMovieInputs = () => {
    console.log("clearing movies input");

    for (const input of userInputs) {
        input.value = '';
    }
};

const addMovieCallback = () => {
    console.log("triggered add movie button");

    // we should add movie to ul list using <li></li> tag
    // but in general it has to be an http call to the back-end
    // NOTE(al): Instead of adding to unordered list, we should add 
    // it to the database.  
    // We have to collect all the input somehow

    const movieTitle = userInputs.item(0).value;
    const imageUrl = userInputs.item(1).value;
    const rating = userInputs.item(2).value;
    const feedback = userInputs.item(3).value;

    // +rating converts a string to a number, 
    // but it doesn't check whether it could be converted or not
    // alternatively we could validate each piece separately 
    if (movieTitle.trim() === '' || 
        imageUrl.trim() === '' || 
        rating.trim() === '' ||
        feedback.trim() === '' ||
        +rating < 1 ||
        +rating > 5) {
        alert("Entered values are invalid.");
        return;
    }

    const movieId = Math.random().toString();
    moviesDB.push({
        // it's fine for this demo, but will not always generate the right thing
        id: movieId,
        title: movieTitle,
        imageURL: imageUrl,
        rating: rating,
        feedback: feedback,
    });

    // print the database of all movies
    console.log(moviesDB);

    // remove add movie menu
    toggleMovieModal();
    toggleBackdrop();
    clearMovieInputs();

    renderNewMovieElement(movieId, movieTitle, imageUrl, rating, feedback);

    updateUI();
};

// event listeners
startAddMovieButton.addEventListener('click', toggleMovieModal);

startAddMovieButton.addEventListener('click', toggleBackdrop);

cancelButton.addEventListener('click', toggleCancelButton);

backdrop.addEventListener('click', backdropClickHandler);

confirmAddMovieButton.addEventListener('click', addMovieCallback);