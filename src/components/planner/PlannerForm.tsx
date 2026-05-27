'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';
import { StopAutocomplete } from './StopAutocomplete';

const quickDestinations = [
  { label: 'Universidad Sergio Arboleda', icon: '🏫' },
  { label: 'El Rodadero', icon: '🏖️' },
  { label: 'Hospital Central', icon: '🏥' },
  { label: 'Mercado Público', icon: '🛒' },
];

export function PlannerForm() {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [key, setKey] = useState(0);

  function swap() {
    setFrom(to);
    setTo(from);
    setKey(k => k + 1);
  }

  function search() {
    if (from && to) {
      router.push(`/routes/results?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    }
  }

  const canSearch = from.length > 0 && to.length > 0;

  return (
    <div key={key} className="p-4 space-y-4">
      <div className="relative">
        <StopAutocomplete
          label="¿Desde dónde salís?"
          value={from}
          onChange={setFrom}
          dotColor="#2563EB"
          autoFocus
        />
        <button
          onClick={swap}
          className="absolute left-4 -bottom-[18px] z-10 w-9 h-9 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <ArrowUpDown size={16} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>
      <div className="pt-2">
        <StopAutocomplete
          label="¿A dónde vas?"
          value={to}
          onChange={setTo}
          dotColor="#DC2626"
        />
      </div>

      {canSearch && (
        <button
          onClick={search}
          className="w-full bg-[var(--color-primary)] text-white rounded-xl py-3 text-sm font-semibold active:scale-[0.97] transition-transform"
        >
          Buscar rutas
        </button>
      )}

      <div>
        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">Sugerencias</p>
        <div className="space-y-1">
          {quickDestinations.map(d => (
            <button
              key={d.label}
              onClick={() => setTo(d.label)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors"
            >
              {d.icon} {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
