"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPreviewProps {
  location: { lat: number; lng: number };
  onLocationChange?: (lat: number, lng: number) => void;
}

function RecenterMap({ location }: { location: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    map.setView([location.lat, location.lng]);
  }, [location, map]);
  return null;
}

export default function MapPreview({ location, onLocationChange }: MapPreviewProps) {
  return (
    <MapContainer 
      center={[location.lat, location.lng]} 
      zoom={15} 
      style={{ height: "100%", width: "100%", zIndex: 10 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={[location.lat, location.lng]} 
        icon={icon} 
        draggable={!!onLocationChange}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const position = marker.getLatLng();
            if (onLocationChange) {
              onLocationChange(position.lat, position.lng);
            }
          },
        }}
      />
      <RecenterMap location={location} />
    </MapContainer>
  );
}
