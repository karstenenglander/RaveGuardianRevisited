import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import { auth, db } from './firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import * as Location from 'expo-location';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native';


const CATEGORIES = [
  'Abuse / Assault', 'Accident', 'Bullying', 'Disturbance', 'Drugs / Alcohol',
  'Harassment / Stalking', 'Mental Health', 'Repair Needed', 'School Policy Violation',
  'Social Media Abuse', 'Suspicious Activity', 'Theft', 'Vandalism', 'Other'
];

const SubmitTipScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState('');
  const [shareLocation, setShareLocation] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!shareLocation) {
      setLocation(null);
      return;
    }

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission denied');
        setShareLocation(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      });
    })();
  }, [shareLocation]);

  const handleSubmit = async () => {
    if (!selectedCategory || !message.trim()) {
      Alert.alert('Missing Info', 'Please select a category and type a message.');
      return;
    }

    try {
      await addDoc(collection(db, 'tips'), {
        category: selectedCategory,
        text: message.trim(),
        sender: auth.currentUser?.email || 'Anonymous',
        timestamp: serverTimestamp(),
        location: shareLocation ? location : null,
      });

      Alert.alert('Tip Submitted', `Your tip was sent successfully.`);
      setMessage('');
      setSelectedCategory(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit tip. Try again.');
      console.error('Error submitting tip:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={90}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Submit a Tip</Text>
  
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
  
            <TextInput
              style={styles.input}
              placeholder="Enter your tip here..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
  
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              <TouchableOpacity onPress={() => setShareLocation(!shareLocation)} style={styles.checkbox}>
                <Text style={{ fontSize: 18 }}>
                  {shareLocation ? '☑️' : '⬜️'}
                </Text>
              </TouchableOpacity>
              <Text style={{ marginLeft: 8 }}>Share my location for faster response</Text>
            </View>
  
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};  
  

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
  },
  selectedCategory: { backgroundColor: '#ffe6e6', borderColor: '#b00b0b' },
  categoryText: { fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa'
  },
  checkbox: {
    padding: 4,
  },
  submitButton: {
    backgroundColor: '#b00b0b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default SubmitTipScreen;