import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { getInventory, addInventoryItem } from "./inventory.js";

const app = express();
const port = 3001;

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/vgv-billing");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to get inventory data
app.get("/api/inventory", async (req, res) => {
  try {
    const inventory = await getInventory();
    res.json(inventory);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to add inventory item
app.post("/api/inventory", async (req, res) => {
  try {
    const { name, imgUrl } = req.body;
    const newItem = { name, imgUrl };
    const item = await addInventoryItem(newItem);
    res.status(201).json(item);
  } catch (error) {
    console.error("Error adding inventory item:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
