import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';

const SubmitTipScreen = () => {
  const [tip, setTip] = useState("");

  const handleSubmit = () => {
    Alert.alert("Tip Submitted", `Your tip: "${tip}" was sent (placeholder).`);
    setTip("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90} // tweak as needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* your Submit Tip content here */}
          <Text style={styles.title}>Submit a Tip</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your tip here..."
            value={tip}
            onChangeText={setTip}
            multiline
            returnKeyType="done"
            blurOnSubmit={true}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SubmitTipScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  button: { backgroundColor: "#b00b0b", padding: 12, borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
});
