import React from 'react';
import {Dimensions} from 'react-native';
import {StyledView, Text, Button} from '@components/components';
import LottieView from 'lottie-react-native';
import GPSAnimation from '@animations/gps-location.json';
import useLocationService from '@hooks/useLocationService';

const {height} = Dimensions.get('window');

export default function NoLocationPermission(): JSX.Element {
  const {requestLocationPermission} = useLocationService();

  return (
    <StyledView flex={1} alignItems="center" justifyContent="center" p="m">
      <LottieView
        autoPlay
        loop
        source={GPSAnimation}
        style={{height: height * 0.4}}
      />
      <Text fontSize={16} mt="l">
        É necessário a permissão de localização
      </Text>
      <Button
        p="m"
        bg="greenPrimary"
        label="Solicitar permissão"
        mt="xl"
        onPress={requestLocationPermission}
        borderRadius={4}
      />
    </StyledView>
  );
}
