import React, { useState, useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { db, auth } from "./firebaseConfig"; // adjust if the path is different
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const LiveChatScreen = () => {
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSendingDisabled, setIsSendingDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const sendTimesRef = useRef([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "livechat"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(newMessages);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsSendingDisabled(false);
    }
  }, [timeRemaining]);

  const handleSend = async () => {
    const now = Date.now();
    sendTimesRef.current = [
      ...sendTimesRef.current.filter((t) => now - t < 60000),
      now,
    ];

    if (sendTimesRef.current.length > 10) {
      setIsSendingDisabled(true);
      setTimeRemaining(60);
      return;
    }

    if (message.trim() === "") return;

    await addDoc(collection(db, "livechat"), {
      text: message,
      sender: auth.currentUser?.email || "Anonymous",
      timestamp: serverTimestamp(),
      location: location
        ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
        : null,
    });

    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Live Chat</Text>

          {location ? (
            <Text style={styles.subtitle}>
              Lat: {location.coords.latitude}, Lon: {location.coords.longitude}
            </Text>
          ) : (
            <ActivityIndicator size="small" />
          )}

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={1} style={styles.messageBubble}>
                <Text style={styles.sender}>{item.sender}</Text>
                <Text>{item.text}</Text>
                {item.timestamp?.seconds && (
                  <Text style={styles.timestamp}>
                    {new Date(item.timestamp.seconds * 1000).toLocaleTimeString()}
                  </Text>
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}
          />

          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={(text) => setMessage(text)}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <Button
            title={isSendingDisabled ? `Wait ${timeRemaining}s` : "Send"}
            onPress={handleSend}
            disabled={isSendingDisabled}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { textAlign: "center", marginBottom: 10 },
  messageBubble: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sender: { fontWeight: "bold", marginBottom: 2 },
  timestamp: { fontSize: 10, color: "gray", marginTop: 2 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    marginBottom: 5,
  },
});

export default LiveChatScreen;
