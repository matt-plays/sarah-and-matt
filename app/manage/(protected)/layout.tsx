import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHash } from 'crypto';
import { ReactNode } from 'react';

function expectedToken() {
  const pw = process.env.CMS_PASSWORD ?? '';
  return createHash('sha256').update(pw + 'cms-sm-2026').digest('hex');
}

export default async function ManageLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!process.env.CMS_PASSWORD) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center p-8">
          <p className="text-white text-xl font-medium mb-2">CMS not configured</p>
          <p className="text-gray-400 text-sm">
            Set the <code className="bg-gray-800 px-1 rounded">CMS_PASSWORD</code> environment
            variable to enable manage mode.
          </p>
        </div>
      </div>
    );
  }

  const cookieStore = await cookies();
  const auth = cookieStore.get('cms_auth');

  if (auth?.value !== expectedToken()) {
    redirect('/manage/login');
  }

  return <>{children}</>;
}
