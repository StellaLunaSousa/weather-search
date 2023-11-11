let searchFormElement = document.querySelector('#search-form');

searchFormElement.addEventListener('submit', handleSearchFormSubmit);

searchCity('São Paulo');

function handleSearchFormSubmit(event) {
    event.preventDefault();
    let searchQuery = document.querySelector('#input-search').value;

    searchCity(searchQuery);
}

function searchCity(city) {
    let apiKey = "e1be014tf0fdae934obf9211d31032be";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(updateWeather);
}

function updateWeather(response) {
    console.log(response);

    let cityElement = document.querySelector('#city');
    cityElement.innerHTML = response.data.city;

    let dateElement = document.querySelector('#date');
    dateElement.innerHTML = formatTime(response.data.time);

    let weatherIconElement = document.querySelector('#weather-icon');
    weatherIconElement.setAttribute('src', response.data.condition.icon_url);

    let temperatureElement = document.querySelector('#weather-temperature');
    temperatureElement.innerHTML = `${Math.round(response.data.temperature.current)}ºC`;

    let conditionElement = document.querySelector('#weather-condition');
    conditionElement.innerHTML = response.data.condition.description;

    let messageElement = document.querySelector('#weather-message');
    let localDate = new Date();
    let message = localDate.getHours() >= 18 ? 'good evening!' : localDate.getHours() >= 12 ? 'good afternoon!' : 'good morning!';
    messageElement.innerHTML = message;

    let feelsLikeElement = document.querySelector('#feels-like');
    feelsLikeElement.innerHTML = `${Math.round(response.data.temperature.feels_like)}ºC`;

    let humidityElement = document.querySelector('#humidity');
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

    let windElement = document.querySelector('#wind');
    windElement.innerHTML = `${response.data.wind.speed.toFixed(1)}m/s`;

}

function formatTime(timestamp) {
    let date = new Date();
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let day = days[date.getDay()];
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${day.toLowerCase()} ${hours}:${minutes} ${ampm}`
}