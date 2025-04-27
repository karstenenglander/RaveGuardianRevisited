// Vehicles.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "./firebaseConfig";
import MainScreenWrapper from "./MainScreenWrapper";

const Vehicles = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [plateState, setPlateState] = useState("");

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const docRef = doc(db, "vehicles", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMake(data.make || "");
        setModel(data.model || "");
        setColor(data.color || "");
        setYear(data.year || "");
        setLicensePlate(data.licensePlate || "");
        setPlateState(data.plateState || "");
      }
    };
    fetchData();
  }, [user]);

  const handleSave = async () => {
    if (!make || !model || !color || !year || !licensePlate || !plateState) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      await setDoc(doc(db, "vehicles", user.uid), {
        make,
        model,
        color,
        year,
        licensePlate,
        plateState
      });
      Alert.alert("Saved", "Vehicle information updated.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not save vehicle info.");
    }
  };

  return (
    <MainScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Vehicle Information</Text>

        <TextInput
          style={styles.input}
          placeholder="Make"
          value={make}
          onChangeText={setMake}
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          value={model}
          onChangeText={setModel}
        />
        <TextInput
          style={styles.input}
          placeholder="Color"
          value={color}
          onChangeText={setColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
        <TextInput
          style={styles.input}
          placeholder="License Plate"
          value={licensePlate}
          onChangeText={setLicensePlate}
        />
        <TextInput
          style={styles.input}
          placeholder="Plate State"
          value={plateState}
          onChangeText={setPlateState}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </MainScreenWrapper>
  );
};

export default Vehicles;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#b00b0b",
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  saveButton: {
    backgroundColor: "#b00b0b",
    padding: 15,
    borderRadius: 8
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  }
});