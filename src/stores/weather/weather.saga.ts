import {put, call, select} from 'redux-saga/effects';
import {setIsLoading, setWeather} from './weather.store';
import {RootState} from '../reducers';
import {IWeatherState} from './weather.types';
import api from '@services/instance';
import {AxiosResponse} from 'axios';

export function* getWeather() {
  try {
    yield put(setIsLoading(true));
    const weatherState: IWeatherState = yield select(
      (state: RootState) => state.weather,
    );
    const {latitude, longitude} = weatherState;

    const data: AxiosResponse = yield call(api.get, '/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });

    yield put(setWeather({weather: data.data}));

    yield put(setIsLoading(false));
  } catch (e) {
    yield put(setIsLoading(false));
  }
}
