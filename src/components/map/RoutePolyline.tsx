'use client';

import dynamic from 'next/dynamic';
import { getRouteColor } from '@/lib/design/colors';
import type { Stop } from '@/lib/types';

const Polyline = dynamic(
  () => import('react-leaflet').then(mod => mod.Polyline),
  { ssr: false }
);

interface RoutePolylineProps {
  routeId: string;
  stops: Stop[];
}

export function RoutePolyline({ routeId, stops }: RoutePolylineProps) {
  const positions = stops.map(s => [s.latitude, s.longitude] as [number, number]);
  const color = getRouteColor(routeId);

  return (
    <Polyline
      positions={positions}
      color={color}
      weight={3}
      opacity={0.7}
    />
  );
}
