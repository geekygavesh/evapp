import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase-config';

const addAvailableSlotsToAllStations = async () => {
  const stationsRef = collection(db, 'bookings');  // Change to 'bookings' if needed
  const snapshot = await getDocs(stationsRef);

  snapshot.forEach(async (docSnapshot) => {
    const stationRef = doc(db, 'bookings', docSnapshot.id);
    
    await updateDoc(stationRef, {
      availableSlots: 5,  // Set default value (change as needed)
    });

    console.log(`✅ Updated ${docSnapshot.id} with availableSlots: 5`);
  });

  alert("✅ All stations updated with availableSlots!");
};

// Call this function once in an admin panel or dev console
addAvailableSlotsToAllStations();
