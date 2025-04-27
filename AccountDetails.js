// AccountDetails.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { app } from "./firebaseConfig";
import MainScreenWrapper from './MainScreenWrapper';

const AccountDetails = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    const loadInfo = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setPhoneNumber(data.phoneNumber || "");
        }
      }
    };
    loadInfo();
  }, []);

  const handleSave = async () => {
    if (!firstName || !lastName || !phoneNumber) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        phoneNumber
      });
      Alert.alert("Success", "Information saved.");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving account details:", error);
      Alert.alert("Error", "Could not save your information.");
    }
  };

  return (
    <MainScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>My Account Details</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#eee' }]}
          value={email}
          editable={false}
          selectTextOnFocus={false}
        />

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </MainScreenWrapper>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#b00b0b",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#b00b0b",
    padding: 15,
    borderRadius: 8,
    marginTop: 20
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
