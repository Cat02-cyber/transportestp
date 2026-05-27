import { NextRequest, NextResponse } from 'next/server';
import { getNearbyStops } from '@/lib/dataService';
import { routeStops, buses as seedBuses } from '@/lib/seedReader';
import { NearbyStopsQuerySchema } from '@/lib/schemas';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = NearbyStopsQuerySchema.safeParse({
    lat: searchParams.get('lat'),
    lng: searchParams.get('lng'),
    limit: searchParams.get('limit') ?? 10,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { lat, lng, limit } = parsed.data;
  const nearby = await getNearbyStops(lat, lng, limit);

  const enriched = nearby.map(stop => {
    const routeIds = routeStops
      .filter(rs => rs.stop_id === stop.id)
      .map(rs => rs.route_id);

    const arrivals = routeIds.map(routeId => {
      const bus = seedBuses.find(b => b.route_id === routeId && b.status !== 'fuera_de_servicio');
      const eta = bus ? bus.eta_to_next_stop_seconds : null;
      return { routeId, eta };
    });

    return {
      ...stop,
      distanceM: Math.round(stop.distance_km * 1000),
      arrivals: arrivals.slice(0, 2),
    };
  });

  return NextResponse.json(enriched);
}
