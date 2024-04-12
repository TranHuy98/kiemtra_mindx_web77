const { MongoClient } = require("mongodb");

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb+srv://Huy225:tranhuy98@cluster0.x6ev1uq.mongodb.net/?retryWrites=true&w=majority");
  client.connect(() => {
    const database = client.db("mindx_web77_ktra_b2");
    db.inventories = database.collection("inventories");
    db.orders = database.collection("orders");
    db.users = database.collection("users");
  });
};

module.export = { connectToDb, db };
