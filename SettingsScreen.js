// Final SettingsScreen.js with all buttons including Terms and Conditions, Emergency Contacts, Vehicles, and Feedback
import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, Alert,
  TextInput, Modal
} from "react-native";
import { getAuth, signOut, updatePassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { app } from './App';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAccountInfo(docSnap.data());
        }
      }
    };
    fetchUserInfo();
  }, []);

  const logActivity = async (type, email) => {
    try {
      await addDoc(collection(db, "logs"), {
        type, email,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

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
      await logActivity("password_change", user.email);
      Alert.alert("Success", "Password updated successfully.");
      setShowPasswordModal(false);
      setNewPassword("");
    } catch (error) {
      console.error("Password update error:", error);
      Alert.alert("Error", error.message || "Could not update password.");
    }
  };

  const handleSendRecoveryEmail = async () => {
    if (!recoveryEmail.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, recoveryEmail);
      await logActivity("password_recovery", recoveryEmail);
      Alert.alert("Email Sent", "Check your inbox for a recovery link.");
      setShowRecoverModal(false);
      setRecoveryEmail("");
    } catch (error) {
      console.error("Recovery error:", error);
      Alert.alert("Error", error.message || "Could not send recovery email.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("AccountDetails")}>        
        <Text style={styles.optionText}>Account Details </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("EmergencyContacts")}>        
        <Text style={styles.optionText}>Emergency Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("Vehicles")}>        
        <Text style={styles.optionText}>My Vehicle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => setShowPasswordModal(true)}>
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("NotificationPreferences")}>        
        <Text style={styles.optionText}>Notification Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => setShowRecoverModal(true)}>
        <Text style={styles.optionText}>Recover Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("TermsAndConditions")}>        
        <Text style={styles.optionText}>View Terms and Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("Feedback")}>        
        <Text style={styles.optionText}>Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Password Modal */}
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

      {/* Recover Modal */}
      <Modal visible={showRecoverModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Recover Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={recoveryEmail}
              onChangeText={setRecoveryEmail}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={handleSendRecoveryEmail}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowRecoverModal(false)}>
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
