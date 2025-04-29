// InboxScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { auth, db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import MainScreenWrapper from "./MainScreenWrapper";

const ADMIN_EMAILS = [
  "jamesccriscuolo@gmail.com",
  "karstenenglander@gmail.com",
  "erouf01@gmail.com",
  "krawlinson1818@gmail.com"
];

const InboxScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userEmail = auth.currentUser?.email || "Anonymous";
  const isAdmin = ADMIN_EMAILS.includes(userEmail);

  const inputBottom = useRef(new Animated.Value(80)).current;

  useEffect(() => {
    const q = query(collection(db, "inbox"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardWillShow", () => {
      Animated.timing(inputBottom, {
        toValue: 10,
        duration: 50,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardWillHide", () => {
      Animated.timing(inputBottom, {
        toValue: 80,
        duration: 50,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    try {
      await addDoc(collection(db, "inbox"), {
        text: input,
        sender: userEmail,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      Alert.alert("Error", "Failed to send message.");
    }
  };

  return (
    <MainScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.title}>Inbox</Text>

              {messages.length === 0 ? (
                <Text style={{ marginTop: 10 }}>(No messages yet.)</Text>
              ) : (
                <FlatList
                  data={messages}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.messageBubble}>
                      <Text style={styles.sender}>{item.sender}</Text>
                      <Text>{item.text}</Text>
                      {item.timestamp?.seconds && (
                        <Text style={styles.timestamp}>
                          {new Date(item.timestamp.seconds * 1000).toLocaleTimeString()}
                        </Text>
                      )}
                    </View>
                  )}
                  contentContainerStyle={{ paddingBottom: isAdmin ? 160 : 20 }}
                />
              )}
            </View>

            {isAdmin && (
              <Animated.View style={[
                styles.inputContainer,
                { bottom: inputBottom }
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Type a message to all users..."
                  value={input}
                  onChangeText={setInput}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
                <Button title="Send" onPress={handleSend} />
              </Animated.View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </MainScreenWrapper>
  );
};

export default InboxScreen;

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
    marginBottom: 10,
  },
  messageBubble: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 10,
    color: "gray",
    marginTop: 2,
  },
  inputContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
});
