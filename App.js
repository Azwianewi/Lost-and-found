import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './screens/AppNavigator';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const MainApp = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => MainApp); // Register MainApp instead of App

export default MainApp;
