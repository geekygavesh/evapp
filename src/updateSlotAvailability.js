import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const updateSlotAvailability = async (stationId) => {
  const stationRef = doc(db, 'bookings', stationId);
  const stationSnap = await getDoc(stationRef);
  if (typeof stationId !== 'string') {
    console.error("❌ Error: stationId is not a string!");
    return;
  }
  if (stationSnap.exists()) {
    const stationData = stationSnap.data();
    if (stationData.availableSlots > 0) {
      await updateDoc(stationRef, {
        availableSlots: stationData.availableSlots - 1,
      });
    }
  }
};
