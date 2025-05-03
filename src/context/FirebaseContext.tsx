// Firebase Cloud Function for al-master-1cd6e project
// This code goes in your functions/index.js file
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp({
  apiKey: "AIzaSyB7SDDKQRL_sjDKfRPB4ifuHp8oBdB9-VE",
  authDomain: "al-master-1cd6e.firebaseapp.com",
  databaseURL: "https://al-master-1cd6e-default-rtdb.firebaseio.com",
  projectId: "al-master-1cd6e",
  storageBucket: "al-master-1cd6e.firebasestorage.app",
  messagingSenderId: "932509501027",
  appId: "1:932509501027:web:880015a9d5e088775dda56"
});

// Your Telegram bot token from BotFather
const TELEGRAM_TOKEN = '7086890866:AAGJNYB2jrVzI48EvjNNldkzGITMkoBxkkI';

// Your Telegram chat ID
const TELEGRAM_CHAT_ID = '8138162501';

// Listen for new bookings in Realtime Database
exports.sendBookingNotification = functions.database
  .ref('/bookings/{bookingId}')
  .onCreate(async (snapshot, context) => {
    try {
      // Get the booking data
      const bookingData = snapshot.val();
      const bookingId = context.params.bookingId;
      
      // Format the message
      const message = formatBookingMessage(bookingId, bookingData);
      
      // Send to Telegram
      await sendTelegramMessage(message);
      
      console.log(`Successfully sent notification for booking ${bookingId}`);
      return null;
    } catch (error) {
      console.error('Error sending booking notification:', error);
      return null;
    }
  });

// Listen for new contact messages in Realtime Database
exports.sendContactMessageNotification = functions.database
  .ref('/contactMessages/{messageId}')
  .onCreate(async (snapshot, context) => {
    try {
      // Get the message data
      const messageData = snapshot.val();
      const messageId = context.params.messageId;
      
      // Format the message
      const message = formatContactMessage(messageId, messageData);
      
      // Send to Telegram
      await sendTelegramMessage(message);
      
      console.log(`Successfully sent notification for contact message ${messageId}`);
      return null;
    } catch (error) {
      console.error('Error sending contact message notification:', error);
      return null;
    }
  });

/**
 * Format the booking data into a readable message
 */
function formatBookingMessage(bookingId, bookingData) {
  const { name, email, phone, date, service, message, timestamp } = bookingData;
  
  // Format date from timestamp
  const bookingDate = timestamp ? new Date(timestamp).toLocaleString() : 'N/A';
  
  // Create message
  return `🔔 *NEW BOOKING RECEIVED* 🔔\n\n` +
    `*Booking ID:* ${bookingId}\n` +
    `*Date Submitted:* ${bookingDate}\n` +
    `*Client Name:* ${name || 'N/A'}\n` +
    `*Email:* ${email || 'N/A'}\n` +
    `*Phone:* ${phone || 'N/A'}\n` +
    `*Requested Date:* ${date || 'N/A'}\n` +
    `*Service:* ${service || 'N/A'}\n` +
    `*Message:* ${message || 'None provided'}`;
}

/**
 * Format the contact message data into a readable message
 */
function formatContactMessage(messageId, messageData) {
  const { name, email, message, timestamp } = messageData;
  
  // Format date from timestamp
  const messageDate = timestamp ? new Date(timestamp).toLocaleString() : 'N/A';
  
  // Create message
  return `📨 *NEW CONTACT MESSAGE* 📨\n\n` +
    `*Message ID:* ${messageId}\n` +
    `*Date:* ${messageDate}\n` +
    `*From:* ${name || 'N/A'}\n` +
    `*Email:* ${email || 'N/A'}\n` +
    `*Message:* ${message || 'No message content'}`;
}

/**
 * Send message to Telegram
 */
async function sendTelegramMessage(message) {
  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  
  const response = await axios.post(telegramApiUrl, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: 'Markdown'
  });
  
  return response.data;
}
