function displayTemperature(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  let tempDegree = document.querySelector("#temp-degree");
  tempDegree.innerHTML = `${currentTemp}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img
                    src="${response.data.condition.icon_url}"
                    class="emoji"
                    />`;
  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = days[date.getDay()];
  let day = document.querySelector("#date");

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let timeOfDay = hour + ":" + minutes;
  day.innerHTML = `${dayOfWeek}: ${timeOfDay}`;

  let city = searchInput.value.trim();
  if (city) {
    searchCity(city);
  }
}

function searchCity(city) {
  let apiKey = "fte5f4o35f8ba2b321d1c0ebb3adf4a1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fte5f4o35f8ba2b321d1c0ebb3adf4a1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `<div class="weather-forecast-day">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <div class="weather-forecast-icon"><img src="${
                  day.condition.icon_url
                }" /></div>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temp-high">
                    <strong>${Math.round(day.temperature.maximum)}°</strong>
                  </span>
                  <span class="weather-forecast-temp-low">${Math.round(
                    day.temperature.minimum
                  )}°</span>
                </div>
              </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#enter-a-city");
form.addEventListener("submit", search);

searchCity("Johannesburg");
