import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js'; 
import videoRoutes from './routes/Videoupload.js';
import newsRoutes from './routes/Newsupload.js';
import reportRoutes from './routes/Reportupload.js';
import adminRoutes from './routes/admin.js';
dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});


// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes); 
app.use('/api/news',newsRoutes);
app.use('/api/reports',reportRoutes);
app.use('/api/admin', adminRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
