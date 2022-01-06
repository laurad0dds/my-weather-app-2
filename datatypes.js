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

//display weather

function showTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = `${temp} °C`;

  let city = document.querySelector("h1");
  city.innerHTML = `${response.data.name}`;

  let feelstemp = document.querySelector("h3");
  feelstemp.innerHTML = ` Feels like ${response.data.main.feels_like} °C`;

  let conditions = document.querySelector("h4");
  conditions.innerHTML = `${response.data.weather[0].description}`;

  let iconElement = document.querySelector("littlelogo");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

let theform = document.querySelector("#search-form");
theform.addEventListener("submit", searchlocation);