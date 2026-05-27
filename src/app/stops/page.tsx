'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { NearbyStopsList } from '@/components/discovery/NearbyStopsList';

export default function StopsPage() {
  const router = useRouter();
  const [stops, setStops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(`/api/stops/nearby?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}&limit=10`)
          .then(r => r.json())
          .then(data => { setStops(data); setLoading(false); });
      },
      () => {
        fetch(`/api/stops/nearby?lat=11.2310&lng=-74.1950&limit=10`)
          .then(r => r.json())
          .then(data => { setStops(data); setLoading(false); });
      }
    );
  }, []);

  return (
    <div className="min-h-[calc(100dvh-var(--bottom-nav-height))] bg-[var(--color-bg)]">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-border)] transition-colors"
        >
          <ArrowLeft size={20} className="text-[var(--color-text-primary)]" />
        </button>
        <div>
          <h1 className="text-[20px] font-semibold font-display text-[var(--color-text-primary)]">
            Paradas cercanas
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Ordenadas por distancia</p>
        </div>
      </div>

      <div className="px-4 py-2">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-[var(--color-border)] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <NearbyStopsList stops={stops} />
        )}
      </div>
    </div>
  );
}
