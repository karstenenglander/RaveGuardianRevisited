// Feedback.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Feedback = () => {
  const navigation = useNavigation();

  const handleSendEmail = async () => {
    const email = 'raveguardianrevisited@gmail.com';
    const subject = 'Feedback';
    const body = 'Sent from my iPhone';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert("Email App Not Found", "No email app available to send feedback.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <Text style={styles.instructions}>Suggestions for Guardian? Email us at</Text>
      <Text style={styles.email}>raveguardianrevisited@gmail.com</Text>

      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>Send Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", color: "#b00b0b", marginBottom: 20 },
  instructions: { fontSize: 16, textAlign: "center", marginBottom: 5 },
  email: { fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 20 },
  button: {
    backgroundColor: "#b00b0b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});
