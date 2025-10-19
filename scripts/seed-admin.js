// scripts/seed-admin.js (Node script)
import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db("app");
await db.collection("users").updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
);
await client.close();
