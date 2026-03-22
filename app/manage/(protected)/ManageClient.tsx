'use client';

import { useState, useCallback } from 'react';
import { SiteContent, HistorySnapshot } from '@/types/content';
import { CMSProvider } from '@/context/CMSContext';
import { CMSToolbar } from '@/components/cms/CMSToolbar';
import { HistoryPanel } from '@/components/cms/HistoryPanel';
import Hero from '@/components/Hero';
import StorySection from '@/components/StorySection';
import PhotoGrid from '@/components/PhotoGrid';
import MarqueeText from '@/components/MarqueeText';
import CelebrationSection from '@/components/CelebrationSection';
import TravelHeader from '@/components/TravelHeader';
import TravelSubSection from '@/components/TravelSubSection';
import RSVPSection from '@/components/RSVPSection';
import RegistrySection from '@/components/RegistrySection';
import SiteFooter from '@/components/SiteFooter';

interface ManageClientProps {
  initialContent: SiteContent;
  initialHistory: HistorySnapshot[];
}

// ─── Utility: update a nested field by dot-path ────────────────────────────
// Handles paths like "hero.name1Full", "story.0.body", "celebration.events.1.time"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setNestedField<T>(obj: T, path: string, value: string): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = structuredClone(obj) as any;
  const keys = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cursor: any = result;
  for (let i = 0; i < keys.length - 1; i++) {
    cursor = cursor[keys[i]];
  }
  cursor[keys[keys.length - 1]] = value;
  return result;
}

export default function ManageClient({ initialContent, initialHistory }: ManageClientProps) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [history, setHistory] = useState<HistorySnapshot[]>(initialHistory);
  const [showHistory, setShowHistory] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedLabel, setSavedLabel] = useState<string | null>(null);

  const updateField = useCallback((path: string, value: string) => {
    setContent((prev) => setNestedField(prev, path, value));
    setIsDirty(true);
  }, []);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, label: 'Manual save' }),
      });
      if (res.ok) {
        const { history: newHistory } = await res.json();
        setHistory(newHistory);
        setIsDirty(false);
        setSavedLabel('✓ Saved');
        setTimeout(() => setSavedLabel(null), 3000);
      } else {
        alert('Save failed. Check console for details.');
      }
    } catch (e) {
      console.error('Save error:', e);
      alert('Save failed. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  }, [content]);

  const revertTo = useCallback((snapshot: HistorySnapshot) => {
    if (!confirm(`Restore to "${snapshot.label}"? You'll need to save afterward.`)) return;
    setContent(snapshot.content);
    setIsDirty(true);
    setShowHistory(false);
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    window.location.href = '/manage/login';
  }, []);

  return (
    <CMSProvider content={content} updateField={updateField}>
      {/* ── CMS Toolbar ─────────────────────────────────── */}
      <CMSToolbar
        isDirty={isDirty}
        isSaving={isSaving}
        savedLabel={savedLabel}
        onSave={save}
        onToggleHistory={() => setShowHistory((v) => !v)}
      />

      {/* Logout button — tucked in toolbar area */}
      <button
        onClick={logout}
        className="fixed z-[9001] text-xs transition-colors"
        style={{
          top: 14,
          left: 180,
          color: 'rgba(255,255,255,0.25)',
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.25)')}
      >
        Sign out
      </button>

      {/* ── History Panel ────────────────────────────────── */}
      <HistoryPanel
        isOpen={showHistory}
        history={history}
        onRevert={revertTo}
        onClose={() => setShowHistory(false)}
      />

      {/* ── Site (fully editable) ────────────────────────── */}
      <div style={{ paddingTop: 48 }}>
        {/* CMS hint banner */}
        <div
          className="sticky z-40 flex items-center justify-center gap-2 text-xs py-2"
          style={{
            top: 48,
            backgroundColor: 'rgba(59,130,246,0.12)',
            borderBottom: '1px solid rgba(59,130,246,0.2)',
            color: 'rgba(59,130,246,0.9)',
          }}
        >
          <span>✏</span>
          <span>
            <strong>Single-line fields:</strong> click and type inline.{' '}
            <strong>Multi-line / long text:</strong> click to open editor.
          </span>
        </div>

        <main>
          <Hero content={content.hero} />
          <StorySection cards={content.story} />
          <PhotoGrid />
          <MarqueeText text={content.marquee.text} />
          <CelebrationSection content={content.celebration} />
          <TravelHeader content={content.travel} />
          <TravelSubSection
            heading="Where to stay"
            cards={content.whereToStay}
            cmsArrayPath="whereToStay"
          />
          <TravelSubSection
            heading="Where to eat"
            cards={content.whereToEat}
            cmsArrayPath="whereToEat"
            decorativeImage="/images/food-pasta.jpg"
            decorativeImageAlt="Local Lancaster dining"
            decorativeStyle="photo"
          />
          <TravelSubSection
            heading="Activities"
            cards={content.activities}
            cmsArrayPath="activities"
            decorativeImage="/images/lancaster-sketch.jpg"
            decorativeImageAlt="Lancaster architecture illustration"
            decorativeStyle="sketch"
          />
          <RSVPSection />
          <RegistrySection />
          <SiteFooter />
        </main>
      </div>
    </CMSProvider>
  );
}
