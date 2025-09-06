import { collection, getDocs } from 'firebase/firestore';

import { db } from './firebaseConfig';

// Function to get user count from Firestore
export const checkAuthLimit = async (): Promise<number> => {
  try {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    return usersSnapshot.size; // Returns the number of users
  } catch (error) {
    console.error('Error fetching user count:', error);
    throw error; // Re-throw the error to handle it later if needed
  }
};
