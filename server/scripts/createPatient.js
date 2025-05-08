// Import using Common JS
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function createPatient() {
  try {
    const response = await fetch('http://localhost:9000/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Patient',
        age: 30,
        gender: 'Male',
        phone: '1234567890',
        email: 'test@example.com',
        address: '123 Test Street, City',
        medicalHistory: [
          { condition: 'Hypertension', diagnosedYear: 2020 }
        ]
      }),
    });

    const data = await response.json();
    console.log('Created patient:', data);
  } catch (error) {
    console.error('Error creating patient:', error);
  }
}

createPatient(); 