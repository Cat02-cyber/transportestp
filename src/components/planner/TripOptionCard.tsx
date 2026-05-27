'use client';

import Link from 'next/link';
import { RouteChip } from '@/components/shared/RouteChip';

interface TripOptionCardProps {
  isFastest?: boolean;
  routes: { id: string; color: string }[];
  durationMin: number;
  transfers: number;
  nextDepartureMin: number;
  fromStop: string;
  href: string;
}

export function TripOptionCard({
  isFastest, routes, durationMin, transfers, nextDepartureMin, fromStop, href,
}: TripOptionCardProps) {
  return (
    <Link
      href={href}
      className="block w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 text-left transition-all duration-150 hover:shadow-md active:scale-[0.98]"
    >
      {isFastest && (
        <span className="inline-block bg-[var(--color-accent)]/20 text-[var(--color-text-primary)] text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
          ⭐ Más rápida
        </span>
      )}
      <div className="flex items-center gap-2 mb-2">
        {routes.map((r, i) => (
          <span key={r.id}>
            <RouteChip routeId={r.id} size="sm" />
            {i < routes.length - 1 && <span className="mx-1 text-[var(--color-text-secondary)]">→</span>}
          </span>
        ))}
      </div>
      <p className="text-[15px] font-semibold text-[var(--color-text-primary)]">
        {durationMin} min · {transfers} {transfers === 1 ? 'transbordo' : 'transbordos'}
      </p>
      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
        Próxima salida: en {nextDepartureMin} min
      </p>
      <p className="text-sm text-[var(--color-text-secondary)]">
        Sale desde: {fromStop}
      </p>
    </Link>
  );
}
