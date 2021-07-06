import {takeEvery, all} from 'redux-saga/effects';
import {getWeather} from './weather/weather.saga';
import {weatherSagaActions} from './weather/weather.types';

function* watchGetWeather() {
  yield takeEvery(weatherSagaActions.GET_WEATHER, getWeather);
}

export default function* rootSaga() {
  yield all([watchGetWeather()]);
}
