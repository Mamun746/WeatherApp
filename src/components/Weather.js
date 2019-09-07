import React, { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "93035ff64b779e81b5a5f805d8067fc3";
const url = "http://api.openweathermap.org/data/2.5/weather";

const Weather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(
    "Enter city and counter to find weather"
  );

//   Form handle
  const handleSubmit = e => {
    e.preventDefault();
    updateData(`${url}?q=${city},${country},&APPID=${apiKey}`);
  };

//   Use useEffect hooks to fetch data from openWeather api
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const [latitude, longitude] = pos.coords;
        updateData(`${url}?lat=${latitude}&lon=${longitude},&APPID=${apiKey}`);
      },
      _err => {
        setMessage("Please enter city and counter to find weather");
      }
    );
  }, []);

//   Axios fetching data
  const updateData = url => {
    axios
      .get(url)
      .then(res => {
        if (res.data.cod === 200) {
          setData(res.data);
          console.log(res.data);
          console.log(res.data.name);
        } else {
          setMessage("City not found");
        }
      })
      .catch(err => {
        setMessage("Unable to fetch data");
      });
  };

  return (
    <div>
      <form className="input-data" onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter City"
            required
          />
        </div>
        <div className="input">
          <input
            type="text"
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder="Enter Country"
          />
        </div>
        <div className="input-button">
          <input type="submit" value="Get Weather" />
        </div>
      </form>

      {data && data.cod === 200 ? (
        <div>
          <div className="main-data">
            <div>
              <img
                style={{ height: "90px", width: "90px" }}
                alt={data.weather[0].description}
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              />
              <h1 className="temperature">
                {Math.round(data.main.temp - 273)}°C
              </h1>
              <div className="minHighTemp">
                <h4>{`Max: ${Math.round(
                  data.main.temp_max - 273
                )}°C - Min: ${Math.round(data.main.temp_min - 273)}°C `}</h4>
              </div>
              <div>
                <h3 className="description">{`${data.weather[0].description}(${data.name},${data.sys.country})`}</h3>
              </div>
            </div>
          </div>
          <div className="list" style={{}}>
            <ul>
              <li>{`Humidity:   ${data.main.humidity}%`}</li>
              <li>{`Description: ${data.weather[0].description}`}</li>
              <li>{`Location: ${data.weather[0].description}(${data.name},${data.sys.country})`}</li>
              <li>{`Wind: ${data.wind.speed} m/s`}</li>
              <li>{`Pressure: ${data.main.pressure} pha`}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              color: "#f4f4f4",
              textAlign: "center",
              fontSize: "20px",
              marginTop: "20px"
            }}
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
