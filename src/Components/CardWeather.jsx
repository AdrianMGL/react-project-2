import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/CardWeather.css";
import optional from "/src/logo.svg";
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
  const [data, setData] = useState({});
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

  //console.log(data);
  //console.log(degrees);

  /**
   *
   * CONVERT
   */

  // console.log(degrees);

  /** (296.46 K − 273.15) × 9/5 + 32 = 73.958 °F */
  /** (73.958 °F − 32) × 5/9 = 23.31 °C */
  /** (23.31 °C × 9/5) + 32 = 73.958 °F */

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
              <h2 className="time">
                {/* <i class='bx bx-calendar fa-2x'></i> */}
                {time}
              </h2>
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

        <div className="card__info-pronostics">
          <ul className="card__date">
            <li className="date__0">
              <img src={optional} style={{ width: "140%" }} alt="sun" />
            </li>
            <li className="date__1">
              <h3>Today</h3>
              <span className="date__1-grade">12°</span>
            </li>
            <li className="date__2">
              <h3>Tue</h3>
              <img src={optional} style={{ width: "70%" }} alt="sun" />
              <span>12°</span>
            </li>
            <li className="date__3">
              <h3>Wed</h3>
              <img src={optional} style={{ width: "70%" }} alt="sun" />
              <span>10°</span>
            </li>
            <li className="date__4">
              <h3>Thu</h3>
              <img src={optional} style={{ width: "70%" }} alt="sun" />
              <span>8°</span>
            </li>
            <li className="date__5">
              <h3>Fri</h3>
              <img src={optional} style={{ width: "70%" }} alt="sun" />
              <span>8°</span>
            </li>
            <li className="date__6">
              <h3>Sat</h3>
              <img src={optional} style={{ width: "70%" }} alt="sun" />
              <span>4°</span>
            </li>
            <li className="date__7">
              <h3>Sun</h3>
              <img src={optional} style={{ width: "70%" }} alt="sun" />
              <span>-2°</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardWeather;
