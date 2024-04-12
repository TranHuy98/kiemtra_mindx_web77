const express = require("express");
const { connectToDb, db } = require("./db");
import { MongoClient } from "mongodb";



const app = express();

// 1. Import data to mongoDB

const orders = [
  { "_id": 1, "item": "almonds", "price": 12, "quantity": 2 },
  { "_id": 2, "item": "pecans", "price": 20, "quantity": 1 },
  { "_id": 3, "item": "pecans", "price": 20, "quantity": 3 },
]

const inventories = [
  { "_id": 1, "sku": "almonds", "description": "product 1", "instock": 120 },
  { "_id": 2, "sku": "bread", "description": "product 2", "instock": 80 },
  { "_id": 3, "sku": "cashews", "description": "product 3", "instock": 60 },
  { "_id": 4, "sku": "pecans", "description": "product 4", "instock": 70 },
]

const users = [
  { "username": "admin", password: "MindX@2022" },
  { "username": "alice", password: "MindX@2022" }
]

async function importData() {
  const client = new MongoClient("mongodb+srv://Huy225:tranhuy98@cluster0.x6ev1uq.mongodb.net/?retryWrites=true&w=majority");

  try {
    await client.connect();

    const database = client.db("mindx_web77_ktra_b2");
    const ordersCollection = database.collection(orders);
    const inventoriesCollection = database.collection(inventories);
    const usersCollection = database.collection(users);

    await ordersCollection.insertMany(orders);
    await inventoriesCollection.insertMany(inventories);
    await usersCollection.insertMany(users);

  } catch (e) {
    console.error('Error:', e);
  } finally {
    await client.close();
  }
}


// 2&3. Write an api endpoint for that getting all products in inventory & Update the API to accept a query for getting only products that have low quantity (less than 100).
app.get('/products', async (req, res) => {
  try {

    const client = new MongoClient("mongodb+srv://Huy225:tranhuy98@cluster0.x6ev1uq.mongodb.net/?retryWrites=true&w=majority");

    await client.connect();

    const database = client.db('mindx_web77_ktra_b2');
    const collection = database.collection('inventories');

    const query = { instock: { $lt: 100 } };
    const products = await collection.find(query).toArray();
    res.json(products);
  } catch (error) {
    
    res.status(500).json({ error: 'Error' });
  } finally {
    client.close();
  }
});




app.listen(3000, () => {
  console.log("App is running at 3000");
  connectToDb();
});
