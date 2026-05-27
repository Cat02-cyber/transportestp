import { NextRequest, NextResponse } from 'next/server';
import { getRouteStops } from '@/lib/dataService';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ routeId: string }> }
) {
  const { routeId } = await params;
  const stops = await getRouteStops(routeId);
  return NextResponse.json(stops);
}
