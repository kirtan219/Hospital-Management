import { db } from '../firebase';
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import axios from 'axios';

// MessageBird API configuration
const MESSAGEBIRD_CONFIG = {
  apiKey: process.env.REACT_APP_MESSAGEBIRD_API_KEY || 'YOUR_API_KEY',
  baseUrl: 'https://rest.messagebird.com',
  originator: 'MediCare'  // Default sender ID for SMS
};

/**
 * Simple notification service focused only on SMS functionality
 */
class NotificationService {
  /**
   * Send an SMS via MessageBird API with patient name in the message
   * @param {string} to - Recipient phone number
   * @param {Object} appointmentDetails - Object containing appointment details
   * @param {string} appointmentDetails.patientName - Patient's name
   * @param {string} appointmentDetails.reason - Reason for appointment
   * @param {string|Date} appointmentDetails.date - Appointment date
   * @param {string|Date} appointmentDetails.time - Appointment time
   * @param {string} appointmentDetails.doctor - Doctor's name
   * @param {string} customMessage - Optional custom message template
   * @returns {Promise<Object>} MessageBird response or error
   */
  static async sendSMS(to, appointmentDetails, customMessage = null) {
    let notificationRef;
    try {
      // Format date and time for display
      const dateStr = appointmentDetails.date instanceof Date 
        ? appointmentDetails.date.toLocaleDateString() 
        : typeof appointmentDetails.date === 'string' ? appointmentDetails.date : 'your appointment date';
      
      const timeStr = appointmentDetails.time instanceof Date
        ? appointmentDetails.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : typeof appointmentDetails.time === 'string' ? appointmentDetails.time : 'the scheduled time';
      
      // Create personalized message with patient name
      const message = customMessage || 
        `Hello ${appointmentDetails.patientName || 'Patient'}, your ${appointmentDetails.reason || 'medical'} appointment is booked with ${appointmentDetails.doctor || 'your doctor'} on ${dateStr} at ${timeStr}. - MediCare Pro`;
      
      // Record the SMS attempt in Firestore
      notificationRef = await addDoc(collection(db, "notifications"), {
        type: 'sms',
        recipient: to,
        content: message,
        provider: 'messagebird',
        status: 'pending',
        timestamp: Timestamp.now(),
        appointmentDetails
      });

      // In development, simulate API call
      if (process.env.NODE_ENV !== 'production') {
        console.log('DEV MODE: Simulating MessageBird SMS API call', { to, message });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Update the notification status
        await this.updateNotificationStatus(notificationRef.id, 'sent', {
          messageId: 'test-msg-' + Date.now()
        });
        
        // Show browser notification for preview
        this.showBrowserNotification('SMS Sent', `Test SMS to ${to} was simulated`);
        
        return {
          id: 'test-msg-' + Date.now(),
          status: 'sent',
          message
        };
      }
      
      // In production, call the actual MessageBird API
      const response = await axios({
        method: 'POST',
        url: `${MESSAGEBIRD_CONFIG.baseUrl}/messages`,
        headers: {
          'Authorization': `AccessKey ${MESSAGEBIRD_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        },
        data: {
          originator: MESSAGEBIRD_CONFIG.originator,
          recipients: [to],
          body: message
        }
      });
      
      // Update notification status with the real message ID
      if (response.data && response.data.id) {
        await this.updateNotificationStatus(notificationRef.id, 'sent', {
          messageId: response.data.id
        });
      }
      
      // Show a browser notification
      this.showBrowserNotification('SMS Sent', `SMS sent to ${to}`);
      
      return {
        ...response.data,
        message
      };
    } catch (error) {
      console.error('MessageBird SMS Error:', error.response?.data || error.message);
      
      // Update notification status with the error
      if (notificationRef && notificationRef.id) {
        if (error.response?.data) {
          await this.updateNotificationStatus(notificationRef.id, 'failed', {
            error: error.response.data
          });
        } else {
          await this.updateNotificationStatus(notificationRef.id, 'failed', {
            error: error.message
          });
        }
      }
      
      // Show error notification
      this.showBrowserNotification('SMS Failed', `Failed to send SMS to ${to}`, 'error');
      
      throw error;
    }
  }
  
  /**
   * Update a notification document in Firestore
   * @private
   * @param {string} notificationId - The Firestore document ID
   * @param {string} status - New status
   * @param {Object} additionalData - Any additional data to store
   */
  static async updateNotificationStatus(notificationId, status, additionalData = {}) {
    try {
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, {
        status,
        updatedAt: Timestamp.now(),
        ...additionalData
      });
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  }

  /**
   * Show a browser notification for preview purposes
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   */
  static showBrowserNotification(title, message, type = 'success') {
    // Check if browser notifications are supported
    if ('Notification' in window) {
      // Request permission if not already granted
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
      
      if (Notification.permission === 'granted') {
        // Create and show the notification
        const notificationOptions = {
          body: message,
          icon: '/logo192.png', // Path to your app icon
        };
        
        new Notification(title, notificationOptions);
        return true;
      }
    }
    
    // Fallback to console
    console.log(`${title}: ${message}`);
    return false;
  }
}

export default NotificationService; 