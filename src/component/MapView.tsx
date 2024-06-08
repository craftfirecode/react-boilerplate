import React, { useEffect, useRef, useState } from 'react';

interface MapViewProps {
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    google: any;
  }
}

const MapView: React.FC<MapViewProps> = ({ lat = 52.2689, lng = 10.5268 }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);

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
        zoom: 12,
      });

      infoWindowRef.current = new window.google.maps.InfoWindow();

      // Define markers in the Braunschweig area
      const markers = [
        { lat: 52.2689, lng: 10.5268 },
        { lat: 52.2650, lng: 10.5130 },
        { lat: 52.2600, lng: 10.5400 },
        { lat: 52.2750, lng: 10.5200 },
      ];

      // Add markers to the map with click listener
      markers.forEach(position => {
        const marker = new window.google.maps.Marker({
          position,
          map: mapInstanceRef.current,
        });

        marker.addListener('click', () => {
          infoWindowRef.current.setContent(`Latitude: ${position.lat}<br>Longitude: ${position.lng}`);
          infoWindowRef.current.open(mapInstanceRef.current, marker);
        });
      });

      // Define polygons in the Braunschweig area
      const polygons = [
        [
          { lat: 52.2689, lng: 10.5268 },
          { lat: 52.2700, lng: 10.5300 },
          { lat: 52.2650, lng: 10.5350 },
          { lat: 52.2630, lng: 10.5290 },
          { lat: 52.2689, lng: 10.5268 },
        ],
        [
          { lat: 52.2750, lng: 10.5200 },
          { lat: 52.2780, lng: 10.5250 },
          { lat: 52.2740, lng: 10.5300 },
          { lat: 52.2710, lng: 10.5250 },
          { lat: 52.2750, lng: 10.5200 },
        ],
      ];

      // Add polygons to the map with click listener
      polygons.forEach(path => {
        const polygon = new window.google.maps.Polygon({
          paths: path,
          map: mapInstanceRef.current,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
        });

        polygon.addListener('click', (event: any) => {
          const latLng = event.latLng;
          infoWindowRef.current.setContent(`Latitude: ${latLng.lat()}<br>Longitude: ${latLng.lng()}`);
          infoWindowRef.current.setPosition(latLng);
          infoWindowRef.current.open(mapInstanceRef.current);
        });
      });
    } else if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat, lng });
    }
  }, [lat, lng]);

  return (
    <div ref={mapRef} style={{ height: "500px", width: "500px" }} />
  );
};

export default MapView;
