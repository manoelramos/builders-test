interface IWeatherObject {
  main: string;
  description: string;
}

export interface IWeather {
  weather: IWeatherObject[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  sys: {
    country: string;
  };
  name: string;
}

export interface IWeatherState {
  weather: IWeather;
  isLoading: boolean;
  latitude?: number;
  longitude?: number;
}

export interface ICoordinate {
  latitude?: number;
  longitude?: number;
}

export interface ISetWeather {
  weather: IWeather;
}

export const weatherSagaActions = {
  GET_WEATHER: 'GET_WEATHER',
};

export type ActionGetWeatherType = {
  type: string;
};

export function getWeatherAction(): ActionGetWeatherType {
  return {
    type: weatherSagaActions.GET_WEATHER,
  };
}
