import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simple mock signup function
  async function signup(email, password) {
    try {
      // Create a mock user
      const mockUser = {
        uid: 'user-' + Math.random().toString(36).substr(2, 9),
        email: email,
        displayName: email.split('@')[0],
        emailVerified: false
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      return { user: mockUser };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // Simple mock login function
  async function login(email, password) {
    // Simple demo login - in a real app you would validate credentials
    if (password.length < 6) {
      throw new Error('Invalid login credentials');
    }
    
    // Create a mock user on successful login
    const mockUser = {
      uid: 'user-' + Math.random().toString(36).substr(2, 9),
      email: email,
      displayName: email.split('@')[0],
      emailVerified: false
    };
    
    // Store in localStorage for persistence
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return { user: mockUser };
  }

  // Simple mock logout function
  async function logout() {
    localStorage.removeItem('mockUser');
    setCurrentUser(null);
    return Promise.resolve();
  }

  // Simple mock Google sign in
  async function signInWithGoogle() {
    // Create a mock Google user
    const mockUser = {
      uid: 'google-user-' + Math.random().toString(36).substr(2, 9),
      email: 'user@gmail.com',
      displayName: 'Google User',
      emailVerified: true,
      photoURL: 'https://lh3.googleusercontent.com/a/default-user'
    };
    
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return { user: mockUser };
  }

  useEffect(() => {
    // Check for user in localStorage on initial load
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
    
    // Return empty cleanup function to mimic Firebase's unsubscribe
    return () => {};
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext; 