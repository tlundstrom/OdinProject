import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { setDayMode, setNightMode } from "./utilities/themeing";
import { Button, Input, InputGroup } from "reactstrap";
import DisplayWeather from "./components/DisplayWeather";

export interface IWeather {
  current: {
    last_updated_epoch: number;
    last_updated: Date;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: number;
    localtime_epoch: number;
    localtime: Date;
  };
}

function App() {
  const [unit, setUnit] = useState(false);
  const [weather, setWeather] = useState<IWeather>();
  const [formData, setFormData] = useState<string>();
  const [location, setLocation] = useState<string>();

  useEffect(() => {
    apiCall(location || "Pullman");
  }, [location]);

  weather && weather.current.is_day === 0 ? setNightMode() : setDayMode();

  const apiCall = async (city: string) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=6960a5f4801d4da7835194339230510&q=${city}&aqi=no`);
      setWeather(response.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const handleSubmit = () => {
    setLocation(formData);
  };

  const toggleUnit = () => {
    setUnit((prevState) => !prevState);
  };

  return (
    <div className="gridContainer">
      <div className="inputGroup">
        <InputGroup style={{ width: "250px" }} size="lg">
          <Input
            className="input"
            onChange={handleChange}
            value={formData || ""}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          {unit ? (
            <Button style={{ minWidth: "55px" }} onClick={toggleUnit}>
              &deg;C
            </Button>
          ) : (
            <Button style={{ minWidth: "55px" }} onClick={toggleUnit}>
              &deg;F
            </Button>
          )}
        </InputGroup>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="weatherDisplay">
        {weather && <DisplayWeather unit={unit} weather={weather} />}
      </div>
    </div>
  );
}

export default App;
