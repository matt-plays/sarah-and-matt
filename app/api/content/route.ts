import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/storage';
import { SiteContent } from '@/types/content';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { content, label } = (await req.json()) as {
      content: SiteContent;
      label?: string;
    };
    const history = await saveContent(content, label ?? 'Manual save');
    return NextResponse.json({ ok: true, history });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
