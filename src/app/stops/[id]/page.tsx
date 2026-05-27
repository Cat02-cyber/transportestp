'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell } from 'lucide-react';
import { useBusSubscription } from '@/lib/hooks/useBusSubscription';
import { StopMap } from '@/components/discovery/StopMap';
import { RouteChip } from '@/components/shared/RouteChip';
import { ETABadge } from '@/components/shared/ETABadge';
import { routeStops, stops as seedStops } from '@/lib/seedReader';
import type { Stop, Bus } from '@/lib/types';

export default function StopDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const buses = useBusSubscription();
  const [stop, setStop] = useState<Stop | null>(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const found = seedStops.find(s => s.id === id);
    if (found) setStop(found);
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [id]);

  const routeIds = routeStops.filter(rs => rs.stop_id === id).map(rs => rs.route_id);
  const relevantBuses = buses.filter(b => routeIds.includes(b.route_id));

  if (!stop) {
    return (
      <div className="min-h-dvh bg-[var(--color-bg)] flex items-center justify-center">
        <p className="text-sm text-[var(--color-text-secondary)]">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[var(--color-bg)] flex flex-col">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-border)] transition-colors"
        >
          <ArrowLeft size={20} className="text-[var(--color-text-primary)]" />
        </button>
        <div>
          <h1 className="text-[20px] font-semibold font-display text-[var(--color-text-primary)]">
            {stop.name}
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Actualizado hace {seconds}s
          </p>
        </div>
      </div>

      <div className="px-4 mb-4">
        <StopMap stop={stop} />
      </div>

      <div className="flex-1 px-4 space-y-2">
        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">Buses en camino</p>
        {relevantBuses.length === 0 ? (
          <p className="text-sm text-[var(--color-text-secondary)]">No hay buses en camino en este momento.</p>
        ) : (
          relevantBuses.map(bus => (
            <div
              key={bus.id}
              className="flex items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3"
            >
              <RouteChip routeId={bus.route_id} size="sm" />
              <span className="flex-1 text-sm text-[var(--color-text-primary)]">
                Ruta {bus.route_id}
              </span>
              <ETABadge seconds={bus.eta_to_next_stop_seconds} />
              <button
                onClick={() => alert('Configurar alerta — esta función está disponible desde la pantalla de detalle del viaje.')}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bg)] transition-colors"
                aria-label="Configurar alerta"
              >
                <Bell size={16} className="text-[var(--color-text-secondary)]" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
