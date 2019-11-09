//alert("Hello World");

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];

let date = now.getDate();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

function giveFullMinutes() {
  if (now.getMinutes() < 10) {
    return "0" + now.getMinutes();
  } else {
    return now.getMinutes();
  }
}

function giveFullHour() {
  if (now.getHours() < 10) {
    return "0" + now.getHours();
  } else {
    return now.getHours();
  }
}

function updateTime() {
  let time = `${giveFullHour()}:${giveFullMinutes()}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day}, ${month} ${date}, ${time}`;
}

function searchWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
  let city = document.querySelector("#city-name");
  city.innerHTML = `Today in ${cityInput.value}`;
  city.classList.add("bold-city");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather);
  showCityForecast();
}

function showCityForecast(event) {
  let cityInput = document.querySelector("#city-input");
  let cityForecast = document.querySelector("#city-name-forecast");
  cityForecast.innerHTML = `${cityInput.value}`;
}

function searchCurrentWeather(response) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentWeather);
}

function showCityForecastCurrent(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  let cityForecast = document.querySelector("#city-name-forecast");
  cityForecast.innerHTML = response.data.name;
}

//function replaceCity(cityName) {
//event.preventDefault();
//let searchValue = document.querySelector("#city-input");
//if (searchValue.value.length) {
//let city = document.querySelector("#city-name");
//city.innerHTML = searchValue.value;
//city.classList.add("bold-city");

//}}

function showWeather(response) {
  let temperatureMax = Math.round(response.data.main.temp_max);
  let currentTemperatureMax = document.querySelector("#temperature-max");
  currentTemperatureMax.innerHTML = `${temperatureMax}`;

  let temperatureMin = Math.round(response.data.main.temp_min);
  let currentTemperatureMin = document.querySelector("#temperature-min");
  currentTemperatureMin.innerHTML = `${temperatureMin}`;

  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showCurrentWeather(response) {
  let temperatureMax = Math.round(response.data.main.temp_max);
  let currentTemperatureMax = document.querySelector("#temperature-max");
  currentTemperatureMax.innerHTML = `${temperatureMax}`;

  let temperatureMin = Math.round(response.data.main.temp_min);
  let currentTemperatureMin = document.querySelector("#temperature-min");
  currentTemperatureMin.innerHTML = `${temperatureMin}`;
  console.log(response.data.weather.description);

  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = response.data.weather[0].description;

  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = `Today in ${response.data.name}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  showCityForecastCurrent();
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureMax = document.querySelector("#temperature-max");
  let temperatureMin = document.querySelector("#temperature-min");
  let fahrenheitMax = temperatureMax.innerHTML;
  let celsiusMax = Math.round((fahrenheitMax - 32) * (5 / 9));
  let fahrenheitMin = temperatureMin.innerHTML;
  let celsiusMin = Math.round((fahrenheitMin - 32) * (5 / 9));
  let celsiusSign = document.querySelector("#celsius");
  let fahrenheitSign = document.querySelector("#fahrenheit");
  celsiusSign.classList.add("active");
  fahrenheitSign.classList.remove("active");
  temperatureMax = celsiusMax;
  temperatureMin = celsiusMin;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureMax = document.querySelector("#temperature-max");
  let temperatureMin = document.querySelector("#temperature-min");
  let celsiusMax = temperatureMax.innerHTML;
  let fahrenheitMax = Math.round((celsiusMax * 9) / 5 + 32);
  let celsiusMin = temperatureMin.innerHTML;
  let fahrenheitMin = Math.round((celsiusMin * 9) / 5 + 32);
  temperatureMax = fahrenheitMax;
  temperatureMin = fahrenheitMin;

  let fahrenheitSign = document.querySelector("#fahrenheit");
  let celsiusSign = document.querySelector("#celsius");
  celsiusSign.classList.remove("active");
  fahrenheitSign.classList.add("active");
}

let currentWeather = document.querySelector("#current-weather");
currentWeather.addEventListener("click", searchCurrentWeather);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", searchWeather);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

updateTime();
