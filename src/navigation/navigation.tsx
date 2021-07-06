import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WeatherScreen from '@modules/weather/screens/WeatherScreen';
import theme from 'theme/theme';

const Stack = createStackNavigator();

export default function RootStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WeatherScreen"
        component={WeatherScreen}
        options={{
          title: 'Clima',
          headerStyle: {
            backgroundColor: theme.colors.darkBlue,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {color: theme.colors.white},
        }}
      />
    </Stack.Navigator>
  );
}
