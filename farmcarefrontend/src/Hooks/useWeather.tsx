import { useState, useEffect } from "react";

const useWeather = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const success = (data: any) => {
      setLatitude(data.coords.latitude);
      setLongitude(data.coords.longitude);
    };

    const error = (err: any) => console.log(err);

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.error) {
            setWeather(data);
          } else {
            setWeather(null);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [latitude, longitude]);

  return weather;
};

export default useWeather;
