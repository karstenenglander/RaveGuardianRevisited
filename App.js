import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { NavigationHandler } from "./NavigationHandler";

const FourSquaresLayout = ({ navigation }) => {
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
            onPress={NavigationHandler.handleLiveChat}
          >
            <Text style={styles.squareText}>Live Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.roundedSquare}
            onPress={NavigationHandler.handleSafetyTimer}
          >
            <Text style={styles.squareText}>Safety Timer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.roundedSquare}
            onPress={NavigationHandler.handleSubmitTip}
          >
            <Text style={styles.squareText}>Submit Tip</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.roundedSquare}
            onPress={NavigationHandler.handleCallPolice}
          >
            <Text style={styles.squareText}>Call Police</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom White Section with 3 Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => NavigationHandler.handleHomePress(navigation)}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => NavigationHandler.handleInboxPress(navigation)}
        >
          <Text style={styles.buttonText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => NavigationHandler.handleSettingsPress(navigation)}
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