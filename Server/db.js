// Server/db.js
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

let db;

export const connectToDatabase = async () => {
  if (!db) {
    await client.connect();
    db = client.db("vgv-billing"); // Replace with your database name
  }
  return db;
};
