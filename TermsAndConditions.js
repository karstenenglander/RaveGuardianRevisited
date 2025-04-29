import React from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { CURRENT_TERMS_VERSION } from "./constants";
import { getFirestore } from "firebase/firestore";

const TermsAndConditions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const uid = route.params?.uid;

  const handleAgree = async () => {
    try {
      if (uid) {
        await setDoc(doc(db, "users", uid), {
          termsAcceptedVersion: CURRENT_TERMS_VERSION
        }, { merge: true });
      }

      // Delay navigation to avoid unmount crash on Android
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }, 50);
    } catch (error) {
      console.error("Error saving terms acceptance:", error);
      Alert.alert("Error", "Failed to save your response. Please try again.");
    }
  };

  const handleDecline = () => {
    Alert.alert(
      "Decline Terms?",
      "If you do not accept the terms, you will be signed out of the app.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Decline",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Access Denied",
              "You must accept the Terms to use the app.",
              [
                {
                  text: "OK",
                  onPress: async () => {
                    await signOut(auth);
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "SignIn" }],
                    });
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.date}>Date of Last Revision: April 14, 2025</Text>
        <Text style={styles.text}>
          This is a simulation project developed solely for educational purposes.
          It is not affiliated with, endorsed by, or connected in any way to any real emergency response,
          law enforcement, or public safety service. All features within the app are part of a controlled
          academic environment and are intended to simulate potential user experiences for research and learning.{"\n\n"}

          All data submitted through this application — including personal details, location data, and
          simulated emergency communications — is stored in Firebase Firestore. This data is only accessible
          to the four student developers directly responsible for this project: Katherine Rawlinson, Emad Rouf,
          Karsten Englander, and James Criscuolo. No third parties, institutions, or agencies have access to this information.{"\n\n"}

          This application was created as part of a capstone-style group project for the Software Engineering II
          course (CSIT 415) at Montclair State University during the Spring 2025 semester. Its purpose is to
          demonstrate the integration of user interface design, cloud database services, and mobile safety app
          functionality within a non-production setting.{"\n\n"}

          By pressing “Agree”, you acknowledge that you understand:{"\n"}
          • This is not a real safety or emergency service app.{"\n"}
          • No real emergency alerts, location tracking, or service requests will be issued.{"\n"}
          • Any data entered is used for simulation and educational evaluation only.{"\n"}
          • Use of this app is entirely voluntary, and participation implies consent to these conditions within the academic context.
        </Text>
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleDecline}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
          <Text style={styles.buttonText}>Agree</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  scrollContainer: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#b00b0b", marginBottom: 10 },
  date: { fontSize: 14, fontStyle: "italic", marginBottom: 10 },
  text: { fontSize: 14, lineHeight: 22 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cancelButton: {
    backgroundColor: "#aaa",
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginRight: 10
  },
  agreeButton: {
    backgroundColor: "#b00b0b",
    flex: 1,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  }
});
