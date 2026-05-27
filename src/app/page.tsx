'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bus } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const seenOnboarding = localStorage.getItem('setp_onboarding_done');
      router.replace(seenOnboarding ? '/map' : '/onboarding');
    }, 1800);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-dvh bg-[#0D2B55] flex flex-col items-center justify-center">
      <Bus size={64} color="#F5C518" />
      <h1 className="text-[28px] font-bold font-display text-white mt-4" style={{ fontFamily: 'var(--font-display)' }}>
        SETP SM
      </h1>
      <p className="text-base text-white/70 mt-1" style={{ fontFamily: 'var(--font-body)' }}>
        Santa Marta
      </p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="h-1 bg-[#F5C518] rounded-full mt-10"
      />
    </div>
  );
}
