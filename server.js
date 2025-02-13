import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import {dbConnect} from "./config/dbConfig.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS
app.use(morgan("dev")); // Logs requests

// Connect to MongoDB
dbConnect();

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
