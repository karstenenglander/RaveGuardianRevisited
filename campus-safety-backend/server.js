const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Handle WebSocket connections
io.of("/ws").on("connection", (socket) => {
    console.log("New WebSocket client connected");

    socket.on("sendMessage", (message) => {
        console.log("WebSocket Message received:", message);
        io.of("/ws").emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("WebSocket Client disconnected");
    });
});

// Handle HTTP POST requests to send messages
app.post("/sendMessage", (req, res) => {
    const { sender, message } = req.body;

    if (!sender || !message) {
        return res.status(400).json({ error: "Missing sender or message" });
    }

    console.log(`HTTP Message received from ${sender}: ${message}`);

    // Emit the message via WebSocket to all connected clients
    io.of("/ws").emit("receiveMessage", { sender, message });

    res.status(200).json({ status: "Message sent successfully!" });
});

// Graceful shutdown handling
process.on("SIGINT", () => {
    console.log("\n[Server] Shutting down gracefully...");
    io.close(() => {
        console.log("[Server] WebSocket connections closed.");
        process.exit(0);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`[Server] Running on port ${PORT}`);
});
