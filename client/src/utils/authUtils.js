// Mock auth utility functions
const setPersistence = async () => {
  return Promise.resolve();
};

const browserLocalPersistence = 'LOCAL';

const getAuth = () => {
  return {
    currentUser: localStorage.getItem('mockUser') 
      ? JSON.parse(localStorage.getItem('mockUser')) 
      : null
  };
};

export { getAuth, setPersistence, browserLocalPersistence };

// Set up persistence
export const setupAuthPersistence = async () => {
  const auth = getAuth();
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.error('Error setting persistence:', error);
    throw error;
  }
};

// Store email for email link authentication
export const storeEmailForSignIn = (email) => {
  window.localStorage.setItem('emailForSignIn', email);
};

// Get stored email
export const getStoredEmail = () => {
  return window.localStorage.getItem('emailForSignIn');
};

// Clear stored email
export const clearStoredEmail = () => {
  window.localStorage.removeItem('emailForSignIn');
};

// Store user credentials securely (only during sign up process)
export const storeUserCredentials = (email, password) => {
  // Store temporarily in session storage (will be cleared when browser closes)
  sessionStorage.setItem('tempUserEmail', email);
  // Never store raw passwords - this is just for the signup process
  sessionStorage.setItem('tempUserPassword', password);
};

// Clear temporary credentials
export const clearTempCredentials = () => {
  sessionStorage.removeItem('tempUserEmail');
  sessionStorage.removeItem('tempUserPassword');
};

// Get temporary credentials
export const getTempCredentials = () => {
  const email = sessionStorage.getItem('tempUserEmail');
  const password = sessionStorage.getItem('tempUserPassword');
  return { email, password };
}; 