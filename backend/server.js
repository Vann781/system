// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { spawn } = require("child_process");  // ✅ import child_process
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB connection (same as before) ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// Signup API
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    console.log("reguist")
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login success", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- New API: Run Pushup Counter (Python script) ---
app.get("/start-pushup", (req, res) => {
  const process = spawn("python", ["./main.py"]); // ✅ run your python script in backend folder

  process.stdout.on("data", (data) => {
    console.log(`PYTHON: ${data}`);
  });

  process.stderr.on("data", (data) => {
    console.error(`ERROR: ${data}`);
  });

  process.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
  });

  res.json({ message: "Pushup counter started ✅ (check camera window)" });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Save progress
app.post("/save-progress", async (req, res) => {
  const { username, level } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { level },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Progress saved", user });
  } catch (err) {
    res.status(500).json({ message: "Error saving progress", error: err });
  }
});

// ✅ Fetch user progress
app.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});
