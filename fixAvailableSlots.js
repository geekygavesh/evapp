import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase-config"; // Adjust the path if needed

const fixAvailableSlots = async () => {
  const bookingsRef = collection(db, "bookings");
  const snapshot = await getDocs(bookingsRef);

  snapshot.forEach(async (booking) => {
    const bookingRef = doc(db, "bookings", booking.id);
    await updateDoc(bookingRef, { availableSlots: 5 }); // Set initial slots
    console.log(`Updated booking ${booking.id} with availableSlots = 5`);
  });

  console.log("✅ All bookings updated successfully!");
};

fixAvailableSlots();

