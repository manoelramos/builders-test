import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IWeatherState,
  ICoordinate,
  ISetWeather,
  IWeather,
} from './weather.types';
import type {RootState} from '../reducers';

export const initialState: IWeatherState = {
  weather: {},
  isLoading: true,
  latitude: undefined,
  longitude: undefined,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCoordinate: (state, action: PayloadAction<ICoordinate>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setWeather: (state, action: PayloadAction<ISetWeather>) => {
      state.weather = action.payload.weather;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setCoordinate, setIsLoading, setWeather} = weatherSlice.actions;

export const selectGetWeather = (state: RootState): IWeather =>
  state.weather.weather;

export const selectWeatherIsLoading = (state: RootState): boolean =>
  state.weather.isLoading;

export const selectCoords = (state: RootState): ICoordinate => {
  return {
    latitude: state.weather.latitude,
    longitude: state.weather.longitude,
  };
};

export default weatherSlice.reducer;
