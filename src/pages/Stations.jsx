// src/pages/Stations.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import MapComponent from '../components/MapComponent';

function Stations() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Listen to real-time updates on the bookings collection
    const bookingsRef = collection(db, 'bookings');
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      const bookingsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Find Charging Stations</h1>
      {/* Pass the updated bookings list to your MapComponent */}
      <MapComponent stations={bookings} />
      {/* Optionally, add a list view of bookings with booking buttons */}
    </div>
  );
}

export default Stations;
