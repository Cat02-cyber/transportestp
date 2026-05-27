'use client';

import { useRouter } from 'next/navigation';
import { StopListItem } from '@/components/shared/StopListItem';
import type { NearbyStop } from '@/lib/types';

interface NearbyStopsListProps {
  stops: NearbyStop[];
}

export function NearbyStopsList({ stops }: NearbyStopsListProps) {
  const router = useRouter();

  return (
    <div className="space-y-1">
      {stops.map(stop => (
        <StopListItem
          key={stop.id}
          stop={stop}
          onClick={() => router.push(`/stops/${stop.id}`)}
        />
      ))}
    </div>
  );
}
