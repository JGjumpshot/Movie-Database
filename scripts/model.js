let movieList = [];

function Movie (
    title,
    movieRating,
    yearProduced,
    yourRating,
    genre,
    viewingOption
) {
    this.title = title,
    this.movieRating = movieRating,
    this.yearProduced = yearProduced,
    this.yourRating = yourRating,
    this.genre = genre,
    this.viewingOption = viewingOption
}

function modelCreateMovie(
    title,
    movieRating,
    yearProduced,
    yourRating,
    genre,
    viewingOption
) {
    var newMovie = new Movie(title, movieRating, yearProduced, yourRating, genre, viewingOption);
    movieList.push(newMovie);
    return newMovie;
}

function modelGetAllMovies() {
    return movieList;
}

function modelGetMovie(title) {
    for (x in movieList) {
        if (movieList[x].title === title) {
            return movieList[x];
        }
    }
    return undefined;
}