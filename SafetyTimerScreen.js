// SafetyTimerScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import MainScreenWrapper from './MainScreenWrapper';

const SafetyTimerScreen = () => {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('5');
  const [seconds, setSeconds] = useState('0');
  const [remaining, setRemaining] = useState(null);
  const timerRef = useRef(null);

  const db = getFirestore();
  const auth = getAuth();

  const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

  const startTimer = () => {
    if (totalSeconds === 0) {
      Alert.alert("Invalid time", "Please select a time greater than 0.");
      return;
    }

    setRemaining(totalSeconds);

    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;

          (async () => {
            try {
              const { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert("Location Error", "Permission to access location was denied.");
                return;
              }

              const location = await Location.getCurrentPositionAsync({});
              await addDoc(collection(db, "safetyTimerAlerts"), {
                user: auth.currentUser?.email || "Unknown",
                location: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
                timestamp: serverTimestamp()
              });

              Alert.alert("Emergency Alert", "Safety timer has reached 0! Your location has been sent to campus security.");
            } catch (error) {
              console.error("Failed to send location:", error);
              Alert.alert("Error", "Could not send your location.");
            }
          })();

          return null;
        }
        return prev - 1;
      });
    }, 1000);

    Alert.alert("Timer Started", `Countdown for ${hours}h ${minutes}m ${seconds}s`);
  };

  const cancelTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRemaining(null);
    Alert.alert("Timer Cancelled", "Your countdown has been stopped.");
  };

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <MainScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Set Safety Timer</Text>

        {remaining !== null ? (
          <Text style={styles.countdownText}>Time Remaining: {formatTime(remaining)}</Text>
        ) : (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={hours}
              style={styles.picker}
              onValueChange={(val) => setHours(val)}
            >
              {[...Array(24).keys()].map((val) => (
                <Picker.Item key={val} label={`${val}h`} value={val.toString()} />
              ))}
            </Picker>
            <Picker
              selectedValue={minutes}
              style={styles.picker}
              onValueChange={(val) => setMinutes(val)}
            >
              {[...Array(60).keys()].map((val) => (
                <Picker.Item key={val} label={`${val}m`} value={val.toString()} />
              ))}
            </Picker>
            <Picker
              selectedValue={seconds}
              style={styles.picker}
              onValueChange={(val) => setSeconds(val)}
            >
              {[...Array(60).keys()].map((val) => (
                <Picker.Item key={val} label={`${val}s`} value={val.toString()} />
              ))}
            </Picker>
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          {remaining === null ? (
            <Button title="Start Timer" onPress={startTimer} color="#b00b0b" />
          ) : (
            <Button title="Cancel Timer" onPress={cancelTimer} color="#b00b0b" />
          )}
        </View>
      </View>
    </MainScreenWrapper>
  );
};

export default SafetyTimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#b00b0b',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  picker: {
    width: 100,
    height: 180,
  },
  countdownText: {
    fontSize: 20,
    color: '#b00b0b',
    marginBottom: 20,
  },
});