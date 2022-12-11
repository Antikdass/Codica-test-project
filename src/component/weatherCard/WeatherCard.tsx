import React from "react";

// helpers
import "./WeatherCard.scss";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { kelvinToCelsius } from "../../hooks/kelvinToCelsius";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getCitiWeatherApi } from "../../redux/citiesWeather";

// types
import { IWeather, IWeatherData } from "../../interfases/Interfases";

// assets
import refreshButton from "../../assets/refreshButton.png";

// components
import { Box, CircularProgress, Typography } from "@mui/material";

const WeatherCardComponent = ({ cityName, main, weather, coord }: IWeather) => {
   const [isAnimated, setIsAnimated] = React.useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();

   const anim = (event: Event, { lat, lon }: { lat: number; lon: number }) => {
      event.preventDefault();
      event.stopPropagation();

      if (!isAnimated) {
         setIsAnimated(true);
      }
      setTimeout(() => setIsAnimated(false), 1000);
      dispatch(getCitiWeatherApi({ lat: lat, lon: lon })).then(
         setNewWeatherData
      );
   };
   const setNewWeatherData = ({ payload }: any) => {
      const weatherData: Array<IWeatherData> | null = JSON.parse(
         localStorage.getItem("weatherData") as string
      );
      const updateWeatherData = weatherData?.map((item) => {
         if (item.name === cityName) {
            item = payload;
         }
         return item;
      });
      localStorage.setItem("weatherData", JSON.stringify(updateWeatherData));
   };
   const onClick = () => {
      navigate(`/detail-info/${cityName}`);
   };

   return (
      <Box className="card-rapper">
         {isAnimated && (
            <Box className="loading">
               <CircularProgress color="inherit" />
            </Box>
         )}
         <Box className={cn("card", { blured: isAnimated })} onClick={onClick}>
            <Typography className="counrty-name">{cityName}</Typography>
            <Box
               onClick={(event: any) => anim(event, coord)}
               className="refresh-weather-button"
            >
               <img
                  className={cn("refresh-icon", { rotate: isAnimated })}
                  src={refreshButton}
                  alt=""
               />
            </Box>
            {weather[0] && (
               <img
                  src={`http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`}
                  alt=""
               />
            )}
            <Typography className="weather-description">
               {weather[0]?.description}
            </Typography>
            <Typography className="temp-title">Temperature</Typography>
            <Box className="min-max-temp-wrapper">
               <Typography>
                  Min: {kelvinToCelsius(main?.temp_min)}&#8451;
               </Typography>
               <Typography>
                  Max: {kelvinToCelsius(main?.temp_max)}&#8451;
               </Typography>
            </Box>
         </Box>
      </Box>
   );
};

export default WeatherCardComponent;
