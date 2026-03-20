import { getContent, getHistory } from '@/lib/storage';
import ManageClient from './ManageClient';

export default async function ManagePage() {
  const [content, history] = await Promise.all([getContent(), getHistory()]);

  return <ManageClient initialContent={content} initialHistory={history} />;
}
