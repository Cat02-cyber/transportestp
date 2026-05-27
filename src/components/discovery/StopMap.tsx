'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Stop } from '@/lib/types';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });

interface StopMapProps {
  stop: Stop;
}

export function StopMap({ stop }: StopMapProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import('leaflet').then(() => setReady(true));
  }, []);

  if (!ready) return <div className="w-full h-[200px] bg-[var(--color-bg)] rounded-xl animate-pulse" />;

  return (
    <MapContainer
      center={[stop.latitude, stop.longitude]}
      zoom={16}
      className="w-full h-[200px] rounded-xl"
      zoomControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[stop.latitude, stop.longitude]} />
    </MapContainer>
  );
}
