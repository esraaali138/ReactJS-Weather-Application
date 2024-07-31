import React, { useEffect, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { SiRainmeter } from "react-icons/si";
import { FaWind } from "react-icons/fa";
import { GiPressureCooker } from "react-icons/gi";
import axios from "axios";
import { PuffLoader } from "react-spinners";
const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
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

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <div className="container flex justify-center">
        <div className="bg-main w-[700px] p-5 mt-10 rounded-xl ">
          <p className="text-center text-3xl mt-2 text-[#bac2ce]">
            Weather App
          </p>
          <div className="w-[500px] flex justify-between mx-auto mt-4">
            <input
              className="p-2 w-full text-[#bac2ce] outline-0 rounded-xl bg-primary placeholder-[#bac2ce]"
              type="search"
              placeholder="Search for cities"
              onChange={handleChange}
            />
          </div>
          {loading ? (
            <div className="flex justify-center mt-10">
              <PuffLoader color="#4fa94d" size={80} />
            </div>
          ) : weatherData ? (
            <div>
              <div className="w-[450px] flex justify-between mx-auto">
                <div className="h-32 flex flex-col gap-8 mt-4">
                  <p className="text-[#f2f1f2] text-2xl font-semibold capitalize">
                    {weatherData.name}
                  </p>
                  <p className="text-[#f2f1f2] text-3xl font-semibold ">
                    {Math.round(weatherData.main.temp)} °C
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
              <div className="w-[500px] mx-auto bg-primary rounded-xl mt-10">
                <div className="p-5 w-full flex justify-between">
                  <p className="uppercase font-semibold text-[#707882]">
                    Air condition
                  </p>
                  <button className="bg-[#199af9] text-white rounded-xl w-24 py-1">
                    toggle
                  </button>
                </div>
                {/* air condition */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 w-full flex gap-2">
                    <span className="text-2xl text-[#707882]">
                      <FaWind />
                    </span>
                    <div className="flex-col">
                      <p className="text-[#707882] font-semibold capitalize">
                        wind
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
                    <div className="flex-col">
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
                    <div className="flex-col">
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
                    <div className="flex-col">
                      <p className="text-[#707882] font-semibold capitalize">
                        Chance of rain
                      </p>
                      <p className="text-[#bac2ce] text-xl font-semibold">20</p>
                    </div>
                    {/*  */}
                  </div>
                  {/* info */}
                </div>
                {/* grid */}
              </div>
            </div>
          ) : (
            <p className="text-center mt-10 text-[#bac2ce]">
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
