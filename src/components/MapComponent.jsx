
import React from 'react';
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


import { stationsData } from '../data/stationsData';

function MapComponent() {
  return (
    <MapContainer center={center} zoom={13} style={{ height: 'calc(100vh - 80px)', width: '100vw' }}  >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stationsData.map((station) => (
        <Marker key={station.id} position={station.position} icon={customIcon}>
          <Popup className="p-4 bg-white rounded-lg shadow-lg border border-gray-300 w-64">
  <div className="text-center">
    {/* Station Name */}
    <strong className="text-md text-gray-900 block">{station.name}</strong>

    {/* Address */}
    <p className="text-xs text-gray-600 mt-1">{station.address}</p>

    {/* Slots Available */}
    <p className="text-sm font-semibold mt-2">
      Slots Available:{" "}
      <span className={station.availableSlots > 0 ? "text-green-600" : "text-red-600"}>
        {station.availableSlots}
      </span>
    </p>

    {/* Booking Button or No Slots Message */}
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
