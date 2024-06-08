import React, { useEffect, useRef } from 'react';

interface MapViewProps {
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    google: any;
  }
}

const MapView: React.FC<MapViewProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window.google === 'undefined') {
      console.error('Google Maps JavaScript API is not loaded');
      return;
    }

    if (typeof lat !== 'number' || typeof lng !== 'number' || !isFinite(lat) || !isFinite(lng)) {
      console.error('Invalid lat or lng value');
      return;
    }

    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 8,
      });
    } else if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat, lng });
    }
  }, [lat, lng]);

  return <div ref={mapRef} style={{ height: "500px", width: "500px" }} />;
};

export default MapView;
