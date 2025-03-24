import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase-config';
import { updateSlotAvailability } from './updateSlotAvailability'; // Ensure this function exists

export const bookStation = async (stationId, userId, availableSlots) => {
  console.log("📌 Booking station:", stationId);

  // Convert stationId to a string if it's not already
  const stationIdString = String(stationId);

  if (!stationIdString || typeof stationIdString !== 'string') {
    console.error("❌ Error: Invalid stationId!", stationId);
    return;
  }

  if (!userId || typeof userId !== 'string') {
    console.error("❌ Error: Invalid userId!", userId);
    return;
  }


  try {
    const bookingId = `${stationIdString}_${userId}_${Date.now()}`;
    const bookingRef = doc(db, 'bookings', bookingId);

    await setDoc(bookingRef, {
      stationId: stationIdString,
      userId,
      bookedAt: serverTimestamp(),
      slotsBooked: 1,
    });

    await updateSlotAvailability(stationIdString, availableSlots - 1);

    console.log("✅ Booking successful!");
  } catch (error) {
    console.error("❌ Error booking station:", error);
  }
};
