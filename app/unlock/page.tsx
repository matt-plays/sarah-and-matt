'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function UnlockForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') ?? '/';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/site-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(from);
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/images/engagement-wide.jpg')",
          filter: 'blur(18px)',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(15, 12, 8, 0.55)' }} />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-6 px-10 py-12 rounded-2xl"
        style={{
          backgroundColor: 'rgba(255, 253, 248, 0.08)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 253, 248, 0.15)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
        }}
      >
        {/* Monogram / title */}
        <p
          className="font-romie font-light italic text-center"
          style={{
            fontSize: 'clamp(36px, 8vw, 56px)',
            color: '#f5ede0',
            lineHeight: 1.1,
            marginBottom: '6px',
          }}
        >
          Sarah &amp; Matt
        </p>
        <p
          className="text-center mb-10"
          style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: '13px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245, 237, 224, 0.45)',
          }}
        >
          August 28, 2026
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: 'rgba(255, 253, 248, 0.12)',
                border: '1px solid rgba(255, 253, 248, 0.2)',
                color: '#f5ede0',
                fontFamily: 'var(--font-instrument)',
                caretColor: '#f5ede0',
              }}
            />
          </div>

          {error && (
            <p
              className="text-sm text-center"
              style={{ color: 'rgba(255, 140, 120, 0.9)', fontFamily: 'var(--font-instrument)' }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
            style={{
              backgroundColor: 'rgba(245, 237, 224, 0.92)',
              color: '#1a1510',
              fontFamily: 'var(--font-instrument)',
              letterSpacing: '0.04em',
            }}
          >
            {loading ? 'One moment…' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UnlockPage() {
  return (
    <Suspense>
      <UnlockForm />
    </Suspense>
  );
}
