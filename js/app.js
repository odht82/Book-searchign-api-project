// SEARCH FUNCTIONS
const searchBook = () => {
    const searchInput = document.getElementById("search-field");
    const searchValue = searchInput.value; // GETTING SEARCH INPUT VALUE
    searchInput.value = ''; // MAKING EMPTY SEARCH FIELD AFTER SEARCHING
    //API LINK
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    //LADING API DATA
    fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.docs));
}
const searchResult = data => {
    const searchContainer = document.getElementById("search-container");
    const errorMessage = document.getElementById("error"); //ERROR DIV
    errorMessage.textContent = '';
    searchContainer.textContent = ''; //MAKING RESULTS EMPTY FOR NEW SEARCH
    if (data.length === 0) {
        const noResultMessage = document.createElement('div');
        noResultMessage.innerHTML = `<p id="error-message">Something Wrong!<br> Try again.</p>`; //ERROR MESSAGE
        errorMessage.appendChild(noResultMessage); //DIV IMPLEMENTATION IN ERROR DIV
    }
    //LOADING DATA FROM API BY LOOP AND SHOWING IN WEB-PAGE
    data.forEach(result => {
        const resultContainer = document.createElement('div');
        resultContainer.innerHTML = `
            <div class="result-container">
                <div class="book-thumb">
                    <img class="book-img" src="https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg" alt="">
                </div>
                <div class="book">
                    <div class="book-details">
                        <h2 class="book-name">${result.title.slice(0, 70)}</h2>
                        <h3 class="book-author">${result.author_name}</h3>
                    </div>
                    <h4 class="book-release-date">Published: ${result.first_publish_year}</h4>
                </div>
            </div>`;
        searchContainer.appendChild(resultContainer); //RESULT IMPLEMENTATION IN PAGE
    });
};
