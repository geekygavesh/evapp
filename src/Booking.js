// src/utils/booking.js
import { doc, updateDoc, increment, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase-config';

export const bookStation = async (stationId, userId) => {
  try {
    
    const stationRef = doc(db, 'stations', stationId.toString());


    await updateDoc(stationRef, {
      availableSlots: increment(-1),
    });

    const bookingRef = doc(db, 'bookings', `${stationId}_${userId}_${Date.now()}`);
    await setDoc(bookingRef, {
      stationId,
      userId,
      bookedAt: serverTimestamp(),
      slotsBooked: 1,
    });

    console.log('Booking successful!');
  } catch (error) {
    console.error('Error booking station:', error);
  }
};
