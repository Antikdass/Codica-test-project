export interface IWeatherData {
   base: string;
   clouds: { all: number };
   cod: number;
   coord: { lon: number; lat: number };
   dt: number;
   id: number;
   main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      grnd_level: number;
      humidity: number;
      sea_level: number;
   };
   name: string;
   sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
   };
   timezone: number;
   cisibiliti: number;
   weather: Array<{
      description: string;
      icon: string;
      id: number;
      main: string;
   }>;
   wind: { speed: number; deg: number; gust: number };
}

export interface IWeather {
   coord: { lat: number; lon: number };
   cityName: string;
   main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
   };
   weather: Array<{
      description: string;
      icon: string;
      id: number;
      main: string;
   }>;
}

export interface ICitiesData {
   id: number;
   name: string;
   state: string;
   country: string;
   coord: { lon: number; lat: number };
}
export interface IList {
   clouds: { all: number };
   dt: number;
   dt_txt: string;
   main: {
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_kf: number;
      temp_max: number;
      temp_min: number;
   };
   pop: number;
   sys: { pod: string };
   visibility: number;
   weather: Array<{
      description: string;
      icon: string;
      id: number;
      main: string;
   }>;
   wind: { speed: number; deg: number; gust: number };
}

export interface IWeatherForecastData {
   citi: {
      coord: { lat: number; lon: number };
      country: string;
      id: number;
      name: string;
      population: number;
      sunrise: number;
      sunset: number;
      timezone: number;
   };
   cnt: number;
   cod: string;
   list: Array<IList>;
   message: number;
}