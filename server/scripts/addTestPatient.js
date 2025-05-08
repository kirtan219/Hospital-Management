const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Kirtan:Database123@hospital.c5vlrpe.mongodb.net/?retryWrites=true&w=majority&appName=Hospital";
const client = new MongoClient(uri);

async function addTestPatient() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        
        const database = client.db('Hospital');
        const patientsCollection = database.collection('patients');
        
        // Test patient data
        const testPatient = {
            name: "John Test",
            age: 45,
            gender: "Male",
            phone: "555-123-4567",
            email: "john.test@example.com",
            address: "123 Test Street",
            medicalHistory: [
                { condition: "Diabetes", diagnosedYear: 2020 }
            ],
            createdAt: new Date()
        };
        
        // Insert the patient
        const result = await patientsCollection.insertOne(testPatient);
        console.log("Patient added successfully!");
        console.log("Inserted ID:", result.insertedId);
        
        // Verify the patient was added
        const addedPatient = await patientsCollection.findOne({ _id: result.insertedId });
        console.log("\nAdded patient data:");
        console.log(JSON.stringify(addedPatient, null, 2));
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
        console.log("\nMongoDB connection closed");
    }
}

addTestPatient(); 