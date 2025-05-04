/**
 * Formats a date string into a more readable format
 * @param {string} dateString - The date string in format YYYY-MM-DD
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    // Format with month name
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Checks if a date is in the past
 * @param {string} dateString - The date string in format YYYY-MM-DD
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return date < today;
  } catch (error) {
    console.error('Error checking if date is past:', error);
    return false;
  }
};

/**
 * Gets a date string for a specific number of days from now
 * @param {number} days - Number of days from today (can be negative for past)
 * @returns {string} Date string in format YYYY-MM-DD
 */
export const getDateFromToday = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

/**
 * Formats a date as a relative time (e.g., "2 days ago", "in 3 days")
 * @param {string} dateString - The date string in format YYYY-MM-DD
 * @returns {string} Relative time string
 */
export const getRelativeTimeFromNow = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  } catch (error) {
    console.error('Error getting relative time:', error);
    return dateString;
  }
}; 