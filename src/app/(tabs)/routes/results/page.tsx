import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TripOptionCard } from '@/components/planner/TripOptionCard';

interface Props {
  searchParams: Promise<{ from?: string; to?: string }>;
}

async function ResultsContent({ from, to }: { from: string; to: string }) {
  return (
    <div className="min-h-dvh bg-[var(--color-bg)]">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <Link href="/routes" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-border)] transition-colors">
          <ArrowLeft size={20} className="text-[var(--color-text-primary)]" />
        </Link>
        <div>
          <h1 className="text-[20px] font-semibold font-display text-[var(--color-text-primary)]">
            {decodeURIComponent(to)}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Desde: {decodeURIComponent(from)} · Ahora
          </p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <TripOptionCard
          isFastest
          routes={[{ id: '03', color: '#2563EB' }]}
          durationMin={22}
          transfers={0}
          nextDepartureMin={4}
          fromStop="Parada Mamatoco"
          href="/routes/trip?option=1"
        />
        <TripOptionCard
          routes={[
            { id: '11', color: '#16A34A' },
            { id: '03', color: '#2563EB' },
          ]}
          durationMin={35}
          transfers={1}
          nextDepartureMin={1}
          fromStop="Parada Gaira"
          href="/routes/trip?option=2"
        />
      </div>
    </div>
  );
}

export default async function RouteResultsPage({ searchParams }: Props) {
  const { from = '', to = '' } = await searchParams;
  return (
    <Suspense>
      <ResultsContent from={from} to={to} />
    </Suspense>
  );
}
