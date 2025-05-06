// Mock Firebase implementation
const app = {
  name: 'firebase-app-mock'
};

export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    callback(null);
    return () => {};
  },
  signInWithEmailAndPassword: async () => {
    throw new Error('Firebase auth is not available');
  },
  createUserWithEmailAndPassword: async () => {
    throw new Error('Firebase auth is not available');
  },
  signOut: async () => {}
};

export const db = {
  collection: () => ({
    add: async () => ({}),
    doc: () => ({
      get: async () => ({
        exists: false,
        data: () => ({}),
        id: ''
      }),
      set: async () => {},
      update: async () => {},
      delete: async () => {}
    }),
    where: () => ({
      get: async () => ({
        docs: [],
        empty: true
      }),
      onSnapshot: () => () => {}
    }),
    onSnapshot: () => () => {}
  })
};

export const analytics = {
  logEvent: () => {}
};

export default app; 