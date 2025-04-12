import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from "react-native";
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


// Firebase is initialized only once in firebaseConfig.js
import './firebaseConfig'; // Just to make sure it runs once

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={FourSquaresLayout} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="LiveChat" component={LiveChatScreen} />
        <Stack.Screen name="SubmitTip" component={SubmitTipScreen} />
        <Stack.Screen name="SafetyTimer" component={SafetyTimerScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b00b0b",
  },
  safeArea: {
    width: "100%",
    paddingVertical: 5,
    position: "absolute",
    top: 0,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "center",
    elevation: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#b00b0b",
    textAlign: "center",
  },
  squaresContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  row: {
    flexDirection: "row",
  },
  roundedSquare: {
    width: 160,
    height: 160,
    backgroundColor: "white",
    borderRadius: 25,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  squareText: {
    color: "#b00b0b",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#b00b0b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
