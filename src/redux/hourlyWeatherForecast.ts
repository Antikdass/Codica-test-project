import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIConfig, APIKey } from "../config/api";
import { default as APIService } from "../api/instance";

export interface IcountryWeatherData {
   lat: string;
   lon: string;
}

export const gethourlyWeatherForecastApi = createAsyncThunk<any, any>(
   "hourlyWeatherForecast/gethourlyWeatherForecastApi",
   async (data) => {
      const responce = await APIService.get(APIConfig.hourlyWeatherForecast, {
         params: { lat: data?.lat, lon: data?.lon, appid: APIKey },
      }).then(({ data }) => data);

      return responce;
   }
);

export const hourlyWeatherForecastSlice = createSlice({
   name: "hourlyWeatherForecast",
   initialState: {},
   reducers: {},
   extraReducers: {
      [gethourlyWeatherForecastApi.pending.type]: (_, _i) => {},
      [gethourlyWeatherForecastApi.fulfilled.type]: (_, _i) => {},
      [gethourlyWeatherForecastApi.rejected.type]: (_, _i) => {},
   },
});

const hourlyWeatherForecastReducer = hourlyWeatherForecastSlice.reducer;
export default hourlyWeatherForecastReducer;
