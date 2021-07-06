import React from 'react';
import {Platform} from 'react-native';
import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';

import Geolocation from 'react-native-geolocation-service';
import {setCoordinate} from '@stores/weather/weather.store';
import {useAppDispatch} from './redux';

interface ILocationServiceHook {
  requestLocationPermission(): void;
  getLocation(): void;
  hasLocationPermissions: boolean;
  isLoaded: boolean;
}

export default function useLocationService(): ILocationServiceHook {
  const dispatch = useAppDispatch();
  const [hasLocationPermissions, setHasLocationPermissions] =
    React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const checkIfNeedRequestPermission = React.useCallback(statuses => {
    const statusesValues = Object.values(statuses);

    if (statusesValues.includes('denied')) {
      requestLocationPermission();
    } else {
      setHasLocationPermissions(true);
    }
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      checkMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]).then(statuses => {
        checkIfNeedRequestPermission(statuses);
        setIsLoaded(true);
      });
    } else {
      checkMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ]).then(statuses => {
        checkIfNeedRequestPermission(statuses);
        setIsLoaded(true);
      });
    }
  }, [checkIfNeedRequestPermission]);

  const getLocation = React.useCallback(() => {
    if (hasLocationPermissions) {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          dispatch(
            setCoordinate({
              latitude: coords.latitude,
              longitude: coords.longitude,
            }),
          );
        },
        () => {},
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
      );
    }
  }, [hasLocationPermissions, dispatch]);

  function requestLocationPermission() {
    if (Platform.OS === 'android') {
      requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]).then(statuses => {
        checkIfNeedRequestPermission(statuses);
      });
    } else {
      requestMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ]).then(statuses => {
        checkIfNeedRequestPermission(statuses);
      });
    }
  }

  React.useEffect(() => {
    getLocation();
  }, [getLocation]);

  return {
    requestLocationPermission,
    getLocation,
    hasLocationPermissions,
    isLoaded,
  };
}
