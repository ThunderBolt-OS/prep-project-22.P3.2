import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import ThingsToCarry from "./components/ThingsToCarry/ThingsToCarry";
import SearchBar from "./components/SearchBar/SearchBar";
import { geolocation } from "./api/geolocation";
import logo from "./mlh-prep.png";
import dotenv from "dotenv";
import sunny from "./sunny.webp";
import MainComponent from "./components/MainComponent/MainComponent";
import CircularProgress from "@mui/material/CircularProgress";
import NotificationBar from "./components/NotificationBar/NotificationBar";

dotenv.config();

function App() {
  // const [position, setPosition] = [51.505, -0.09];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);
  const firstUpdate = useRef(true);
  const [currentUnit, setCurrentUnit] = useState("celsius");

  useEffect(() => {
    async function getLocation() {
      const locationResponse = await geolocation();
      if (locationResponse instanceof Error || locationResponse === undefined) {
        setError(locationResponse);
      } else {
        setCity(locationResponse.cityName);
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = results
      ? `url(https://source.unsplash.com/1920x1080/?${results.weather[0].main})`
      : sunny;
  }, [results]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  return (
    <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <SearchBar setCity={setCity} />
        {error && <NotificationBar error={error} setError={setError} setCity={setCity} />}
        {isLoaded ? (
          <div className="first-container">
            <MainComponent
              results={results}
              currentUnit={currentUnit}
              setCurrentUnit={setCurrentUnit}
            />
            <HourlyForecast currentUnit={currentUnit} city={city} />
          </div>
        ) : (
          <CircularProgress size={50} style={{ marginTop: "50px", color: "white" }} />
        )}
      </div>

      {results?.weather?.length && (
        <ThingsToCarry weatherType={results.weather[0].main} />
      )}
    </>
  );
}

export default App;
