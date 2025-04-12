import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal } from "react-native";
import { getAuth, signOut, updatePassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { app } from './App';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth(app);
  const user = auth.currentUser;

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been signed out.");
      navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    try {
      await updatePassword(user, newPassword);
      Alert.alert("Success", "Password updated successfully.");
      setShowPasswordModal(false);
      setNewPassword("");
    } catch (error) {
      console.error("Password update error:", error);
      Alert.alert("Error", error.message || "Could not update password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.optionButton} onPress={() => setShowPasswordModal(true)}>
        <Text style={styles.optionText}>Edit Account Information</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>Notification Preferences</Text>
      </TouchableOpacity>

     

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Password Change Modal */}
      <Modal visible={showPasswordModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowPasswordModal(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#b00b0b" },
  optionButton: {
    paddingVertical: 15, paddingHorizontal: 10, backgroundColor: "#f1f1f1",
    borderRadius: 8, marginBottom: 10,
  },
  optionText: { fontSize: 16 },
  logoutButton: {
    paddingVertical: 15, marginTop: 30, backgroundColor: "#b00b0b", borderRadius: 8,
  },
  logoutText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },

  // Modal styles
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%",
  },
  modalTitle: {
    fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#b00b0b", textAlign: "center",
  },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row", justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#b00b0b", padding: 10, borderRadius: 5, flex: 1, marginRight: 10,
  },
  buttonCancel: {
    backgroundColor: "#aaa", padding: 10, borderRadius: 5, flex: 1,
  },
  buttonText: {
    color: "white", fontWeight: "bold", textAlign: "center",
  },
});
