'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getRouteColor } from '@/lib/design/colors';
import type { Bus } from '@/lib/types';
import type L from 'leaflet';
import type { MarkerProps, PopupProps } from 'react-leaflet';

const Marker = dynamic<MarkerProps>(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);

const Popup = dynamic<PopupProps>(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
);

interface BusMarkerProps {
  bus: Bus;
  onSelect: () => void;
}

export function BusMarker({ bus, onSelect }: BusMarkerProps) {
  const [icon, setIcon] = useState<L.DivIcon | null>(null);

  useEffect(() => {
    import('leaflet').then(Lmod => {
      const color = getRouteColor(bus.route_id);
      const divIcon = Lmod.divIcon({
        className: '',
        html: `<div class="bus-marker" style="background-color:${color};padding:4px 10px;border-radius:6px;color:white;font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.2)">${bus.route_id}</div>`,
        iconSize: [0, 0],
        iconAnchor: [20, 20],
      });
      setIcon(divIcon);
    });
  }, [bus.route_id]);

  if (bus.current_lat == null || bus.current_lng == null || !icon) return null;

  return (
    <Marker
      position={[bus.current_lat, bus.current_lng]}
      icon={icon}
      eventHandlers={{ click: onSelect }}
    >
      <Popup>
        <div className="text-center">
          <strong>Bus {bus.id}</strong> — Ruta {bus.route_id}
        </div>
      </Popup>
    </Marker>
  );
}
