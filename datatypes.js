//date

let now = new Date();
let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

h2.innerHTML = `${day}, ${hours}:${minutes}`;

//display forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="days">${formatDay(forecastDay.dt)}</div>
      <img
src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
width="50"
class="emoji"
/>
    <div class="futureDegrees">${Math.round(forecastDay.temp.max)}</div>
       
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

//display weather

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKEY = "b258b70ded4754fdc5255e1806dbf713";
  let apiURl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKEY}&units=metric`;

  axios.get(apiURl).then(displayForecast);
}

function showTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = `${temp}`;

  let city = document.querySelector("h1");
  city.innerHTML = `${response.data.name}`;

  let feelstemp = document.querySelector("h3");
  feelstemp.innerHTML = ` Feels like ${response.data.main.feels_like} °C`;

  let conditions = document.querySelector("h4");
  conditions.innerHTML = `${response.data.weather[0].description}`;

  let iconElement = document.querySelector("img");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

//currentlocation

function searchlocation(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#newlocation");

  if (searchInput.value) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${searchInput.value}`;

    let key = "b258b70ded4754fdc5255e1806dbf713";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}&units=metric`;

    axios.get(`${apiUrl}&appid=${key}`).then(showTemp);
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}

function showFarenheittemp(event) {
  event.preventDefault();
  let fTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiuslink.classList.remove("active");
  farenheitlink.classList.add("active");
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(fTemperature);
}

function showCelsiustemp(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  farenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let theform = document.querySelector("#search-form");
theform.addEventListener("submit", searchlocation);

let farenheitlink = document.querySelector("#farenheit");
farenheitlink.addEventListener("click", showFarenheittemp);

let celsiuslink = document.querySelector("#celsius");
celsiuslink.addEventListener("click", showCelsiustemp);
