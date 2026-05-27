'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useBusSubscription } from '@/lib/hooks/useBusSubscription';
import { MapView } from '@/components/map/MapView';
import { BusMarker } from '@/components/map/BusMarker';
import { UserMarker } from '@/components/map/UserMarker';
import { RoutePolyline } from '@/components/map/RoutePolyline';
import { BusBottomSheet } from '@/components/map/BusBottomSheet';
import type { Route, Stop } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function MapPage() {
  const router = useRouter();
  const buses = useBusSubscription();
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeStopsMap, setRouteStopsMap] = useState<Record<string, Stop[]>>({});
  const [userPosition, setUserPosition] = useState<[number, number] | undefined>(undefined);

  const selectedBus = buses.find(b => b.id === selectedBusId) ?? null;

  useEffect(() => {
    fetch('/api/routes')
      .then(r => r.json())
      .then(async (data: Route[]) => {
        setRoutes(data);
        const map: Record<string, Stop[]> = {};
        await Promise.all(
          data.map(async (route) => {
            const res = await fetch(`/api/routes/${route.id}/stops`);
            map[route.id] = await res.json();
          })
        );
        setRouteStopsMap(map);
      });
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
        () => {}
      );
    }
  }, []);

  return (
    <div className="relative h-[calc(100dvh-var(--bottom-nav-height))]">
      <MapView>
        {routes.map(r => (
          <RoutePolyline key={r.id} routeId={r.id} stops={routeStopsMap[r.id] ?? []} />
        ))}
        <UserMarker position={userPosition} />
        {buses.map(bus => (
          <BusMarker
            key={bus.id}
            bus={bus}
            onSelect={() => setSelectedBusId(bus.id)}
          />
        ))}
      </MapView>

      <div className="absolute top-4 left-4 right-4 z-[1000]">
        <button
          onClick={() => router.push('/routes')}
          className="w-full bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3 active:scale-[0.99] transition-transform"
        >
          <Search size={18} className="text-[var(--color-text-secondary)]" />
          <span className="text-[var(--color-text-secondary)] text-sm">¿A dónde vas hoy?</span>
        </button>
      </div>

      <BusBottomSheet bus={selectedBus} onClose={() => setSelectedBusId(null)} />
    </div>
  );
}
