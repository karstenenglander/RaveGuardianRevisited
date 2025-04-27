import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import FourSquaresLayout from './FourSquaresLayout';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import AccountDetails from './AccountDetails';
import EmergencyContacts from './EmergencyContacts';
import Feedback from './Feedback';
import InboxScreen from './InboxScreen';
import LiveChatScreen from './LiveChatScreen';
import NotificationPreferences from './NotificationPreferences';
import SafetyTimerScreen from './SafetyTimerScreen';
import SettingsScreen from './SettingsScreen';
import SubmitTipScreen from './SubmitTipScreen';
import TermsAndConditions from './TermsAndConditions';
import Vehicles from './Vehicles';

const Stack = createNativeStackNavigator();

const NavigationHandler = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: true,
          animation: 'slide_from_right',
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={FourSquaresLayout} />
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="LiveChat" component={LiveChatScreen} />
        <Stack.Screen name="NotificationPreferences" component={NotificationPreferences} />
        <Stack.Screen name="SafetyTimer" component={SafetyTimerScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="SubmitTip" component={SubmitTipScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="Vehicles" component={Vehicles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationHandler;
