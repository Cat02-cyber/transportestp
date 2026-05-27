'use client';

import { useState } from 'react';
import { Sheet } from '@/components/ui/Sheet';

interface AlertBottomSheetProps {
  routeId: string;
  isOpen: boolean;
  onClose: () => void;
  onActivate: (minutes: number, onlyNextBus: boolean) => void;
}

export function AlertBottomSheet({ routeId, isOpen, onClose, onActivate }: AlertBottomSheetProps) {
  const [selectedMin, setSelectedMin] = useState(5);
  const [onlyNextBus, setOnlyNextBus] = useState(true);

  const options = [5, 10, 15];

  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoint={280}>
      <div className="px-5 py-4 space-y-4">
        <p className="text-[17px] font-semibold font-display text-[var(--color-text-primary)]">
          🔔 Alerta para Ruta {routeId}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Avisarme cuando el bus esté a:
        </p>
        <div className="flex gap-2">
          {options.map(min => (
            <button
              key={min}
              onClick={() => setSelectedMin(min)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedMin === min
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'border border-[var(--color-border)] text-[var(--color-text-primary)]'
              }`}
            >
              {min} min
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-text-primary)]">Solo para el próximo bus</span>
          <button
            onClick={() => setOnlyNextBus(!onlyNextBus)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              onlyNextBus ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow-sm transition-transform absolute top-0.5 ${
                onlyNextBus ? 'translate-x-[22px]' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
        <button
          onClick={() => { onActivate(selectedMin, onlyNextBus); }}
          className="w-full bg-[var(--color-primary)] text-white rounded-xl py-3 text-sm font-semibold active:scale-[0.97] transition-transform"
        >
          Activar alerta
        </button>
      </div>
    </Sheet>
  );
}
