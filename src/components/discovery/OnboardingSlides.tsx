'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Bell, Route } from 'lucide-react';

const slides = [
  {
    icon: Map,
    title: 'Sé el primero en saber',
    subtitle: 'Ve en tiempo real dónde están los buses del SETP en tu ciudad.',
  },
  {
    icon: Bell,
    title: 'Cero incertidumbre',
    subtitle: 'Recibe alertas antes de que el bus llegue a tu parada. Sin sorpresas.',
  },
  {
    icon: Route,
    title: 'Planea tu viaje',
    subtitle: 'Encuentra la ruta más rápida y organiza tus tiempos desde casa.',
  },
];

function completeOnboarding(router: ReturnType<typeof useRouter>) {
  localStorage.setItem('setp_onboarding_done', 'true');
  router.push('/permission');
}

export function OnboardingSlides() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  function next() {
    if (current < slides.length - 1) setCurrent(c => c + 1);
  }

  return (
    <div className="min-h-dvh bg-[var(--color-surface)] flex flex-col">
      <div className="flex justify-end p-4">
        {current < slides.length - 1 && (
          <button onClick={() => completeOnboarding(router)} className="text-sm text-[var(--color-text-secondary)]">
            Saltar
          </button>
        )}
        {current === slides.length - 1 && <div />}
      </div>

      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 30 }}
            className="flex flex-col items-center text-center"
          >
            {(() => { const Icon = slides[current].icon; return <Icon size={120} className="text-[var(--color-primary)] mb-8" />; })()}
            <h1 className="text-[24px] font-bold font-display text-[var(--color-text-primary)] mb-3">
              {slides[current].title}
            </h1>
            <p className="text-base text-[var(--color-text-secondary)] max-w-[80%]">
              {slides[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === current ? 24 : 8,
              backgroundColor: i === current ? 'var(--color-accent)' : '#CBD5E1',
            }}
            className="h-2 rounded-full"
          />
        ))}
      </div>

      <div className="px-6 pb-10">
        {current === slides.length - 1 ? (
          <button
            onClick={() => completeOnboarding(router)}
            className="w-full bg-[var(--color-primary)] text-white rounded-xl py-3 text-sm font-semibold active:scale-[0.97] transition-transform"
          >
            Comenzar
          </button>
        ) : (
          <button
            onClick={next}
            className="w-full bg-[var(--color-primary)] text-white rounded-xl py-3 text-sm font-semibold active:scale-[0.97] transition-transform"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
