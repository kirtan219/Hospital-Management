const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Kirtan:Database123@hospital.c5vlrpe.mongodb.net/?retryWrites=true&w=majority&appName=Hospital";
const client = new MongoClient(uri);

async function addPatient() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    
    const database = client.db('Hospital');
    const patientsCollection = database.collection('patients');
    
    // New patient data
    const newPatient = {
      name: "Alice Smith",
      age: 28,
      gender: "Female",
      phone: "555-987-6543",
      email: "alice.smith@example.com",
      address: "789 Elm Street, Metropolis",
      medicalHistory: [
        { condition: "Allergies", diagnosedYear: 2018 },
        { condition: "Migraine", diagnosedYear: 2019 }
      ],
      createdAt: new Date()
    };
    
    // Insert the patient
    const result = await patientsCollection.insertOne(newPatient);
    
    console.log(`Successfully added patient with ID: ${result.insertedId}`);
    
    // Check all patients after adding
    const patients = await patientsCollection.find({}).toArray();
    console.log(`Total patients now: ${patients.length}`);
    console.log("All patients:");
    patients.forEach((patient, index) => {
      console.log(`\nPatient ${index + 1}:`);
      console.log(JSON.stringify(patient, null, 2));
    });
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

addPatient().catch(console.error); 