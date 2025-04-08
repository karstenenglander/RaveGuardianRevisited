import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InboxScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      <Text>(No messages. Placeholder screen.)</Text>
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
