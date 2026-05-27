'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PlannerForm } from '@/components/planner/PlannerForm';

export default function RoutesPage() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100dvh-var(--bottom-nav-height))] bg-[var(--color-bg)]">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-border)] transition-colors"
        >
          <ArrowLeft size={20} className="text-[var(--color-text-primary)]" />
        </button>
        <h1 className="text-[20px] font-semibold font-display text-[var(--color-text-primary)]">
          Planificar viaje
        </h1>
      </div>
      <PlannerForm />
    </div>
  );
}
