import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Linking, Image, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';

import LiveChatIcon from './assets/liveChat.svg';
import SafetyTimerIcon from './assets/SafetyTimer.svg';
import SOSIcon from './assets/SOS_pic.svg';
import TipIcon from './assets/Tip.svg';

import LiveChatIconPNG from './assets/liveChat.png';
import SafetyTimerIconPNG from './assets/Timer.png';
import TipIconPNG from './assets/submitTip.png';
import SOSIconPNG from './assets/SOS.png';

const FourSquaresLayout = () => {
  const navigation = useNavigation();

  const handleHomePress = () => navigation.navigate('Home');
  const handleInboxPress = () => navigation.navigate('Inbox');
  const handleSettingsPress = () => navigation.navigate('Settings');
  const handleLiveChat = () => navigation.navigate('LiveChat');
  const handleSafetyTimer = () => navigation.navigate('SafetyTimer');
  const handleSubmitTip = () => navigation.navigate('SubmitTip');
  const handleCallPolice = () => {
    const phoneNumber = 'tel:9089679516'; // James' cell number for testing
    Linking.openURL(phoneNumber).catch(() =>
      Alert.alert('Error', 'Unable to make the call.')
    );
  };

  const renderIcon = (SvgComponent, PngSource, isLiveChat = false) => {
    const iconStyle = {
      width: 70,
      height: 70,
      marginBottom: 10,
      ...(isLiveChat ? { marginLeft: 10 } : {}), // move Live Chat icon slightly right
    };

    if (Platform.OS === 'android') {
      return <Image source={PngSource} style={iconStyle} />;
    } else {
      return <SvgComponent width={70} height={70} style={iconStyle} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image source={require('./assets/msu_logo.png')} style={styles.logo} />
          <Text style={styles.headerText}>Montclair State University</Text>
        </View>
      </SafeAreaView>

      {/* Center Squares */}
      <View style={styles.squaresContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.roundedSquare} onPress={handleLiveChat}>
            <View style={styles.iconTextContainer}>
              {renderIcon(LiveChatIcon, LiveChatIconPNG, true)}
              <Text style={styles.squareText}>Live Chat</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedSquare} onPress={handleSafetyTimer}>
            <View style={styles.iconTextContainer}>
              {renderIcon(SafetyTimerIcon, SafetyTimerIconPNG)}
              <Text style={styles.squareText}>Safety Timer</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.roundedSquare} onPress={handleSubmitTip}>
            <View style={styles.iconTextContainer}>
              {renderIcon(TipIcon, TipIconPNG)}
              <Text style={styles.squareText}>Submit Tip</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedSquare} onPress={handleCallPolice}>
            <View style={styles.iconTextContainer}>
              {renderIcon(SOSIcon, SOSIconPNG)}
              <Text style={styles.squareText}>Call Police</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
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
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#b00b0b" },
  safeArea: { width: "100%", paddingVertical: 5, position: "absolute", top: 0, backgroundColor: "white" },
  header: { flexDirection: "row", alignItems: "center", paddingVertical: 15, justifyContent: "center", elevation: 5 },
  logo: { width: 50, height: 50, marginRight: 10 },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#b00b0b", textAlign: "center" },
  squaresContainer: { justifyContent: "center", alignItems: "center", marginTop: 40 },
  row: { flexDirection: "row" },
  roundedSquare: { 
    width: 175, 
    height: 175, 
    backgroundColor: "white", 
    borderRadius: 25, 
    margin: 15, 
    justifyContent: "center", 
    alignItems: "center",
  },
  iconTextContainer: { 
    justifyContent: "center", 
    alignItems: "center",
  },
  squareText: { 
    color: "#b00b0b", 
    fontSize: 18, 
    fontWeight: "bold", 
    marginTop: 10,
  },
  bottomSection: { 
    position: "absolute", 
    bottom: 0, 
    width: "100%", 
    height: 100, 
    backgroundColor: "white", 
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    alignItems: "center" 
  },
  button: { 
    backgroundColor: "#b00b0b", 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 10 
  },
  buttonText: { 
    color: "white", 
    fontSize: 14, 
    fontWeight: "bold" 
  },
});

export default FourSquaresLayout;
