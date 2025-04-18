import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Linking } from "react-native";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Firebase configuration
import { app } from './firebaseConfig'; // Import the configured app from firebaseConfig

const analytics = getAnalytics(app);

const FourSquaresLayout = () => { // Remove { navigation } from props
  const navigation = useNavigation(); // Access the navigation object

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleInboxPress = () => {
    navigation.navigate('Inbox');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleLiveChat = () => {
    navigation.navigate('LiveChat');
  };

  const handleSafetyTimer = () => {
    navigation.navigate("SafetyTimer");
  };

  const handleSubmitTip = () => {
    navigation.navigate('SubmitTip');
  };

  const handleCallPolice = () => {
    const phoneNumber = 'tel:5551234567'; // Replace with your desired phone number
        Linking.canOpenURL(phoneNumber)
          .then((supported) => {
            if (!supported) {
              Alert.alert('Error', 'Phone calling is not supported on this device.');
            } else {
              return Linking.openURL(phoneNumber);
            }
          })
          .catch((err) => console.error('An error occurred', err));
      
  };




  return (
    <View style={styles.container}>
      {/* Top Header Positioned at Absolute Top */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Montclair State University</Text>
        </View>
      </SafeAreaView>

      {/* Centered Rounded Squares with Text */}
      <View style={styles.squaresContainer}>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.roundedSquare}
            onPress={handleLiveChat}
          >
            <Text style={styles.squareText}>Live Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.roundedSquare}
            onPress={handleSafetyTimer}
          >
            <Text style={styles.squareText}>Safety Timer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.roundedSquare}
            onPress={handleSubmitTip}
          >
            <Text style={styles.squareText}>Submit Tip</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.roundedSquare}
            onPress={handleCallPolice}
          >
            <Text style={styles.squareText}>Call Police</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom White Section with 3 Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleHomePress}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleInboxPress}
        >
          <Text style={styles.buttonText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSettingsPress}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    width: 130,
    height: 130,
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

export default FourSquaresLayout;
