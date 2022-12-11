import React from "react";
// helpers
import "./WeatherGraph.scss";
import { kelvinToCelsius } from "../../hooks/kelvinToCelsius";

// components
import { Box, Typography } from "@mui/material";
import { IList } from "../../interfases/Interfases";

const WeatherGraph = ({ array }:any) => {

   return (
      <Box className="weather-graph-component">
         <Box className="weather-graph-wrapper">
            {array?.map((item: IList, index: number) => (
               <Box
                  key={item.dt}
                  className="weather-graph-block"
                  sx={{
                     left: index * 60,
                     top: 200 - kelvinToCelsius(item.main.temp) * 3,
                     background: `linear-gradient(138deg, rgba(204,226,69,0.4) ${
                        60 - kelvinToCelsius(item.main.temp) * 3
                     }%, rgba(231,145,69,0.4) ${
                        100 - kelvinToCelsius(item.main.temp) * 2
                     }%, rgba(244,92,92,0.4) 100%);`,
                  }}
               >
                  <>
                     {item.main.temp > 0 ? (
                        <>&#43; {kelvinToCelsius(item.main.temp)}&#176;</>
                     ) : (
                        <>{kelvinToCelsius(item.main.temp)}&#176;</>
                     )}
                     <Typography className="weather-graph-time">
                        {item.dt_txt.substring(11, 16)}
                     </Typography>
                  </>
               </Box>
            ))}
         </Box>
      </Box>
   );
};
export default WeatherGraph;
