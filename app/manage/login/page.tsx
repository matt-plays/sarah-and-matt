'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/manage');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? 'Incorrect password');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#1a2e1a' }}
    >
      <div className="w-full max-w-sm px-8">
        {/* Site name */}
        <p
          className="font-romie font-light italic text-center mb-10"
          style={{ fontSize: 'clamp(40px, 8vw, 64px)', color: '#d4c9b8' }}
        >
          Sarah &amp; Matt
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: 'rgba(212,201,184,0.6)', fontFamily: 'var(--font-instrument)' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              placeholder="Enter manage password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            style={{
              backgroundColor: '#3b82f6',
              color: '#fff',
              fontSize: 15,
            }}
          >
            {loading ? 'Signing in…' : 'Enter Manage Mode'}
          </button>
        </form>

        <p className="text-center mt-6">
          <a
            href="/"
            className="text-sm transition-colors"
            style={{ color: 'rgba(212,201,184,0.4)' }}
          >
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
