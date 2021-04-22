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

function clearInputForm() {
    document.getElementById("form-control").style.display = none;
    document.getElementById("movie-list").style.display = block;

    var form = document.forms["editForm"];

    form.movieTitle.value = "";
    document.getElementById("movieTitleError").innerText = "";

    form.movieRating.value = "";
    
}