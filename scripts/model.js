let movieList = [];

let nextMovieId = 1000;

function Movie(
    title,
    movieRating,
    yearProduced,
    yourRating,
    genre,
    viewingOption
) {
    this.id = nextMovieId++;
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

function modelGetMovie(id) {
    for (x in movieList) {
        if (movieList[x].id === id) {
            return movieList[x];
        }
    }
    return undefined;
}

function modelUpdateMovie(id, title, movieRating, yearProduced, yourRating, genre, viewingOption) {
    let movie = modelGetMovie(id);
    if (!movie) {
        return undefined;
    }

    movie.id = nextMovieId++;
    movie.title = title,
    movie.movieRating = movieRating,
    movie.yearProduced = yearProduced,
    movie.yourRating = yourRating,
    movie.genre = genre,
    movie.viewingOption = viewingOption

    return movie
}

function modelDeleteMovie(id) {
    for (i in movieList) {
        if (movieList[i].id === id) {
            movieList.splice(x, 1);
            break;
        }
    }
}