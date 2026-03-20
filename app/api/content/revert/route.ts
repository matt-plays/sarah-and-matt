import { NextRequest, NextResponse } from 'next/server';
import { getHistory, saveContent } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string };
    const history = await getHistory();
    const snapshot = history.find((s) => s.id === id);
    if (!snapshot) {
      return NextResponse.json({ error: 'Snapshot not found' }, { status: 404 });
    }
    const updatedHistory = await saveContent(
      snapshot.content,
      `Reverted to: ${snapshot.label}`
    );
    return NextResponse.json({ ok: true, content: snapshot.content, history: updatedHistory });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
