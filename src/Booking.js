import { doc, setDoc, serverTimestamp, query, where, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase-config';
import { updateSlotAvailability } from './updateSlotAvailability'; 

export const bookStation = async (stationId, userId, availableSlots) => {
  console.log("📌 Checking existing bookings for:", stationId, userId);

  const stationIdString = String(stationId);

  // Fetch existing bookings to prevent duplicate bookings
  const bookingsRef = collection(db, 'bookings');
  const q = query(bookingsRef, where("stationId", "==", stationIdString), where("userId", "==", userId));
  const existingBookings = await getDocs(q);

  if (!existingBookings.empty) {
    alert("⚠ You have already booked a slot at this station!");
    return;
  } 

  if (availableSlots <= 0) {
    alert("⚠ No slots available for booking!");
    return;
  }

  // Create a unique booking ID
  const bookingId = `${stationIdString}_${userId}_${Date.now()}`;
  const bookingRef = doc(db, 'bookings', bookingId);

  await setDoc(bookingRef, {
    stationId: stationIdString,
    userId,
    bookedAt: serverTimestamp(),
    slotsBooked: 1,
    availableSlots: availableSlots - 1, // Store new slot count in the booking
  });

  //  Fix: Ensure the correct document is updated
  await updateSlotAvailability(bookingId, availableSlots - 1);

  console.log("✅ Booking successful!");
  alert("✅ Slot booked successfully!");
};
