const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Kirtan:Database123@hospital.c5vlrpe.mongodb.net/?retryWrites=true&w=majority&appName=Hospital";
const client = new MongoClient(uri);

async function checkPatients() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        
        const database = client.db('Hospital');
        const patientsCollection = database.collection('patients');
        
        // Find all patients
        const patients = await patientsCollection.find({}).toArray();
        
        console.log('\nTotal patients:', patients.length);
        console.log('\nPatient data:');
        console.log(JSON.stringify(patients, null, 2));
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
        console.log("\nMongoDB connection closed");
    }
}

checkPatients(); 