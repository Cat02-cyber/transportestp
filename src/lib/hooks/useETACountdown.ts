'use client';

import { useState, useEffect } from 'react';

export function useETACountdown(initialEta: number, updatedAt: string) {
  const [eta, setEta] = useState(initialEta);
  const updatedAtMs = new Date(updatedAt).getTime();

  useEffect(() => {
    setEta(initialEta);
    const interval = setInterval(() => {
      const elapsed = (Date.now() - updatedAtMs) / 1000;
      setEta(Math.max(0, initialEta - elapsed));
    }, 1000);
    return () => clearInterval(interval);
  }, [initialEta, updatedAtMs]);

  return Math.round(eta);
}
