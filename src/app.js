let searchFormElement = document.querySelector('#search-form');

searchFormElement.addEventListener('submit', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
    event.preventDefault();
    let searchQuery = document.querySelector('#input-search').value;
    let cityElement = document.querySelector('#city');
    cityElement.innerHTML = searchQuery;
}