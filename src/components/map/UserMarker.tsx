'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type L from 'leaflet';
import type { MarkerProps } from 'react-leaflet';

const Marker = dynamic<MarkerProps>(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);

interface UserMarkerProps {
  position?: [number, number];
}

export function UserMarker({ position }: UserMarkerProps) {
  const [icon, setIcon] = useState<L.DivIcon | null>(null);

  useEffect(() => {
    import('leaflet').then(Lmod => {
      const divIcon = Lmod.divIcon({
        className: '',
        html: `<div style="width:16px;height:16px;background:var(--color-primary,#0D2B55);border-radius:50%;position:relative"><div style="content:'';position:absolute;top:-8px;left:-8px;width:32px;height:32px;border-radius:50%;background:var(--color-primary,#0D2B55);opacity:0.3;animation:pulse 2s infinite"></div></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      setIcon(divIcon);
    });
  }, []);

  const pos = position ?? [11.2310, -74.1950];

  if (!icon) return null;

  return <Marker position={pos} icon={icon} />;
}
