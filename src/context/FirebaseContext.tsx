import React, { createContext, useContext, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getDatabase, 
  ref, 
  push, 
  set, 
  onValue, 
  query, 
  orderByChild 
} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate required configuration
if (!firebaseConfig.databaseURL) {
  throw new Error('Firebase Database URL is not configured. Please set VITE_FIREBASE_DATABASE_URL in your environment variables.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Types for orders
export interface BookingOrder {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  message: string;
  timestamp: number;
}

// Context type
interface FirebaseContextType {
  saveBooking: (booking: Omit<BookingOrder, 'id' | 'timestamp'>) => Promise<string>;
  saveContactMessage: (name: string, email: string, message: string) => Promise<string>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

// Function to notify Telegram
async function notifyTelegram(type: 'booking' | 'contact', data: any) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-notify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Telegram notification');
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
}

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Save a new booking order
  const saveBooking = async (booking: Omit<BookingOrder, 'id' | 'timestamp'>): Promise<string> => {
    try {
      const bookingsRef = ref(database, 'bookings');
      const newBookingRef = push(bookingsRef);
      
      const bookingWithTimestamp = {
        ...booking,
        timestamp: Date.now()
      };
      
      await set(newBookingRef, bookingWithTimestamp);
      
      // Send Telegram notification
      await notifyTelegram('booking', booking);
      
      return newBookingRef.key || '';
    } catch (error) {
      console.error('Error saving booking:', error);
      throw error;
    }
  };

  // Save a contact message
  const saveContactMessage = async (name: string, email: string, message: string): Promise<string> => {
    try {
      const messagesRef = ref(database, 'contactMessages');
      const newMessageRef = push(messagesRef);
      
      const messageData = {
        name,
        email,
        message,
        timestamp: Date.now()
      };
      
      await set(newMessageRef, messageData);
      
      // Send Telegram notification
      await notifyTelegram('contact', messageData);
      
      return newMessageRef.key || '';
    } catch (error) {
      console.error('Error saving contact message:', error);
      throw error;
    }
  };

  const value = {
    saveBooking,
    saveContactMessage
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook to use the Firebase context
export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
