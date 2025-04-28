import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Platform, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import FourSquaresLayout from "./FourSquaresLayout";
import SettingsScreen from './SettingsScreen';
import InboxScreen from './InboxScreen';
import LiveChatScreen from './LiveChatScreen';
import SubmitTipScreen from './SubmitTipScreen';
import SafetyTimerScreen from "./SafetyTimerScreen";
import AccountDetails from './AccountDetails';
import EmergencyContacts from './EmergencyContacts';
import Vehicles from './Vehicles';
import NotificationPreferences from './NotificationPreferences';
import Feedback from './Feedback';
import TermsAndConditions from './TermsAndConditions';
import { app, auth, db } from './firebaseConfig'; // ensure firebase is initialized

export const CURRENT_TERMS_VERSION = "2025-04-14";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={FourSquaresLayout} options={{ headerShown: false }} />

        {/* Settings with Custom Header */}
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image 
                  source={require('./assets/msu_logo.png')}
                  style={{ width: 40, height: 40, marginRight: 8 }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
          }}
        />

        {/* Other Screens with Blank Headers */}
        <Stack.Screen 
  name="Inbox" 
  component={InboxScreen} 
  options={{
    headerTitle: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image 
          source={require('./assets/msu_logo.png')}
          style={{ width: 40, height: 40, marginRight: 8 }}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
          Montclair State University
        </Text>
      </View>
    ),
    headerStyle: { backgroundColor: "white", height: 100 },
    headerTitleAlign: "center",
    headerShadowVisible: true, // bring back divider line
    headerBackVisible: Platform.OS !== 'android',
  }}
/>

        <Stack.Screen 
          name="LiveChat" 
          component={LiveChatScreen} 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "white", height: 100 },
            headerShadowVisible: false,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />
        <Stack.Screen 
          name="SubmitTip" 
          component={SubmitTipScreen} 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "white", height: 100 },
            headerShadowVisible: false,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />
        <Stack.Screen 
          name="SafetyTimer" 
          component={SafetyTimerScreen} 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "white", height: 100 },
            headerShadowVisible: false,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />
        <Stack.Screen 
          name="AccountDetails" 
          component={AccountDetails} 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "white", height: 100 },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
          name="EmergencyContacts" 
          component={EmergencyContacts} 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "white", height: 100 },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
          name="Vehicles" 
          component={Vehicles} 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "white", height: 100 },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
          name="NotificationPreferences" 
          component={NotificationPreferences} 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "white", height: 100 },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
          name="Feedback" 
          component={Feedback} 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "white", height: 100 },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
          name="TermsAndConditions" 
          component={TermsAndConditions} 
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "white", height: 100 },
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
