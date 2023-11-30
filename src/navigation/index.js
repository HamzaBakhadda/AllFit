import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import TrainingScreen from '../screens/TrainingScreen';
import TopScoreScreen from '../screens/TopScoreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TopScoreNewScreen from '../screens/TopScoreNewScreen';
import TopScoreProfileScreen from '../screens/TopScoreProfileScreen';
import ExerciseProfileScreen from '../screens/ExerciseProfileScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Training" component={TrainingScreen} />
        <Stack.Screen name="TopScore" component={TopScoreScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="TopScoreNew" component={TopScoreNewScreen} />
        <Stack.Screen name="TopScoreProfile" component={TopScoreProfileScreen} />
        <Stack.Screen name="ExerciseProfile" component={ExerciseProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
