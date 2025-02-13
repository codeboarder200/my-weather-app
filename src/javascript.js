function displayTemperature(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  let tempDegree = document.querySelector("#temp-degree");
  tempDegree.innerHTML = `${currentTemp}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.city}`;
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

let form = document.querySelector("#enter-a-city");
form.addEventListener("submit", search);
