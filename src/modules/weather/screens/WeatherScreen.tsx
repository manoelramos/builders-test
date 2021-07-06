import React from 'react';
import useLocationService from '@hooks/useLocationService';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import LottieView from 'lottie-react-native';
import {
  selectWeatherIsLoading,
  selectCoords,
} from '@stores/weather/weather.store';
import {getWeatherAction} from '@stores/weather/weather.types';
import WeatherWindAnimation from '@animations/weather-wind.json';
import NoLocationPermission from '../components/NoLocationPermission';
import Weather from '../components/Weather';
import {StyledView} from 'components/components';

export default function WeatherScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {hasLocationPermissions, isLoaded} = useLocationService();
  const isLoading = useAppSelector(selectWeatherIsLoading);
  const coords = useAppSelector(selectCoords);

  React.useEffect(() => {
    if (coords.latitude && coords.longitude) {
      dispatch(getWeatherAction());
    }
  }, [coords.latitude, coords.longitude, dispatch]);

  if (isLoaded && !hasLocationPermissions) {
    return <NoLocationPermission />;
  }

  if (isLoading) {
    return (
      <StyledView bg="darkBlue" flex={1}>
        <LottieView autoPlay loop source={WeatherWindAnimation} />
      </StyledView>
    );
  }

  return <Weather />;
}
