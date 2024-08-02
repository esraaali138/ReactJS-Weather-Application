import React, { useEffect, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { SiRainmeter } from "react-icons/si";
import { FaWind } from "react-icons/fa";
import { GiPressureCooker } from "react-icons/gi";
import axios from "axios";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  useEffect(() => {
    async function fetchData() {
      if (city) {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72a04bb7a94c95433583019b45fb9048&units=metric`
          );

          setWeatherData(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error fetching the weather data", error);
        }
        setLoading(false);
      } else {
        setWeatherData(null);
      }
    }
    fetchData();
  }, [city]);

  const convertCelsuisToFahrenheit = (Celsius) => Celsius * 1.8 + 32;

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <>
      <div className=" flex justify-center ">
        <div className="bg-main md:w-[700px]  p-5 mt-10 rounded-xl  sm:w-[450px] w-[350px] ">
          <p className="text-center text-3xl mt-2 text-[#bac2ce]">
            Weather App
          </p>
          <SearchBar setCity={setCity} />
          {loading ? (
            <Loader />
          ) : weatherData ? (
            <div>
              <div className="md:w-[450px]  sm:w-[350px] w-[280px] flex justify-between mx-auto">
                <div className="h-32  flex flex-col gap-8 mt-4">
                  <p className="text-[#f2f1f2] text-2xl font-semibold capitalize">
                    {weatherData.name}
                  </p>
                  <p className="text-[#f2f1f2] text-3xl font-semibold ">
                    {isCelsius
                      ? `${Math.round(weatherData.main.temp)} °C`
                      : `${Math.round(
                          convertCelsuisToFahrenheit(weatherData.main.temp)
                        )} °F`}
                  </p>
                </div>
                <div className="flex justify-center items-center w-30 mx-4 ">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt={weatherData.weather[0].description}
                  />
                  <p className="text-[#f2f1f2] capitalize font-semibold  ">
                    {weatherData.weather[0].description}
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="md:w-[500px] sm:w-[400px] mx-auto bg-primary rounded-xl mt-10">
                <div className="sm:p-5 p-3 w-full text-sm sm:text-lg flex justify-between">
                  <p className="uppercase font-semibold text-[#707882]">
                    Air condition
                  </p>
                  <button
                    onClick={handleToggle}
                    className="bg-[#199af9] text-white rounded-xl sm:px-4 px-2 py-2"
                  >
                    Temperature Unit
                  </button>
                </div>
                {/* air condition */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 w-full flex gap-2">
                    <span className="text-2xl text-[#707882]">
                      <FaWind />
                    </span>
                    <div className="flex sm:flex-col flex-row sm:w-[120px] w-[246px] max-w-full justify-between">
                      <p className="text-[#707882] font-semibold capitalize">
                        Wind
                      </p>
                      <p className="text-[#bac2ce] text-xl font-semibold">
                        {Math.round(weatherData.wind.speed)} km/h
                      </p>
                    </div>

                    {/*  */}
                  </div>
                  {/*  */}
                  <div className="p-5 w-full flex gap-2">
                    <span className="text-2xl text-[#707882]">
                      <GiPressureCooker />
                    </span>
                    <div className="flex sm:flex-col flex-row sm:w-[120px] w-[246px] max-w-full justify-between">
                      <p className="text-[#707882] font-semibold capitalize">
                        pressure
                      </p>
                      <p className="text-[#bac2ce] text-xl font-semibold">
                        {weatherData.main.pressure} hPa
                      </p>
                    </div>
                    {/*  */}
                  </div>
                  {/*  */}
                  <div className="p-5 w-full flex gap-2">
                    <span className="text-2xl text-[#707882]">
                      <WiHumidity />
                    </span>
                    <div className="flex sm:flex-col flex-row sm:w-[120px] w-[246px] max-w-full justify-between">
                      <p className="text-[#707882] font-semibold capitalize">
                        humidity
                      </p>
                      <p className="text-[#bac2ce] text-xl font-semibold">
                        {weatherData.main.humidity} %
                      </p>
                    </div>
                    {/*  */}
                  </div>
                  {/*  */}
                  <div className="p-5 w-full flex gap-2">
                    <span className="text-2xl text-[#707882]">
                      <SiRainmeter />
                    </span>
                    <div className="flex sm:flex-col flex-row sm:w-[120px] w-[246px] max-w-full justify-between ">
                      <p className="text-[#707882] font-semibold capitalize">
                        Chance of rain
                      </p>
                      <p className="text-[#bac2ce] text-xl font-semibold">
                        5 %
                      </p>
                    </div>
                    {/*  */}
                  </div>
                  {/* info */}
                </div>
                {/* grid */}
              </div>
            </div>
          ) : (
            <p className=" text-sm sm:text-lg text-center mt-10 text-[#bac2ce]">
              {" "}
              Please enter a city to see the weather information.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherDisplay;
