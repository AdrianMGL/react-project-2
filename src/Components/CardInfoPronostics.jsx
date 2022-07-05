import axios from "axios";
import { useEffect, useState } from "react";

const CardInfoPronostics = ({ iconWeather, alt, degrees }) => {
  const apiKeyForecast = "5406ab4a9e35ae5d255bbc503fe31a98";
  const [forecast, setForecastData] = useState({});
  const iconForecast = `http://openweathermap.org/img/wn/${forecast.list?.[0].weather[0].icon}@2x.png`;
  const iconForecast2 = `http://openweathermap.org/img/wn/${forecast.list?.[12].weather[0].icon}@2x.png`;
  const iconForecast3 = `http://openweathermap.org/img/wn/${forecast.list?.[20].weather[0].icon}@2x.png`;
  const iconForecast4 = `http://openweathermap.org/img/wn/${forecast.list?.[28].weather[0].icon}@2x.png`;
  const iconForecast5 = `http://openweathermap.org/img/wn/${forecast.list?.[36].weather[0].icon}@2x.png`;

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKeyForecast}`;

      /** */
      fetch(urlForecast)
        .then((response) => {
          if (!response.ok) throw { response };
          return response.json();
        })
        .then((forecastData) => {
          setForecastData(forecastData);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // console.log(forecast);

  /** Date */

  let forecastDate1 =
    forecast.list?.[1].dt_txt.substring(8, 10) +
    "/" +
    forecast.list?.[1].dt_txt.substring(5, 7) +
    "/" +
    forecast.list?.[1].dt_txt.substring(0, 4);

  /** */
  let forecastDate2 =
    forecast.list?.[12].dt_txt.substring(8, 10) +
    "/" +
    forecast.list?.[12].dt_txt.substring(5, 7) +
    "/" +
    forecast.list?.[12].dt_txt.substring(0, 4);

  /** */
  let forecastDate3 =
    forecast.list?.[20].dt_txt.substring(8, 10) +
    "/" +
    forecast.list?.[20].dt_txt.substring(5, 7) +
    "/" +
    forecast.list?.[20].dt_txt.substring(0, 4);

  /** */
  let forecastDate4 =
    forecast.list?.[28].dt_txt.substring(8, 10) +
    "/" +
    forecast.list?.[28].dt_txt.substring(5, 7) +
    "/" +
    forecast.list?.[28].dt_txt.substring(0, 4);

  /** */
  let forecastDate5 =
    forecast.list?.[36].dt_txt.substring(8, 10) +
    "/" +
    forecast.list?.[36].dt_txt.substring(5, 7) +
    "/" +
    forecast.list?.[36].dt_txt.substring(0, 4);

  /** */

  return (
    <div className="card__info-pronostics">
      <ul className="card__date">
        <li className="date__0">
          <img src={iconWeather} style={{ width: "200%" }} alt={alt} />
        </li>
        <li className="date__1">
          <h3 className="today">Today</h3>
          <span className="date__1-grade">{degrees}</span>
        </li>
        <li className="date__2">
          <h3>{forecastDate1}</h3>
          <img src={iconForecast} style={{ width: "70%" }} alt="sun" />
          <span>
            {(((forecast.list?.[0].main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            )}
            ºF
          </span>
        </li>
        <li className="date__3">
          <h3>{forecastDate2}</h3>
          <img src={iconForecast2} style={{ width: "70%" }} alt="sun" />
          <span>
            {(((forecast.list?.[12].main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            )}
            ºF
          </span>
        </li>
        <li className="date__4">
          <h3>{forecastDate3}</h3>
          <img src={iconForecast3} style={{ width: "70%" }} alt="sun" />
          <span>
            {(((forecast.list?.[20].main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            )}
            ºF
          </span>
        </li>
        <li className="date__5">
          <h3>{forecastDate4}</h3>
          <img src={iconForecast4} style={{ width: "70%" }} alt="sun" />
          <span>
            {(((forecast.list?.[28].main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            )}
            ºF
          </span>
        </li>
        <li className="date__6">
          <h3>{forecastDate5}</h3>
          <img src={iconForecast5} style={{ width: "70%" }} alt="sun" />
          <span>
            {(((forecast.list?.[36].main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            )}
            ºF
          </span>
        </li>
      </ul>
    </div>
  );
};

export default CardInfoPronostics;
