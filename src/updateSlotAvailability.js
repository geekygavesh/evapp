import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const updateSlotAvailability = async (bookingId, newAvailableSlots) => {
  console.log("🔄 Updating slot availability for booking:", bookingId);

  const bookingIdString = String(bookingId);
  const bookingRef = doc(db, 'bookings', bookingIdString);
  
  try {
    const bookingSnap = await getDoc(bookingRef);

    if (!bookingSnap.exists()) {
      console.error("❌ Error: Booking document does not exist in Firestore!");
      return;
    }

    const bookingData = bookingSnap.data();
    console.log("📌 Current booking data:", bookingData);  

    if (bookingData.availableSlots === undefined) {
      console.error("❌ Error: `availableSlots` field is missing in Firestore!");
      return;
    }

    if (newAvailableSlots >= 0) {
      await updateDoc(bookingRef, {
        availableSlots: newAvailableSlots,
      });
      console.log("✅ Slot availability updated successfully!");
    } else {
      console.warn("⚠ No available slots left to update.");
    }
  } catch (error) {
    console.error("❌ Error updating slot availability:", error);
  }
};
