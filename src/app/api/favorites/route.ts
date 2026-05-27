import { NextRequest, NextResponse } from 'next/server';
import { getFavorites, addFavorite, removeFavorite } from '@/lib/dataService';
import { AddFavoriteSchema } from '@/lib/schemas';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const deviceId = searchParams.get('deviceId');
  if (!deviceId) return NextResponse.json({ error: 'deviceId required' }, { status: 400 });

  const favorites = await getFavorites(deviceId);
  return NextResponse.json(favorites);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = AddFavoriteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const favorite = await addFavorite(parsed.data.deviceId, parsed.data.routeId);
    return NextResponse.json(favorite, { status: 201 });
  } catch (err: any) {
    if (err?.message?.includes('duplicate') || err?.message?.includes('unique')) {
      return NextResponse.json({ error: 'Ya está en favoritos' }, { status: 409 });
    }
    return NextResponse.json({ error: err?.message ?? 'Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const deviceId = searchParams.get('deviceId');
  const routeId = searchParams.get('routeId');

  if (!deviceId || !routeId) {
    return NextResponse.json({ error: 'deviceId and routeId required' }, { status: 400 });
  }

  try {
    await removeFavorite(deviceId, routeId);
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Error' }, { status: 500 });
  }
}
