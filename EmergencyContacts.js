// EmergencyContacts.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "./firebaseConfig";
import MainScreenWrapper from './MainScreenWrapper';

const EmergencyContacts = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const docRef = doc(db, "emergencyContacts", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setContactName(data.name || "");
        setContactPhone(data.phone || "");
        setRelationship(data.relationship || "");
      }
    };
    fetchData();
  }, [user]);

  const handleSave = async () => {
    if (!contactName || !contactPhone || !relationship) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      await setDoc(doc(db, "emergencyContacts", user.uid), {
        name: contactName,
        phone: contactPhone,
        relationship: relationship
      });
      Alert.alert("Saved", "Emergency contact updated.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save contact info.");
    }
  };

  return (
    <MainScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Emergency Contact</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={contactName}
          onChangeText={setContactName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={contactPhone}
          onChangeText={setContactPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Relationship (e.g. Mother, Spouse)"
          value={relationship}
          onChangeText={setRelationship}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </MainScreenWrapper>
  );
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", color: "#b00b0b", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15
  },
  saveButton: {
    backgroundColor: "#b00b0b", padding: 15, borderRadius: 8
  },
  saveButtonText: {
    color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16
  }
});
