import { NextResponse } from 'next/server';
import { getHistory } from '@/lib/storage';

export async function GET() {
  try {
    const history = await getHistory();
    return NextResponse.json(history);
  } catch {
    return NextResponse.json({ error: 'Failed to read history' }, { status: 500 });
  }
}
