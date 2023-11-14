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
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather).then(getForecast);
}

function updateWeather(response) {
    console.log(response);

    let cityElement = document.querySelector('#city');
    cityElement.innerHTML = response.data.city;

    let dateElement = document.querySelector('#date');
    dateElement.innerHTML = formatTime(response.data.time * 1000);

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
    let date = new Date(timestamp);
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let day = days[date.getDay()];
    let hours = date.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${day.toLowerCase()} ${hours}:${minutes}`
}

function displayForecast(){
    let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let forecastHTML = ``;
    days.forEach(function(day){
        forecastHTML += `
    <div class="forecast-container">
        <div class="forecast-date">${day}</div>
        <div><img class="forecast-icon" src="https://www.svgrepo.com/show/451956/weather-showers.svg"></div>
        <div class="forecast-temperature">
            <span class="forecast-temperature-max">30º</span> 
            <span class="forecast-temperature-min">22º</span>
        </div>
    </div>`;
    });

    let forecastElement = document.querySelector('#forecast');
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
    let apiKey = "e1be014tf0fdae934obf9211d31032be";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
}
