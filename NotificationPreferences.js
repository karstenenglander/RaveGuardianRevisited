// NotificationPreferences.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { app } from "./App";

const NotificationPreferences = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [prefs, setPrefs] = useState({
    liveChat: true,
    safetyTimer: true,
    inbox: true
  });

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const docRef = doc(db, "notificationPreferences", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPrefs(docSnap.data());
        }
      } catch (error) {
        console.error("Failed to load notification preferences:", error);
      }
    };
    fetchPrefs();
  }, []);

  const handleToggle = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSetAll = (value) => {
    setPrefs({ liveChat: value, safetyTimer: value, inbox: value });
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "notificationPreferences", user.uid), prefs);
      Alert.alert("Saved", "Notification settings updated.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save notification preferences.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Preferences</Text>

      <View style={styles.toggleRow}>
        <TouchableOpacity style={styles.toggleAllButton} onPress={() => handleSetAll(true)}>
          <Text style={styles.toggleAllText}>Turn All On</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleAllButton} onPress={() => handleSetAll(false)}>
          <Text style={styles.toggleAllText}>Turn All Off</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Live Chat</Text>
        <Switch
          value={prefs.liveChat}
          onValueChange={() => handleToggle("liveChat")}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Safety Timer</Text>
        <Switch
          value={prefs.safetyTimer}
          onValueChange={() => handleToggle("safetyTimer")}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Inbox Alerts</Text>
        <Switch
          value={prefs.inbox}
          onValueChange={() => handleToggle("inbox")}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationPreferences;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", color: "#b00b0b", textAlign: "center", marginBottom: 20 },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15
  },
  toggleAllButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  toggleAllText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#b00b0b"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  label: { fontSize: 16 },
  saveButton: {
    backgroundColor: "#b00b0b",
    padding: 15,
    borderRadius: 8,
    marginTop: 30
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  }
});