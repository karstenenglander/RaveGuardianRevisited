import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const FourSquaresLayout = () => {
=======
export default function App() {
    const [greeting, setGreeting] = useState("Current Timer: Zero Seconds"); // State for the greeting
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  
    const handlePress = (newGreeting) => {
      setGreeting(newGreeting);
      setIsLoading(true); // Show the indicator.
  
      console.log("Three second timer started.");
  
      setTimeout(() => {
        // Simulate some work or API call here...
        console.log("Three second timer completed");
  
        setIsLoading(false); // Hide the indicator
      }, 3000); // 3-second delay (adjust as needed)

  };
  
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Montclair State University</Text>
      </View>

      {/* Centered Rounded Squares with Text */}
      <View style={styles.squaresContainer}>
        <View style={styles.row}>
          <View style={styles.roundedSquare}>
            <Text style={styles.squareText}>Live Chat</Text>
          </View>
          <View style={styles.roundedSquare}>
            <Text style={styles.squareText}>Safety Timer</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.roundedSquare}>
            <Text style={styles.squareText}>Submit Anonymous Tip</Text>
          </View>
          <View style={styles.roundedSquare}>
            <Text style={styles.squareText}>Call Police</Text>
          </View>
        </View>
      </View>

      {/* Bottom White Section with 3 Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red", 
  },
  header: {
    position: "absolute",
    top: "12%", // Positioned higher
    width: "90%", // Wider header
    height: 60, // Larger block height
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Rounded edges for a smooth look
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red", // Matching background
  },
  squaresContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50, // Ensures space between header and squares
  },
  row: {
    flexDirection: "row",
  },
  roundedSquare: {
    width: 130, // Increased size
    height: 130, // Increased size
    backgroundColor: "white",
    borderRadius: 25, // Fully rounded edges
    margin: 15, // Space between squares
    justifyContent: "center",
    alignItems: "center",
  },
  squareText: {
    color: "red", // Red text for contrast
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FourSquaresLayout;
