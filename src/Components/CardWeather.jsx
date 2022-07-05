import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/CardWeather.css";
import CardInfoPronostics from "./CardInfoPronostics";
import bgBeach from "/src/Video/bgBeach.mp4";

/**
 *
 *
 */

/** DATE */
let d = new Date();
let date = d.getDate();
let year = d.getFullYear();
let month = d.toLocaleString("en-US", { month: "long" });
let day = d.toLocaleString("en-US", { weekday: "long" });

/** TIME */
let time = d.toLocaleString([], {
  hour: "2-digit",
  minute: "2-digit",
  // second: "2-digit",
});
//console.log(time);

/**
 *
 */

const CardWeather = () => {
  /** */
  const apiKey = "dab77bea1efba5901788df3eeec113cd";
  //const apiKeyForecast = "5406ab4a9e35ae5d255bbc503fe31a98";
  //const oneCall = "c50cbee80bc0b08f7fbee10af4bca78f";

  const [data, setData] = useState({});
  const [forecast, setForecastData] = useState({});
  const iconWeather = `http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`;

  const [degrees, setDegrees] = useState(0);
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
          //  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKeyForecast}`

          // `https://api.openweathermap.org/data/2.5/forecast?lat=19.5789&lon=-101.6496&appid=5406ab4a9e35ae5d255bbc503fe31a98`
          // https://api.openweathermap.org/data/2.5/forecast?lat=19.5789&lon=-101.6496&appid=dab77bea1efba5901788df3eeec113cd
        )
        .then((res) => {
          setData(res.data);
          /** Kelvin to Fahrenheit */
          const ktofDegrees = (
            ((res.data.main.temp - 273.15) * 9) / 5 +
            32
          ).toFixed(2);
          setDegrees(ktofDegrees);
        });
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // console.log(data);

  /**
   *
   * CONVERT
   */

  const convertDegrees = () => {
    //const degreeCelsius = (((degreeKelvinFahrenheit - 32) * 5) / 9).toFixed(2);
    //console.log(degreeCelsius);
    if (isFahrenheit) {
      const celsi = (((degrees - 32) * 5) / 9).toFixed(2);
      // console.log(celsi);
      setDegrees(celsi);
      setIsFahrenheit(false);
    } else {
      //  const degreeFahrenheit = (degreeCelsius * 9) / 5 + 32;
      const fare = ((degrees * 9) / 5 + 32).toFixed(2);
      // console.log(fare);
      setDegrees(fare);
      setIsFahrenheit(true);
    }
  };

  /**
   *
   */

  return (
    <div className="card__container">
      <video loop autoPlay muted style={{}}>
        <source src={bgBeach} type="video/mp4" />
      </video>
      <div className="card">
        <p className="bg__container">
          <img
            src={`https://source.unsplash.com/1920x1280/?${data.weather?.[0].main}`}
            className="bg__container"
            alt={data.weather?.[0].main}
          />
        </p>

        <div className="card__info-today">
          <div className="card__date-today">
            <div className="today">
              <h2 className="time">{time}</h2>
              <span className="date">
                {day}, {date} {month} {year}.
              </span>
            </div>
            <div className="country">
              <span className="name__city">
                <i className="bx bx-map bx-flashing-hover"></i>
                {data.name}
              </span>
              <span className="name__country">
                <i className="bx bx-map-pin bx-burst-hover"></i>{" "}
                {data.sys?.country}
              </span>
            </div>
          </div>
          <div className="card__info-secondary">
            <div className="secondary__info">
              <h2 className="task__one">
                <i className="bx bx-wind bx-fade-right"></i>
                Wind speed
                <span>{data.wind?.speed} meter/sec</span>
              </h2>
              <h2 className="task__two">
                <i className="bx bx-cloud bx-flashing"></i>
                Clouds <span>{data.clouds?.all} %</span>
              </h2>
              <h2 className="task__three">
                <i className="bx bxs-thermometer bx-tada"></i>
                Pressure <span>{data.main?.pressure} hPa</span>
              </h2>
              <h2 className="task__four">
                <i className="bx bxs-droplet-half bx-burst"></i>
                Humidity <span>{data.main?.humidity} %</span>
              </h2>
              <h2 className="task__five">
                <i className="bx bx-sun bx-spin"></i>
                Max. temp.{" "}
                <span>{(data.main?.temp_max - 273.15).toFixed(1)} ºC</span>
              </h2>
              <h2 className="task__six ">
                <i className="bx bx-loader bx-spin"></i>
                Min. temp.{" "}
                <span>{(data.main?.temp_min - 273.15).toFixed(1)} ºC</span>
              </h2>
            </div>

            <div className="card__temp">
              <h2 className="card__temp-description">
                {data.weather?.[0].description}
              </h2>
              <img
                src={iconWeather}
                alt={data.weather?.[0].main}
                className="bx-burst-hover"
              />
              <h3 className="card__temp-today">
                {degrees} {isFahrenheit ? "Fahrenheit" : "Celsius"}
              </h3>
            </div>
            <div className="card__btn-degrees">
              <button className="btn degrees" onClick={convertDegrees}>
                Degrees °F/°C
              </button>
            </div>
          </div>
        </div>

        {/*  */}

        <CardInfoPronostics
          iconWeather={iconWeather}
          alt={data.weather?.[0].main}
          degrees={degrees}
        />
      </div>
    </div>
  );
};

export default CardWeather;
