// Server/inventory.js
import { Inventory } from "./Model/AddInventoryModel.js";
import mongoose from "mongoose";
export const getInventory = async () => {
  return await Inventory.find({});
};

export const addInventoryItem = async (item) => {
  // Check if the 'inventories' collection exists
  const db = mongoose.connection;
  const collections = await db.db
    .listCollections({ name: "inventories" })
    .toArray();

  if (collections.length > 0) {
    // If the collection exists, add the new item
    const newItem = new Inventory(item);
    return await newItem.save();
  } else {
    // Handle the case where the collection does not exist
    throw new Error(
      "The 'inventories' collection does not exist in the database."
    );
  }
};
