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
      
      await set(newMessageRef, {
        name,
        email,
        message,
        timestamp: Date.now()
      });
      
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
