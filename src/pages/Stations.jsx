// src/pages/Stations.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import MapComponent from '../components/MapComponent';

function Stations() {
  const [stations, setStations] = useState([]); 
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    // Listen to real-time updates on the stations collection
    const stationsRef = collection(db, 'stations'); // Changed from 'bookings' to 'stations'
    const unsubscribe = onSnapshot(stationsRef, (snapshot) => {
      const stationsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStations(stationsList);
    });

    return () => unsubscribe();
  }, []);

  // Function to handle booking confirmation
  const handleBookSlot = (station) => {
    if (station.availableSlots <= 0) {
      alert("⚠ No slots available at this station!");
      return;
    }

    setSelectedStation(station);
    setBookingSuccess(true);

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedStation(null);
    }, 3000);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Find Charging Stations</h1>

      {/* Booking Confirmation Message */}
      {bookingSuccess && selectedStation && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          ✅ Slot booked successfully at {selectedStation.name}!
        </div>
      )}

      {/* ✅ Re-added the Map Component */}
      <MapComponent stations={stations} onBookSlot={handleBookSlot} />

      {/* Station List with Available Slots */}
      <ul className="mt-4">
        {stations.map((station) => (
          <li key={station.id} className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{station.name}</h3>
              <p>Available Slots: {station.availableSlots ?? "N/A"}</p>
            </div>
            <button
              className={`px-4 py-2 rounded ${station.availableSlots > 0 ? 'bg-blue-500 text-white' : 'bg-gray-400 cursor-not-allowed'}`}
              onClick={() => handleBookSlot(station)}
              disabled={station.availableSlots <= 0}
            >
              {station.availableSlots > 0 ? "Book Slot" : "Full"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stations;
