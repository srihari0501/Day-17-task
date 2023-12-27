document.addEventListener("DOMContentLoaded", () => {
  const cardRow = document.getElementById("cardRow");

  // Function to create Bootstrap card
  const createCard = (countryData) => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4";

    const cardHtml = `
      <div class="card h-100">
        <div class="card-header text-center">${countryData.name}</div>
        <div class="card-body text-center">
          <img src="${countryData.flag}" alt="Flag" class="card-img-top">
          <div class="card-text">Region: ${countryData.region}<br>
          Country Code: ${countryData.alpha3Code}<br>
          Capital: ${countryData.capital}<br>
          <button class="btn btn-primary" onclick="getWeather('${countryData.capital}')">Click for Weather</button>
        </div>
      </div>
    `;

    card.innerHTML = cardHtml;
    cardRow.appendChild(card);
  };

  // Function to fetch countries data
  const fetchCountriesData = () => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((country, index) => {
          createCard({
            name: country.name,
            capital: country.capital,
            latlng: country.latlng,
            flag: country.flag,
            region: country.region,  
            alpha3Code: country.alpha3Code,
            alpha2Code: country.alpha2Code,
          });

       
          if ((index + 1) % 3 === 0) {
            const newRow = document.createElement("div");
            newRow.className = "row";
            newRow.id = `cardRow${(index + 1) / 3}`;
            cardRow.appendChild(newRow);
          }
        });
      })
      .catch((error) => console.error("Error fetching countries data:", error));
  };

  // Function to fetch weather data
  window.getWeather = (name) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=dfcfcbbc148fdd638022a00a5111fb4a`)
      .then((response) => response.json())
      .then((data) => {
        const weatherInfo = {
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        };
        showWeatherAlert(weatherInfo);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  };
  const showWeatherAlert = (weatherInfo) => {
    alert(`
    The weather report for this country is
      Temperature: ${weatherInfo.temperature} K
      Description: ${weatherInfo.description}
      Humidity: ${weatherInfo.humidity}%
      Wind Speed: ${weatherInfo.windSpeed} m/s
    `);
  }
  // Call the function to fetch countries data
  fetchCountriesData();
});
