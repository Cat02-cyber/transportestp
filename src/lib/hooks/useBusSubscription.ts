'use client';

import { useState, useEffect } from 'react';
import { getBrowserClient } from '@/lib/supabase-client';
import type { Bus } from '@/lib/types';

export function useBusSubscription() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const supabase = getBrowserClient();

  useEffect(() => {
    if (!supabase) return;

    supabase.from('buses').select('*').in('status', ['en_ruta', 'demorado'])
      .then(({ data }) => { if (data) setBuses(data as Bus[]); });

    const channel = supabase
      .channel('buses-realtime')
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'buses' },
        (payload) => {
          setBuses(prev =>
            prev.map(b => b.id === payload.new.id ? payload.new as Bus : b)
          );
        })
      .subscribe();

    return () => { channel.unsubscribe(); };
  }, [supabase]);

  return buses;
}
