// Import using Common JS
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testVitalSigns() {
    try {
        // First, create a new patient
        console.log("1. Creating a new patient...");
        const newPatient = {
            name: "Sarah Johnson",
            age: 35,
            gender: "Female",
            phone: "555-789-0123",
            email: "sarah.j@example.com",
            address: "789 Oak Street, City",
            medicalHistory: [
                { condition: "Hypertension", diagnosedYear: 2018 }
            ]
        };

        const createPatientResponse = await fetch('http://localhost:9000/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPatient),
        });

        const patientData = await createPatientResponse.json();
        console.log("Patient created:", patientData);

        if (!patientData.data || !patientData.data.insertedId) {
            throw new Error("Failed to create patient");
        }

        const patientId = patientData.data.insertedId;

        // Record vital signs
        console.log("\n2. Recording vital signs...");
        const vitalSigns = {
            temperature: 98.6,
            bloodPressure: {
                systolic: 120,
                diastolic: 80
            },
            heartRate: 72,
            respiratoryRate: 16,
            oxygenSaturation: 98,
            recordedBy: "Dr. Smith",
            notes: "Patient appears healthy"
        };

        const recordVitalSignsResponse = await fetch(`http://localhost:9000/api/vital-signs/patient/${patientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vitalSigns),
        });

        const vitalSignsData = await recordVitalSignsResponse.json();
        console.log("Vital signs recorded:", vitalSignsData);

        // Get latest vital signs
        console.log("\n3. Getting latest vital signs...");
        const getLatestResponse = await fetch(`http://localhost:9000/api/vital-signs/patient/${patientId}/latest`);
        const latestVitalSigns = await getLatestResponse.json();
        console.log("Latest vital signs:", latestVitalSigns);

        // Get all vital signs history
        console.log("\n4. Getting all vital signs history...");
        const getAllResponse = await fetch(`http://localhost:9000/api/vital-signs/patient/${patientId}`);
        const allVitalSigns = await getAllResponse.json();
        console.log("All vital signs:", allVitalSigns);

    } catch (error) {
        console.error("Error testing vital signs:", error);
    }
}

testVitalSigns(); 