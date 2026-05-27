'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useDeviceId } from '@/lib/hooks/useDeviceId';
import { FavoriteRouteCard } from '@/components/discovery/FavoriteRouteCard';
import type { Route } from '@/lib/types';

export default function FavoritesPage() {
  const deviceId = useDeviceId();
  const [favorites, setFavorites] = useState<Route[]>([]);

  useEffect(() => {
    if (!deviceId) return;
    fetch(`/api/favorites?deviceId=${deviceId}`)
      .then(r => r.json())
      .then(setFavorites);
  }, [deviceId]);

  function handleRemove(routeId: string) {
    if (!deviceId) return;
    fetch(`/api/favorites?deviceId=${deviceId}&routeId=${routeId}`, { method: 'DELETE' })
      .then(() => setFavorites(prev => prev.filter(r => r.id !== routeId)));
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[calc(100dvh-var(--bottom-nav-height))] bg-[var(--color-bg)] px-6">
        <Star size={80} className="text-[var(--color-border)] mb-6" />
        <p className="text-[17px] font-semibold font-display text-[var(--color-text-primary)] mb-2">
          Todavía no tienes rutas guardadas
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] text-center">
          Guarda una ruta desde el planificador para acceso rápido.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-var(--bottom-nav-height))] bg-[var(--color-bg)]">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-[20px] font-semibold font-display text-[var(--color-text-primary)]">
          Rutas favoritas
        </h1>
      </div>
      <div className="px-4 space-y-2">
        {favorites.map(route => (
          <FavoriteRouteCard
            key={route.id}
            route={route}
            onRemove={() => handleRemove(route.id)}
          />
        ))}
      </div>
    </div>
  );
}
