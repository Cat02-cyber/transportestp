'use client';

import { useETACountdown } from '@/lib/hooks/useETACountdown';
import { Sheet } from '@/components/ui/Sheet';
import { RouteChip } from '@/components/shared/RouteChip';
import type { Bus } from '@/lib/types';

interface BusBottomSheetProps {
  bus: Bus | null;
  onClose: () => void;
}

export function BusBottomSheet({ bus, onClose }: BusBottomSheetProps) {
  if (!bus) return null;

  const seconds = useETACountdown(bus.eta_to_next_stop_seconds, bus.updated_at);
  const minutes = Math.ceil(seconds / 60);
  const display = minutes === 0 ? 'Llegando' : `${minutes} min`;

  const statusLabel = bus.status === 'en_ruta' ? 'En ruta' : 'Demorado';
  const statusColor = bus.status === 'en_ruta' ? 'var(--color-success)' : 'var(--color-warning)';

  return (
    <Sheet isOpen={!!bus} onClose={onClose}>
      <div className="px-5 py-4 space-y-4">
        <div className="flex items-center gap-3">
          <RouteChip routeId={bus.route_id} />
          <span className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
            {statusLabel}
          </span>
        </div>

        <div>
          <p className="text-[22px] font-bold font-display text-[var(--color-primary)]">
            {display}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            a la próxima parada
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-[var(--color-primary)] text-white rounded-xl py-3 text-sm font-semibold active:scale-[0.98] transition-transform">
            Seguir este bus
          </button>
          <button className="flex-1 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-xl py-3 text-sm font-semibold active:scale-[0.98] transition-transform">
            Ver ruta
          </button>
        </div>
      </div>
    </Sheet>
  );
}
