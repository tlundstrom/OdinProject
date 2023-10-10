import { IWeather } from "../App";

interface IProps {
  unit: boolean;
  weather: IWeather;
  setUnit: (newUnit: boolean) => void;
}

const DisplayWeather = ({ weather, unit, setUnit }: IProps) => {
  const isUSA = (weather: IWeather) => {
    if (weather.location.country === "United States of America" || weather.location.country === "USA") {
      setUnit(false);
      return weather.location.region;
    }
    setUnit(true);
    return weather.location.country;
  };

  return (
    <>
      <h1>
        {weather.location.name.toUpperCase()}, {isUSA(weather).toUpperCase()}
      </h1>
      <div style={{ display: "flex" }}>
        <img src={weather.current.condition.icon} alt={weather.current.condition.text} width="128px" />
        <h2 style={{ fontSize: "100px" }}>
          {unit ? weather.current.temp_c.toFixed(0) : weather.current.temp_f.toFixed(0)}
          <span>&deg;{unit ? `C` : `F`}</span>
        </h2>
        <div className="weatherDetails">
          <p>
            FEELS LIKE: {unit ? weather.current.feelslike_c.toFixed(0) : weather.current.feelslike_f.toFixed(0)}
            <span>&deg;{unit ? `C` : `F`}</span>
          </p>
          <p>
            WIND: {unit ? weather.current.gust_mph : weather.current.gust_kph}
            {unit ? ` KPH` : ` MPH`}
          </p>
          <p>HUMIDITY: {weather.current.humidity}%</p>
        </div>
      </div>
    </>
  );
};

export default DisplayWeather;
