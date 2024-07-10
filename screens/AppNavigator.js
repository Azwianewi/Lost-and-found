import React, { useEffect, useState} from 'react';
import { BackHandler, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';
import PrivacyScreen from './PrivacyScreen';
import NotificationScreen from './NotificationScreen';
import EditProfileScreen from './EditProfileScreen';
import ViewAllRecentListingsScreen from './ViewAllRecentListingsScreen';
import HelpCenterScreen from './HelpCenterScreen';
import AboutScreen from './AboutScreen';
import ClaimScreen from './ClaimScreen';
import AddScreen from './AddScreen';
import RatingScreen from './RatingScreen';
import TwoStepVerificationScreen from './TwoStepVerificationScreen';
import ClearCacheScreen from './ClearCacheScreen';
import PasswordResetScreen from './PasswordResetScreen';



const Stack = createStackNavigator();

const AppNavigator = () => {

  const fetchUserData = async () => {
   
    return userData;
  };
  useEffect(() => {
    const handleBackButtonPress = () => {
     
      alert('Back button pressed!');
      return true; 
    };

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    }
    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
      }
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ViewAllRecentListingsScreen" component={ViewAllRecentListingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} options = {{headerShown: false}} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} options = {{headerShown: false}}/>
      <Stack.Screen name="AddScreen" component={AddScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TwoStepVerificationScreen" component={TwoStepVerificationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ClearCacheScreen" component={ClearCacheScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RatingScreen" component={RatingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="ClaimScreen" component={ClaimScreen} options={{ headerShown: false }} />
   
    </Stack.Navigator>
  );
};

export default AppNavigator;
