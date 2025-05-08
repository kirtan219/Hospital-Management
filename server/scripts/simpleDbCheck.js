const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Kirtan:Database123@hospital.c5vlrpe.mongodb.net/?retryWrites=true&w=majority&appName=Hospital";

async function run() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    
    // List all databases
    const adminDb = client.db('admin');
    const databasesList = await adminDb.admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
    // Find the hospital database (case insensitive)
    const hospitalDbName = databasesList.databases.find(db => 
      db.name.toLowerCase() === 'hospital' || 
      db.name.toLowerCase() === 'hospi'
    )?.name;
    
    if (!hospitalDbName) {
      console.log("\nNo hospital database found. Creating a new one...");
      const db = client.db('Hospital');
      await db.collection('patients').insertOne({ name: "Test" }); // Create the DB
      console.log("Created hospital database");
    }
    
    // Use the found database name or default to Hospital
    const dbName = hospitalDbName || 'Hospital';
    console.log(`\nUsing database: ${dbName}`);
    const db = client.db(dbName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log("Collections:");
    collections.forEach(collection => console.log(` - ${collection.name}`));
    
    // Check for patients collection
    if (collections.some(c => c.name === 'patients')) {
      const patients = await db.collection('patients').find({}).toArray();
      console.log(`\nFound ${patients.length} patients:`);
      patients.forEach(patient => console.log(JSON.stringify(patient, null, 2)));
    } else {
      console.log("\nNo patients collection found. Creating one with a test patient...");
      const result = await db.collection('patients').insertOne({
        name: "Test Patient",
        age: 35,
        gender: "Female",
        phone: "9876543210",
        email: "direct@example.com",
        createdAt: new Date()
      });
      console.log("Created patient:", result);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

run(); 