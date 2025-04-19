import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Linking, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const FourSquaresLayout = () => {
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
    const phoneNumber = 'tel:5551234567';
    Linking.openURL(phoneNumber).catch(() =>
      Alert.alert('Error', 'Unable to make the call.')
    );
  };
  

  return (
    <View style={styles.container}>
      {/* Top Header Positioned at Absolute Top */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          {/* Add the logo and text */}
          <Image source={require('./assets/msu_logo.png')} style={styles.logo} />
          <Text style={styles.headerText}>Montclair State University</Text>
        </View>
      </SafeAreaView>

      {/* Centered Rounded Squares with Text */}
      <View style={styles.squaresContainer}>
  <View style={styles.row}>
    <TouchableOpacity style={styles.roundedSquare} onPress={handleLiveChat}>
      <Image source={require('./assets/liveChat.png')} style={styles.icon} />
      <Text style={styles.squareText}>Live Chat</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.roundedSquare} onPress={handleSafetyTimer}>
      <Image source={require('./assets/Timer.png')} style={styles.icon} />
      <Text style={styles.squareText}>Safety Timer</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.row}>
    <TouchableOpacity style={styles.roundedSquare} onPress={handleSubmitTip}>
      <Image source={require('./assets/submitTip.png')} style={styles.icon} />
      <Text style={styles.squareText}>Submit Tip</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.roundedSquare} onPress={handleCallPolice} activeOpacity={0.1}>
      <Image source={require('./assets/SOS.png')} style={styles.icon} />
      <Text style={styles.squareText}>Call Police</Text>
    </TouchableOpacity>
  </View>
</View>


      {/* Bottom White Section with 3 Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={handleHomePress}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleInboxPress}>
          <Text style={styles.buttonText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSettingsPress}>
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
    flexDirection: "row", // Align the logo and text horizontally
    alignItems: "center", // Vertically align the logo and text
    paddingVertical: 15,
    justifyContent: "center",
    elevation: 5,
  },
  logo: {
    width: 50,  // Adjust the width of the logo
    height: 50, // Adjust the height of the logo
    marginRight: 10, // Space between the logo and the text
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
    justifyContent: "flex-end", // Move content to the bottom
    alignItems: "center",
    paddingBottom: 15, // Add space from bottom
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
   icon: {
  width: 60,
  height: 60,
  marginBottom: 10,
},

 
  
});

export default FourSquaresLayout;