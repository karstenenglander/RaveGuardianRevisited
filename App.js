import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, Text, View, Button, Alert } from 'react-native';

export default function App() {
    const [greeting, setGreeting] = useState("Current Timer: Zero Seconds"); // State for the greeting
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  
    const handlePress = (newGreeting) => {
      setGreeting(newGreeting);
      setIsLoading(true); // Show the indicator.
  
      console.log("Three second timer started");
  
      setTimeout(() => {
        // Simulate some work or API call here...
        console.log("Three second timer completed");
  
        setIsLoading(false); // Hide the indicator
      }, 3000); // 3-second delay (adjust as needed)

  };
  return (
    <View style={styles.container}>
        <Text style={styles.baseText}>{greeting}</Text>      
        <Button 
        title="Begin 3 second timer"
        onPress={() => handlePress("Current Timer: Three Seconds")}
        disabled={isLoading}
        color="#fff" // Optional: customize button color
      />
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />} {/* ActivityIndicator here */}
      <Button
        title="Cancel timer"
        onPress={() =>Alert.alert("Cancel Timer", "Are you sure you wish to cancel the timer?", [
          {text: "Yes, cancel",
            onPress: () =>{
              console.log("Timer cancelled by user");
              setIsLoading(false);
              setGreeting("Timer cancelled");
            },
          },
          {text: "No, do not cancel",
            style: "cancel",
            onPress: () =>{
              console.log("Timer continued");
            },
          },
        ])}
        color="#fff"
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    color: '#fff'
  },
});