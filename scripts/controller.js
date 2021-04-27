function onPageLoad() {
    document.getElementById("createBtn").onclick = onCreateBtnClicked;
    document.getElementById("cancelBtn").onclick = onCancelBtnClicked;
    document.getElementById("newBtn").onclick = onNewBtnClicked;

    let items = modelGetAllMovies();
    for (let i = 0; i < items.length; i++) {
        addTableItem(items[i]);
    }

    clearInputForm();
}

function onCreateBtnClicked() {
    if (!validateControls()) {
        return;
    }

    let form = document.forms["editForm"];
    let newMovie = modelCreateMovie(
        form.movieTitle.value,
        form.movieRating.value,
        form.yearProduced.value,
        form.yourRating.value,
        form.genre.checked,
        form.viewingOption.value
    
    )

    addTableItem(newMovie);

    clearInputForm();
}

function validateControls() {
    let form = document.forms["editForm"];
    let isValidated = true;

    if (form.movieTitle.value === "") {
        document.getElementById("movieTitleError").innerText = "Movie Title is Required";
        isValidated = false;
    }

    else {
        document.getElementById("movieTitleError").innerText = "";
    }

    if (form.movieRating.value === "") {
        document.getElementById("movieRatingError").innerText = "Movie Rating is Required";
        isValidated = false;
    }

    else {
        document.getElementById("movieRatingError").innerText = "";
    }

    // if (!form.genre.checked === "") {  Come back to this 1:25
    //     document.getElementById("genreError").innerText = "Genre is Required";
    //     isValidated = false;
    // }

    // else {
    //     document.getElementById("genreError").innerText = "";
    // }
}

function onCancelBtnClicked() {
    clearInputForm();
}

function onNewBtnClicked() {
    document.getElementById("add-a-movie-title").innerText = "Add a movie";
    
    document.getElementById("form-control").style.display = "block";
    document.getElementById("movie-list").style.display = "none";
}

function addTableItem(movie) {
    let table = document.getElementById("movieTable");

    let row = table.insertRow(table.rows.length);
    row.id = 'row' + movie.id;

    let cell = row.insertCell(0);
    cell.innerText = movie.title;

    cell = row.insertCell(1);
    cell.innerText = movie.movieRating;
    
    cell = row.insertCell(2);
    cell.innerText = movie.yearProduced;

    cell = row.insertCell(3);
    cell.innerText = movie.yourRating;

    cell = row.insertCell(4);
    cell.innerText = movie.genre;

    cell = row.insertCell(5);
    cell.innerText = movie.viewingOption;
}

function clearInputForm() {
    document.getElementById("form-control").style.display = "none";
    document.getElementById("movie-list").style.display = "block";

    let form = document.forms["editForm"];

    form.movieTitle.value = "";
    document.getElementById("movieTitleError").innerText = "";

    form.movieRating.value = "";
    document.getElementById("movieRatingError").innerText = "";

    form.yearProduced.value = "";
    document.getElementById("yearProducedError").innerText = "";

    form.yourRating.value = "";
    document.getElementById("yourRatingError").innerText = "";

    form.genre.checked = false;
    document.getElementById("genreError").innerText = "";

    form.viewingOption.value = "";
    document.getElementById("viewingOptionError").innerText = "";

}