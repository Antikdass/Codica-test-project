import React, { useEffect, useState } from "react";

// helpers
import "./detailInfo.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { kelvinToCelsius } from "../../hooks/kelvinToCelsius";
import { gethourlyWeatherForecastApi } from "../../redux/hourlyWeatherForecast";

// types
import { AppDispatch } from "../../redux/store";
import {
   IList,
   IWeatherData,
   IWeatherForecastData,
} from "../../interfases/Interfases";

// components
import { Box, Grid, Typography } from "@mui/material";
import WeatherGraph from "../../component/weatherGraph/WeatherGraph";

const DetailInfo = () => {
   const dispatch = useDispatch<AppDispatch>();
   const params = useParams().city;
   const navigate = useNavigate();

   const [weatherData, setWeatherData] = useState<Array<IWeatherData>>([]);
   const [weather, setWeather] = useState<Array<IWeatherForecastData>>([]);
   const [sort, setSort] = useState<Array<IList>>([]);

   if (weather.length === 0 && weatherData.length) {
      dispatch(
         gethourlyWeatherForecastApi({
            lat: weatherData[0]?.coord?.lat,
            lon: weatherData[0]?.coord?.lon,
         })
      ).then(({ payload }: any) => setWeather([payload]));
   }

   useEffect(() => {
      const cityWeatherLocalData: Array<IWeatherData> = JSON.parse(
         localStorage.getItem("weatherData") as string
      );

      const cityWeatherData = cityWeatherLocalData
         ? cityWeatherLocalData.filter(
              (item: IWeatherData) => item.name === params
           )
         : [];

      if (cityWeatherData?.length) {
         setWeatherData(cityWeatherData);
      }

      const sortByDate: Array<IList> = weather[0]?.list?.filter(
         (item: IList, index: number) => index < 5
      );
      setSort(sortByDate);
   }, [weather]);

   return (
      <Box className="detail-info-page">
         <Box className="back" onClick={() => navigate("/")}>
            &#60;Back
         </Box>
         <Box className="detail-info-card">
            {weatherData.length ? (
               <Grid container className="upper-block">
                  <Grid item sm={4} className="first-block">
                     <Typography className="text">
                        {weatherData[0]?.name}
                     </Typography>
                     <Typography className="date">
                        Weather today in {moment().format("LT")}
                     </Typography>
                     <img
                        src={`http://openweathermap.org/img/wn/${weatherData[0]?.weather[0]?.icon}@2x.png`}
                        alt=""
                     />
                     <Typography>
                        {kelvinToCelsius(weatherData[0]?.main?.temp)}&#8451;
                     </Typography>
                  </Grid>
                  <Grid item sm={4} className="second-block">
                     <Box>
                        <Typography className="text">
                           Min temp:{" "}
                           {kelvinToCelsius(weatherData[0]?.main.temp_min)}
                           &#8451;
                        </Typography>
                        <Typography className="text">
                           Max temp:{" "}
                           {kelvinToCelsius(weatherData[0]?.main.temp_max)}
                           &#8451;
                        </Typography>
                        <Typography className="text">
                           Feels like:{" "}
                           {kelvinToCelsius(weatherData[0]?.main.feels_like)}
                           &#8451;
                        </Typography>
                     </Box>
                  </Grid>
                  <Grid item sm={4} className="third-block">
                     <Box>
                        <Typography className="text">
                           Clouds: {weatherData[0]?.clouds.all}&#37;
                        </Typography>
                        <Typography className="text">
                           Wind degreese: {weatherData[0]?.wind.deg}&#176;
                        </Typography>
                        <Typography className="text">
                           Wind gust: {weatherData[0]?.wind.gust}
                        </Typography>
                        <Typography className="text">
                           Wind speed: {weatherData[0]?.wind.speed} m&#47;s
                        </Typography>
                     </Box>
                  </Grid>
               </Grid>
            ) : (
               <>nothing</>
            )}
            <Box className="bottom-block">
               <Typography className="weather-for-days">
                  Weather for 5 hours
               </Typography>
               <WeatherGraph array={sort} />
            </Box>
         </Box>
      </Box>
   );
};
export default DetailInfo;
