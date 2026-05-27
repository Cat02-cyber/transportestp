'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { RouteChip } from '@/components/shared/RouteChip';
import { AlertBottomSheet } from '@/components/planner/AlertBottomSheet';
import { Toast, useToast } from '@/components/ui/Toast';
import type { Stop } from '@/lib/types';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });

const route03Stops: Stop[] = [
  { id: 's01', name: 'Parada Mamatoco', latitude: 11.2490, longitude: -74.1820 },
  { id: 's02', name: 'Estadio Sierra Nevada', latitude: 11.2380, longitude: -74.1900 },
  { id: 's03', name: 'Av. del Río', latitude: 11.2330, longitude: -74.1935 },
  { id: 's04', name: 'Universidad Sergio Arboleda', latitude: 11.2310, longitude: -74.1950 },
  { id: 's05', name: 'Catedral', latitude: 11.2408, longitude: -74.2073 },
  { id: 's06', name: 'Mercado / Centro Histórico', latitude: 11.2440, longitude: -74.2100 },
];

const stopTimes = ['Salida', '3 min', '6 min', '10 min', '16 min', '22 min (llegada)'];

export default function TripDetailPage() {
  const [showAlert, setShowAlert] = useState(false);
  const { toast, show, hide } = useToast();
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    import('leaflet').then(() => setLeafletLoaded(true));
  }, []);

  const positions = route03Stops.map(s => [s.latitude, s.longitude] as [number, number]);

  function handleActivate(minutes: number, onlyNextBus: boolean) {
    show(`✅ Alerta activada para Ruta 03 (${minutes} min, ${onlyNextBus ? 'próximo bus' : 'todos los buses'})`, 'success');
    setTimeout(() => { setShowAlert(false); }, 1500);
  }

  return (
    <div className="min-h-dvh bg-[var(--color-bg)] flex flex-col">
      <Toast message={toast?.message ?? ''} type={toast?.type} visible={!!toast} onClose={hide} />

      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <Link href="/routes/results?from=origen&to=destino" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-border)] transition-colors">
          <ArrowLeft size={20} className="text-[var(--color-text-primary)]" />
        </Link>
      </div>

      <div className="h-[45vh] w-full relative">
        {leafletLoaded && (
          <MapContainer center={[11.2408, -74.1950]} zoom={14} className="w-full h-full" zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={positions} color="#2563EB" weight={5} opacity={0.8} />
            {route03Stops.map((s, i) => (
              <Marker key={s.id} position={[s.latitude, s.longitude]} />
            ))}
          </MapContainer>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="flex items-center gap-3">
          <RouteChip routeId="03" />
          <span className="text-sm text-[var(--color-text-secondary)]">
            22 min · Ruta 03 · 0 transbordos
          </span>
        </div>

        <div className="space-y-0">
          {route03Stops.map((stop, i) => (
            <div key={stop.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 ${
                    i === 0 ? 'bg-[var(--color-success)]' : i === route03Stops.length - 1 ? 'bg-[var(--color-error)]' : 'bg-[var(--color-border)]'
                  }`}
                />
                {i < route03Stops.length - 1 && <div className="w-0.5 flex-1 border-l border-dashed border-[var(--color-border)]" />}
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  {i === 0 ? `${stop.name} (salida)` : i === route03Stops.length - 1 ? `${stop.name} (llegada)` : stop.name}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">{stopTimes[i]}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAlert(true)}
          className="w-full bg-[var(--color-primary)] text-white rounded-xl py-3 text-sm font-semibold active:scale-[0.97] transition-transform"
        >
          🔔 Activarme cuando el bus llegue
        </button>
      </div>

      <AlertBottomSheet routeId="03" isOpen={showAlert} onClose={() => setShowAlert(false)} onActivate={handleActivate} />
    </div>
  );
}
