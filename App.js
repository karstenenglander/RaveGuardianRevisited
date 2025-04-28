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

        {/* Sign In, Sign Up, and Home */}
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={FourSquaresLayout} options={{ headerShown: false }} />

        {/* Settings */}
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
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

        {/* Inbox */}
        <Stack.Screen 
          name="Inbox" 
          component={InboxScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />

        {/* Live Chat */}
        <Stack.Screen 
          name="LiveChat" 
          component={LiveChatScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />

        {/* Submit Tip */}
        <Stack.Screen 
          name="SubmitTip" 
          component={SubmitTipScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />

        {/* Safety Timer */}
        <Stack.Screen 
          name="SafetyTimer" 
          component={SafetyTimerScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />

        {/* Account Details */}
        <Stack.Screen 
          name="AccountDetails" 
          component={AccountDetails} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />

        {/* Emergency Contacts */}
        <Stack.Screen 
          name="EmergencyContacts" 
          component={EmergencyContacts} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />

        {/* Vehicles */}
        <Stack.Screen 
          name="Vehicles" 
          component={Vehicles} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />

        {/* Notification Preferences */}
        <Stack.Screen 
          name="NotificationPreferences" 
          component={NotificationPreferences} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />

        {/* Terms and Conditions */}
        <Stack.Screen 
          name="TermsAndConditions" 
          component={TermsAndConditions} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: Platform.OS !== 'android',
          }}
        />

        {/* Feedback */}
        <Stack.Screen 
          name="Feedback" 
          component={Feedback} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require('./assets/msu_logo.png')} style={{ width: 40, height: 40, marginRight: 8 }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#b00b0b" }}>
                  Montclair State University
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "white", height: 100 },
            headerTitleAlign: "center",
            headerShadowVisible: true,
            headerBackVisible: true,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
