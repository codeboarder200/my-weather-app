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
    let apiKey = "fte5f4o35f8ba2b321d1c0ebb3adf4a1";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
}

function getForecast(city) {
  let apiKey = "fte5f4o35f8ba2b321d1c0ebb3adf4a1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast() {
  let daysOfForecast = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";
  daysOfForecast.forEach(function (day) {
    forecastHTML += `<div class="weather-forecast-day">
                <div class="weather-forecast-date">${day}</div>
                <div class="weather-forecast-icon">⛅</div>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temp-high">
                    <strong>15°</strong>
                  </span>
                  <span class="weather-forecast-temp-low">9°</span>
                </div>
              </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#enter-a-city");
form.addEventListener("submit", search);

displayForecast();
