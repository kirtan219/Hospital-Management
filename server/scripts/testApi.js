// Import using Common JS
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testApi() {
  try {
    console.log("Testing API endpoints...");
    
    // Test getting all patients
    console.log("\n1. Getting all patients:");
    const patientsResponse = await fetch('http://localhost:9000/api/patients');
    const patientsData = await patientsResponse.json();
    console.log(`Status: ${patientsResponse.status}`);
    console.log(`Found ${patientsData.count || 0} patients`);
    
    if (patientsData.data && patientsData.data.length > 0) {
      console.log("First patient:", patientsData.data[0]);
    }
    
    // Create a new patient
    console.log("\n2. Creating a new patient:");
    const newPatient = {
      name: "John Doe",
      age: 42,
      gender: "Male",
      phone: "555-123-4567",
      email: "john.doe@example.com",
      address: "456 Main St, Anytown, USA",
      medicalHistory: [
        { condition: "Asthma", diagnosedYear: 2015 }
      ]
    };
    
    const createResponse = await fetch('http://localhost:9000/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatient),
    });
    
    const createData = await createResponse.json();
    console.log(`Status: ${createResponse.status}`);
    console.log("Create response:", createData);
    
    if (createData.data && createData.data.insertedId) {
      const patientId = createData.data.insertedId;
      
      // Get the created patient
      console.log(`\n3. Getting the created patient (ID: ${patientId}):`);
      const getResponse = await fetch(`http://localhost:9000/api/patients/${patientId}`);
      const getData = await getResponse.json();
      console.log(`Status: ${getResponse.status}`);
      console.log("Patient data:", getData.data);
    }
    
  } catch (error) {
    console.error("Error testing API:", error);
  }
}

testApi(); 