const handleGoogleSignIn = async () => {
  try {
    const firebaseUser = await signInWithGoogle();
    // Fetch user profile from backend using email
    const res = await fetch(`/api/users/profile?email=${firebaseUser.user.email}`);
    const user = await res.json();

    // Redirect based on role
    if (user.role === 'doctor') {
      navigate('/appointments');
    } else if (user.role === 'lab_person') {
      navigate('/lab-orders');
    } else if (user.role === 'pharmacist' || user.role === 'medical_shop_person') {
      navigate('/medicine-orders');
    } else {
      navigate('/dashboard');
    }
  } catch (err) {
    setError('Failed to sign in with Google.');
    console.error('Google sign-in error:', err);
  }
};const handleGoogleSignIn = async () => {
  try {
    const firebaseUser = await signInWithGoogle();
    // Fetch user profile from backend using email
    const res = await fetch(`/api/users/profile?email=${firebaseUser.user.email}`);
    const user = await res.json();

    // Redirect based on role
    if (user.role === 'doctor') {
      navigate('/appointments');
    } else if (user.role === 'lab_person') {
      navigate('/lab-orders');
    } else if (user.role === 'pharmacist' || user.role === 'medical_shop_person') {
      navigate('/medicine-orders');
    } else {
      navigate('/dashboard');
    }
  } catch (err) {
    setError('Failed to sign in with Google.');
    console.error('Google sign-in error:', err);
  }
};const express = require('express');
const router = express.Router();
const { getLabOrders, updateLabOrderStatus } = require('../controllers/lab.controller');
const { authorize } = require('../middleware/auth');

// Route for lab personnel to fetch lab orders
router.route('/').get(authorize('lab_person'), getLabOrders);

// Route for updating lab order status
router.route('/:id/status').patch(authorize('lab_person'), updateLabOrderStatus);

module.exports = router;