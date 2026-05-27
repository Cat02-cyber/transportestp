'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { RouteChip } from '@/components/shared/RouteChip';
import type { Route } from '@/lib/types';

interface FavoriteRouteCardProps {
  route: Route;
  onRemove: () => void;
}

export function FavoriteRouteCard({ route, onRemove }: FavoriteRouteCardProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/routes/results?from=&to=${encodeURIComponent(route.name)}`)}
      className="w-full flex items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 text-left transition-all duration-150 hover:shadow-sm active:scale-[0.98]"
    >
      <RouteChip routeId={route.id} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
          {route.name}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Tocar para ver detalle
        </p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bg)] transition-colors"
        aria-label="Eliminar favorito"
      >
        <X size={16} className="text-[var(--color-text-secondary)]" />
      </button>
    </button>
  );
}
