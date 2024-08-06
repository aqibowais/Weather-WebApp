const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const noDataMessage = document.querySelector(".no-data-message");

const searchWeather = () => {
  const APIkey = "9219f0c082fc3e0bbb4eb54e43eeaf9c";
  const city = searchInput.value.trim();

  if (city === "") {
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        noDataMessage.textContent = "No data found";
        noDataMessage.style.display = "block";
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        return;
      }

      noDataMessage.style.display = "none";
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      switch (data.weather[0].main) {
        case "Clear":
          image.src = "assets/sunny.png";
          break;
        case "Rain":
          image.src = "assets/moderateorheavyrainwiththunder.png";
          break;
        case "Snow":
          image.src = "assets/fog.png";
          break;
        case "Clouds":
          image.src = "assets/cloudy.png";
          break;
        case "Mist":
          image.src = "assets/mist.png";
          break;
        case "Haze":
          image.src = "assets/mist.png";
          break;
        default:
          image.src = "assets/moderateorheavyrainshower.png";
      }

      temperature.innerHTML = `${parseInt(data.main.temp - 273.15)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      noDataMessage.textContent = "Error fetching data";
      noDataMessage.style.display = "block";
    });
};

search.addEventListener("click", searchWeather);

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});
