import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  RetailPrize: {
    type: Number,
    required: false,
  },
  WholesalePrize: {
    type: Number,
    required: false,
  },
  stock: {
    type: Number,
    default: 0, // Set default stock to 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Inventory = mongoose.model("Inventory", inventorySchema);
