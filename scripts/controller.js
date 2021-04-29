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
    let genre = "";
    let radBtns = document.querySelectorAll("input[type='radio']");
    for (let i = 0; i < radBtns.length; i++) {
        if (radBtns[i].checked) {
            genre += radBtns[i].value;
        }
    }
    console.log(genre);
    let newMovie = modelCreateMovie(
        form.movieTitle.value,
        form.movieRating.value,
        form.yearProduced.value,
        form.yourRating.value,
        genre,
        form.viewingOption.value
    
    )

    addTableItem(newMovie);

    clearInputForm();
}

function onUpdateBtnClicked(id) {
    if (!validateControls()) {
        return;
    }

    let form = document.forms["editForm"];
    let genre = "";
    let radBtns = document.querySelectorAll("input[type='radio']");
    for (let i = 0; i < radBtns.length; i++) {
        if (radBtns[i].checked) {
            genre += radBtns[i].value;
        }
    }
    let movie = modelUpdateMovie(
        id,
        form.movieTitle.value,
        form.movieRating.value,
        form.yearProduced.value,
        form.yourRating.value,
        genre,
        form.viewingOption.value
    
    );

    if (!movie) {
        alert("Unable to update movie: " + id);
        return;
    }

    let tr = document.getElementById("row" + id);
    tr.childNodes[0].innerText = movie.title;
    tr.childNodes[1].innerText = movie.movieRating;
    tr.childNodes[2].innerText = movie.yearProduced;
    tr.childNodes[3].innerText = movie.yourRating;
    tr.childNodes[4].innerText = genre;
    tr.childNodes[5].innerText = movie.viewingOption;

    clearInputForm();
}

function onDeleteBtnClicked(id) {
    let movie = modelGetMovie(id);
    if (!movie) {
        alert("Unable to find movie id: " + id);
    }

    if (!confirm("Are you sure you want to delete " + movie.title + "?")) {
        return;
    }

    modelDeleteMovie(id);

    let tr = document.getElementById("row" + id);
    tr.remove();
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

    if (form.viewingOption.value === "") {
        document.getElementById("viewingOptionError").innerText = "Viewing option is Required";
        isValidated = false;
    }

    else {
        document.getElementById("viewingOptionError").innerText = "";
    }

    return isValidated;
}

function onEditBtnClicked(id) {
    let movie = modelGetMovie(id);
    if (!movie) {
        alert("unable to find movie id " + id);
    }

    document.getElementById("add-a-movie-title").innerText = "Edit Movie";
    let form = document.forms["editForm"];

    form.title.value = movie.title;
    // form.movieRating.value = movie.movieRating;
    for (rating in form.movieRating.options) {
        let option = form.movieRating.options[rating];
        
        if (option.value === movie.movieRating) {
            option.selected = true;
        }
    }
    form.yearProduced.value = movie.yearProduced;
    for (yourRating in form.yourRating.options) {
        let option = form.yourRating.options[yourRating];
        
        if (option.value === movie.yourRating) {
            option.selected = true;
        }
    }
    if (movie.genre === "action/adventure") {
        form.genre[0].checked = true;
    }
    
    else if (movie.genre === "drama") {
        form.genre[1].checked = true;
    }

    else if (movie.genre === "comedy") {
        form.genre[2].checked = true;
    }

    else if (movie.genre === "romance") {
        form.genre[3].checked = true;
    }

    else if (movie.genre === "sci-fi/fantasy") {
        form.genre[4].checked = true;
    }
    
    else {
        console.log("genre not found");
    }

    for (viewingOption in form.viewingOption.options) {
        let option = form.viewingOption.options[viewingOption];
        
        if (option.value === movie.viewingOption) {
            option.selected = true;
        }
    }
    
    document.getElementById("form-control").style.display = "block";
    document.getElementById("movie-list").style.display = "none";
    document.getElementById("createBtn").style.display = "none";

    let updateBtn = document.getElementById("updateBtn");
    updateBtn.style.display = "inline";
    updateBtn.onclick = function() {
        onUpdateBtnClicked(movie.id);
    }
}

function onCancelBtnClicked() {
    clearInputForm();
}

function onNewBtnClicked() {
    document.getElementById("add-a-movie-title").innerText = "Add a movie";
    
    document.getElementById("form-control").style.display = "block";
    document.getElementById("movie-list").style.display = "none";
    document.getElementById("createBtn").style.display = "block";
    document.getElementById("updateBtn").style.display = "none";
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

    let editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.innerText = "Edit";
    editBtn.onclick = function() {
        onEditBtnClicked(movie.id);
    }

    cell = row.insertCell(6);
    cell.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function() {
        onDeleteBtnClicked(movie.id);
    }

    cell = row.insertCell(7);
    cell.appendChild(deleteBtn);
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