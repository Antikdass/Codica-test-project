import React, { useEffect, useState } from "react";

// helpers
import "./home.scss";
import { useDispatch } from "react-redux";
import citiesData from "../../mockData/city.list.json";
import { getCitiWeatherApi } from "../../redux/citiesWeather";

// types
import { AppDispatch } from "../../redux/store";
import { ICitiesData, IWeatherData } from "../../interfases/Interfases";

// assets
import SadSky from "../../assets/sadSky.png";

// components
import {
   Box,
   Autocomplete,
   TextField,
   Typography,
   Grid,
   createFilterOptions,
} from "@mui/material";
import WeatherCardComponent from "../../component/weatherCard/WeatherCard";

const Home = () => {
   const dispatch = useDispatch<AppDispatch>();

   const [selectedCities, setSelectedCities] = useState<Array<string>>([]);
   const [weatherData, setWeatherData] = useState<Array<IWeatherData>>([]);

   const getAllCity = (citiesData as Array<ICitiesData>)
      .filter(({ state }) => state)
      .map(({ name }) => name);

   const filterCity = getAllCity.filter(
      (item) => !selectedCities.includes(item)
   );
   const onChange = async (value: Array<string>, e: any) => {
      setSelectedCities(value);
      localStorage.setItem("cities", JSON.stringify(value));

      if (e.target.textContent) {
         const findedCityWithCountryCode: ICitiesData | undefined = (
            citiesData as Array<ICitiesData>
         )
            .filter(({ state }) => state)
            .find((x) => x.name === e.target.textContent);

         dispatch(
            getCitiWeatherApi({
               lat: findedCityWithCountryCode?.coord.lat,
               lon: findedCityWithCountryCode?.coord.lon,
            })
         ).then(getWeatherInfoAboutCity);
      } else {
         const filteredWeatherData = weatherData.filter((item: IWeatherData) =>
            value.includes(item.name)
         );
         setWeatherData(filteredWeatherData);
         localStorage.setItem(
            "weatherData",
            JSON.stringify(filteredWeatherData)
         );
      }
   };

   useEffect(() => {
      const citiesLocalData: Array<string> | null = JSON.parse(
         localStorage.getItem("cities") as string
      );
      const weatherData: Array<IWeatherData> | null = JSON.parse(
         localStorage.getItem("weatherData") as string
      );
      const coords = weatherData?.map(({ coord }) => coord);

      let promises: any = [];

      coords?.forEach(({ lat, lon }) => {
         let c = dispatch(
            getCitiWeatherApi({
               lat: lat,
               lon: lon,
            })
         );
         promises.push(c);
      });

      promises.length && getRefreshData(promises);

      if (citiesLocalData?.length) {
         setSelectedCities(citiesLocalData);
      }

      if (weatherData?.length) {
         setWeatherData(weatherData);
      }
   }, []);

   function getWeatherInfoAboutCity(result: any) {
      if (Array.isArray(result)) {
         setWeatherData(result.map((x) => x.payload));
      } else {
         setWeatherData([...weatherData, result.payload]);
         localStorage.setItem(
            "weatherData",
            JSON.stringify([...weatherData, result.payload])
         );
      }
   }

   function getRefreshData(promises: any) {
      Promise.all(promises).then(getWeatherInfoAboutCity);
   }

   const fileOption = createFilterOptions({
      ignoreCase: true,
      matchFrom: "start",
      limit: 1000,
   });

   return (
      <Box className="home" data-testid="Card">
         <Autocomplete
            filterOptions={fileOption}
            disableListWrap
            multiple
            fullWidth
            renderGroup={(params) => params as unknown as React.ReactNode}
            value={selectedCities}
            onChange={(e, newValue) => onChange(newValue as Array<string>, e)}
            options={getAllCity.length ? filterCity : []}
            renderOption={(props, option) => {
               return (
                  <li {...props} key={props.id}>
                     {option as React.ReactNode}
                  </li>
               );
            }}
            renderInput={(params) => <TextField {...params} label="Cities" />}
         />
         {weatherData?.length ? (
            <Grid container sx={{ display: "flex" }}>
               {weatherData.map((item: IWeatherData) => {
                  return (
                     <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        xl={2}
                        key={item.name}
                        sx={{ padding: "10px" }}
                     >
                        <WeatherCardComponent
                           coord={item.coord}
                           main={item.main}
                           cityName={item.name}
                           weather={item.weather}
                        />
                     </Grid>
                  );
               })}
            </Grid>
         ) : (
            <Box className="empty-block">
               <Typography className="empty-block-title">
                  No city has been selected
               </Typography>
               <img alt="" className="empty-block-img" src={SadSky} />
            </Box>
         )}
      </Box>
   );
};
export default Home;
