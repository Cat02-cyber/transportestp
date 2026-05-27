'use client';

import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PermissionPage() {
  const router = useRouter();

  function requestLocation() {
    navigator.geolocation.getCurrentPosition(
      () => router.push('/map'),
      () => router.push('/map'),
      { timeout: 5000 }
    );
  }

  return (
    <div className="min-h-dvh bg-[var(--color-surface)] flex flex-col items-center justify-center px-6">
      <div className="relative mb-12">
        <MapPin size={64} className="text-[var(--color-primary)]" />
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: [1, 1.5 + i * 0.3, 2 + i * 0.3], opacity: [0.7, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-[var(--color-primary)]"
          />
        ))}
      </div>

      <h1 className="text-[22px] font-bold font-display text-[var(--color-text-primary)] mb-3">
        ¿Dónde estás?
      </h1>
      <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8 max-w-xs">
        Necesitamos tu ubicación para mostrarte los buses más cercanos y los tiempos exactos de llegada.
      </p>

      <button
        onClick={requestLocation}
        className="w-full bg-[var(--color-primary)] text-white rounded-xl py-3 text-sm font-semibold active:scale-[0.97] transition-transform mb-4"
      >
        Activar ubicación
      </button>
      <button
        onClick={() => router.push('/map')}
        className="text-sm text-[var(--color-text-secondary)] underline"
      >
        Ahora no
      </button>
    </div>
  );
}
