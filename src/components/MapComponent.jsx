
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const position = [30.7333, 76.7794];


function MapComponent() {
  return (
    <MapContainer
  center={position}
  zoom={12}
  style={{ height: '100vh', width: '100vw' }}
>
  <TileLayer
    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
    <Popup>
      Charging Station Here! <br /> Easily accessible.
    </Popup>
  </Marker>
</MapContainer>

  );
}

export default MapComponent;
