import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import MapComponent from '../components/MapComponent';

function Stations() {
  const [stations, setStations] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  const bookingFee = 50; // Booking fee to be deducted

  useEffect(() => {
    // Listen to real-time updates on the stations collection
    const stationsRef = collection(db, 'stations');
    const unsubscribe = onSnapshot(stationsRef, (snapshot) => {
      const stationsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStations(stationsList);
    });

    // Fetch current user's wallet balance
    const fetchWalletBalance = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setWalletBalance(userSnap.data().walletBalance || 0);
        }
      }
    };

    fetchWalletBalance();

    return () => unsubscribe();
  }, []);

  // Function to handle booking confirmation and Firestore update
  const handleBookSlot = async (station) => {
    if (station.availableSlots <= 0) {
      alert("⚠ No slots available at this station!");
      return;
    }

    // Check if user has enough wallet balance
    if (walletBalance < bookingFee) {
      alert("❌ Insufficient wallet balance!");
      return;
    }

    try {
      // Update available slots in Firestore
      const stationRef = doc(db, 'stations', station.id);
      await updateDoc(stationRef, {
        availableSlots: station.availableSlots - 1,
      });

      // Deduct booking fee from wallet and update Firestore
      const user = auth.currentUser;
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        walletBalance: walletBalance - bookingFee,
      });

      // Update local state balance
      setWalletBalance(walletBalance - bookingFee);

      setSelectedStation(station);
      setBookingSuccess(true);

      // Automatically hide the success message after 3 seconds
      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedStation(null);
      }, 3000);
    } catch (error) {
      console.error("❌ Error booking slot:", error);
      alert("Failed to book slot — try again!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Find Charging Stations</h1>

      <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
        💰 Wallet Balance: ₹{walletBalance}
      </div>

      {bookingSuccess && selectedStation && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          ✅ Slot booked successfully at {selectedStation.name}! ₹{bookingFee} deducted.
        </div>
      )}

      <MapComponent stations={stations} onBookSlot={handleBookSlot} />

      <ul className="mt-4">
        {stations.map((station) => (
          <li key={station.id} className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{station.name}</h3>
              <p>Available Slots: {station.availableSlots ?? "N/A"}</p>
            </div>
            <button
              className={`px-4 py-2 rounded ${
                station.availableSlots > 0
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={() => handleBookSlot(station)}
              disabled={station.availableSlots <= 0}
            >
              {station.availableSlots > 0 ? `Book (₹${bookingFee})` : "Full"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stations;
