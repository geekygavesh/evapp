import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { bookStation } from '../Booking';

import customMarkerIcon from '../assets/custom-marker.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconRetinaUrl: customMarkerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const center = [30.7333, 76.7794];


function MapComponent() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          `https://api.openchargemap.io/v3/poi/?output=json&latitude=29.8&longitude=77.0&distance=300&maxresults=100&countrycode=IN&key=bbf9133c-4474-4bc5-acb2-cff6c76af416`
        );
        const data = await response.json();

        // Map API data to station format
        const mappedStations = data.map((station) => ({
          id: station.ID,
          name: station.AddressInfo.Title,
          address: station.AddressInfo.AddressLine1 || 'No address',
          position: [station.AddressInfo.Latitude, station.AddressInfo.Longitude],
          availableSlots: Math.floor(Math.random() * 5) + 1, // simulate slots
        }));

        setStations(mappedStations);
      } catch (error) {
        console.error('Error fetching Open Charge Map data:', error);
      }
    };

    fetchStations();
  }, []);

  return (
    <MapContainer center={center} zoom={13} style={{ height: 'calc(100vh - 80px)', width: '100vw' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((station) => (
        <Marker key={station.id} position={station.position} icon={customIcon}>
          <Popup className="p-4 bg-white rounded-lg shadow-lg border border-gray-300 w-64">
            <div className="text-center">
              <strong className="text-md text-gray-900 block">{station.name}</strong>
              <p className="text-xs text-gray-600 mt-1">{station.address}</p>
              <p className="text-sm font-semibold mt-2">
                Slots Available:{' '}
                <span className={station.availableSlots > 0 ? 'text-green-600' : 'text-red-600'}>
                  {station.availableSlots}
                </span>
              </p>
              <div className="mt-3">
                {station.availableSlots > 0 ? (
                  <button
                    className="px-4 py-2 font-bold text-white bg-gradient-to-r from-green-700 to-green-500 rounded-md shadow-md hover:from-green-800 hover:to-green-400 transition-all transform hover:scale-105 text-sm"
                    onClick={() => bookStation(station.id, 'USER_ID_HERE')}
                  >
                    Book Slot
                  </button>
                ) : (
                  <span className="text-red-500 font-semibold text-xs bg-red-100 px-2 py-1 rounded-md">
                    ❌ No slots
                  </span>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
