import React, { useState, useEffect } from "react";
import useWeather from "../../Hooks/useWeather";
import {
  HomeButton,
  HomeComponent,
  HomeTitle,
  PLantDiseaseButton,
  WeatherHomeComponent,
  WeatherHomeTitle,
  WheatherHomeParagraph,
} from "./Home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

interface HomeTitleProps {
  mounted: boolean;
}

export const Home: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const weather = useWeather() as any;
  const { token } = useAuth();
  const user_role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");

  const navigate = useNavigate();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HomeComponent>
      <Sidebar />
      {weather && (
        <WeatherHomeComponent>
          <WeatherHomeTitle>Weather</WeatherHomeTitle>
          <WheatherHomeParagraph>
            Temperature: {weather.current.temperature_2m}°C
          </WheatherHomeParagraph>
          <WheatherHomeParagraph>
            Wind Speed: {weather.current.wind_speed_10m}m/s
          </WheatherHomeParagraph>
        </WeatherHomeComponent>
      )}
      <HomeTitle mounted={mounted}>FarmCare</HomeTitle>
      {token && user_role === "farmer" && (
        <>
          <HomeButton onClick={() => navigate(`/farms`)}>
            Explore your Farms
          </HomeButton>
          <PLantDiseaseButton
            onClick={() => navigate(`/plant-disease-classify`)}
          >
            Check Plant Disease
          </PLantDiseaseButton>
        </>
      )}
    </HomeComponent>
  );
};

//   ) : (
//     <h1>Loading the weather</h1>
//   )}
