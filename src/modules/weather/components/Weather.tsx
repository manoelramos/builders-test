import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyledView, Text} from '@components/components';
import {selectGetWeather} from '@stores/weather/weather.store';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {getWeatherAction} from 'stores/weather/weather.types';

export default function Weather(): JSX.Element {
  const weather = useAppSelector(selectGetWeather);
  const dispatch = useAppDispatch();

  function updateInformation() {
    dispatch(getWeatherAction());
  }

  return (
    <StyledView flex={1} p="m" bg="darkBlue" alignItems="center">
      <StyledView flexDirection="row" mt="m">
        <Icon name="location-outline" color="white" size={16} />
        <Text fontSize={16} fontWeight="700" color="white" ml="n">
          {weather?.name}
        </Text>
      </StyledView>
      <Text fontSize={60} color="white" mt="xl">
        {Math.round(weather.main?.temp)}º
      </Text>
      {!!weather.weather && (
        <Text mt="l" color="white" fontSize={16} fontWeight="bold">
          {weather?.weather[0].description}
        </Text>
      )}
      <StyledView
        bg="blurEffect"
        width="100%"
        p="m"
        mt="m"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-evenly">
        <StyledView>
          <Text color="white">Umidade</Text>
          <Text color="white">{weather.main?.humidity}%</Text>
        </StyledView>
        <StyledView height="100%" bg="white" width={1} mx="m" />
        <StyledView>
          <Text color="white">Temp. mínima</Text>
          <Text color="white">{Math.round(weather.main?.temp_min)}º</Text>
        </StyledView>
        <StyledView height="100%" bg="white" width={1} mx="m" />
        <StyledView>
          <Text color="white">Temp. máxima</Text>
          <Text color="white">{Math.round(weather.main?.temp_max)}º</Text>
        </StyledView>
      </StyledView>
      <TouchableOpacity onPress={updateInformation}>
        <StyledView flexDirection="row" alignItems="center" mt="xl">
          <Icon name="refresh" size={14} color="white" />
          <Text ml="n" color="white">
            Atualizar
          </Text>
        </StyledView>
      </TouchableOpacity>
    </StyledView>
  );
}
