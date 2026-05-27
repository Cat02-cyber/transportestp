'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);

interface MapViewProps {
  children: React.ReactNode;
}

export function MapView({ children }: MapViewProps) {
  useEffect(() => {
    import('leaflet/dist/leaflet.css');
    import('leaflet').then(Lmod => {
      delete (Lmod.Icon.Default.prototype as any)._getIconUrl;
      Lmod.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });
    });
  }, []);

  return (
    <MapContainer
      center={[11.2310, -74.1950]}
      zoom={14}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
      />
      {children}
    </MapContainer>
  );
}
