const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Kirtan:Database123@hospital.c5vlrpe.mongodb.net/?retryWrites=true&w=majority&appName=Hospital";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// The database name to use across the application
const DB_NAME = 'Hospital';

const connectDB = async () => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // Access the database to ensure it exists
    const db = client.db(DB_NAME);
    console.log(`Connected to database: ${DB_NAME}`);
    
    return client;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, client, DB_NAME }; 