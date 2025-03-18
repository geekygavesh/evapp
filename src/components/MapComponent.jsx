
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
          <Popup>
            <strong>{station.name}</strong>
            <br />
            {station.address}
            <br />
            Slots Available: {station.availableSlots}
            
            <br />
          {station.availableSlots > 0 ? (
            <button onClick={() => bookStation(station.id, 'USER_ID_HERE')}>
              Book Slot
            </button>) : 
            ( <span>No slots available</span>)
          }
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
