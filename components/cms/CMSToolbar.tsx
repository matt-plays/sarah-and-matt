'use client';

interface CMSToolbarProps {
  isDirty: boolean;
  isSaving: boolean;
  savedLabel: string | null;
  onSave: () => void;
  onToggleHistory: () => void;
}

export function CMSToolbar({
  isDirty,
  isSaving,
  savedLabel,
  onSave,
  onToggleHistory,
}: CMSToolbarProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-5 select-none"
      style={{
        height: 48,
        backgroundColor: '#111',
        zIndex: 9000,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-2.5">
        <span style={{ fontSize: 15 }}>✏️</span>
        <span className="text-white font-medium" style={{ fontSize: 13 }}>
          Manage Mode
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 11,
          }}
        >
          sarahandmatt.wedding
        </span>
      </div>

      {/* Center — status */}
      <div style={{ fontSize: 12 }}>
        {isSaving ? (
          <span style={{ color: '#fbbf24' }}>Saving…</span>
        ) : savedLabel ? (
          <span style={{ color: '#4ade80' }}>{savedLabel}</span>
        ) : isDirty ? (
          <span style={{ color: '#fb923c' }}>● Unsaved changes</span>
        ) : (
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>All changes saved</span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleHistory}
          className="transition-colors"
          style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)')
          }
        >
          History
        </button>

        <button
          onClick={onSave}
          disabled={isSaving || !isDirty}
          className="rounded-md font-medium transition-colors disabled:opacity-40"
          style={{
            backgroundColor: '#3b82f6',
            color: '#fff',
            fontSize: 13,
            padding: '5px 16px',
          }}
          onMouseEnter={(e) => {
            if (!isSaving && isDirty)
              (e.target as HTMLElement).style.backgroundColor = '#2563eb';
          }}
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = '#3b82f6')
          }
        >
          Save
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)')
          }
        >
          View Site ↗
        </a>
      </div>
    </div>
  );
}
