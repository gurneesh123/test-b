import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/routes.js";  // Ensure the file extension is included

// Server Linking
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: "https://test-f-8pky.onrender.com", // Replace with your frontend domain
    credentials: true
}));
app.use(express.json());

// MongoDB connection
const URI = "mongodb+srv://gurnessh:gurnessh@cluster0.ymvpxqk.mongodb.net/Artlist";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Router linking
app.use("/art", router);

// Server run
app.listen(port, () => {
    console.log(`Server running on port ${port}`);  
});
