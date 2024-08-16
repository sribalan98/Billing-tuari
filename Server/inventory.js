import { Inventory } from "./Model/AddInventoryModel.js";
import mongoose from "mongoose";

export const getInventory = async () => {
  return await Inventory.find({});
};

export const addInventoryItem = async (item) => {
  const db = mongoose.connection;
  const collections = await db.db
    .listCollections({ name: "inventories" })
    .toArray();

  if (collections.length > 0) {
    const newItem = new Inventory({
      ...item,
      stock: 0, // Initialize stock to 0
    });
    return await newItem.save();
  } else {
    throw new Error(
      "The 'inventories' collection does not exist in the database."
    );
  }
};

export const deleteInventoryItem = async (id) => {
  return await Inventory.findByIdAndDelete(id);
};

export const updateStockItem = async (id, stock) => {
  return await Inventory.findByIdAndUpdate(id, { stock }, { new: true });
};
