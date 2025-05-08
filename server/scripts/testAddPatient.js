// Import using Common JS
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testAddPatient() {
    try {
        console.log("Testing patient creation through API...");
        
        const newPatient = {
            name: "API Test Patient",
            age: 30,
            gender: "Female",
            phone: "555-999-8888",
            email: "api.test@example.com",
            address: "456 API Street",
            medicalHistory: [
                { condition: "Asthma", diagnosedYear: 2019 }
            ]
        };

        const response = await fetch('http://localhost:9000/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPatient),
        });

        const data = await response.json();
        console.log("\nAPI Response:");
        console.log(JSON.stringify(data, null, 2));

        if (data.success && data.data && data.data.insertedId) {
            console.log("\nPatient created successfully!");
            console.log("Patient ID:", data.data.insertedId);
        } else {
            console.log("\nFailed to create patient!");
            console.log("Error:", data.error || "Unknown error");
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

testAddPatient(); 