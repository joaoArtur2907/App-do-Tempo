// App.js
import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import VantaClouds from "./components/vantaClouds/VantaClouds";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("default");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

        // Inicia a transição de opacidade
        setIsTransitioning(true);

        // Espera 1 segundo (igual ao CSS) antes de trocar o clima
        setTimeout(() => {
          setWeatherCondition(weatherResponse.weather[0].main);
          setIsTransitioning(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
        }}
      >
        <VantaClouds
          weatherCondition={weatherCondition}
          isHidden={isTransitioning}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;
