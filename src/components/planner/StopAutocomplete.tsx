'use client';

import { useState, useEffect, useRef } from 'react';
import type { Stop } from '@/lib/types';

interface StopAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  dotColor: string;
  autoFocus?: boolean;
}

export function StopAutocomplete({ label, value, onChange, dotColor, autoFocus }: StopAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Stop[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    fetch('/api/stops')
      .then(r => r.json())
      .then((data: Stop[]) => {
        setSuggestions(data.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5));
        setOpen(true);
      });
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3">
        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />
        <input
          className="flex-1 bg-transparent text-[15px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none"
          placeholder={label}
          value={value || query}
          autoFocus={autoFocus}
          onChange={e => { setQuery(e.target.value); onChange(''); }}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
        />
      </div>
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg z-10 overflow-hidden">
          {suggestions.map(s => (
            <button
              key={s.id}
              className="w-full text-left px-4 py-3 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg)] transition-colors"
              onClick={() => { onChange(s.name); setQuery(s.name); setOpen(false); }}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
