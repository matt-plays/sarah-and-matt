'use client';

import { HistorySnapshot } from '@/types/content';

interface HistoryPanelProps {
  isOpen: boolean;
  history: HistorySnapshot[];
  onRevert: (snapshot: HistorySnapshot) => void;
  onClose: () => void;
}

export function HistoryPanel({ isOpen, history, onRevert, onClose }: HistoryPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 8998, backgroundColor: 'transparent' }}
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 flex flex-col"
        style={{
          width: 340,
          backgroundColor: '#1a1a1a',
          zIndex: 8999,
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s ease',
          paddingTop: 48,
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h3 className="text-white font-medium" style={{ fontSize: 14 }}>
            Save History
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors leading-none"
            style={{ fontSize: 20 }}
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1 py-2">
          {history.length === 0 ? (
            <p
              className="px-5 py-8 text-center"
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}
            >
              No history yet.
              <br />
              Save your first version to create a snapshot.
            </p>
          ) : (
            history.map((snapshot, i) => (
              <div
                key={snapshot.id}
                className="px-5 py-4"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  backgroundColor: i === 0 ? 'rgba(59,130,246,0.08)' : undefined,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="text-white font-medium truncate"
                      style={{ fontSize: 13 }}
                    >
                      {snapshot.label}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, marginTop: 3 }}>
                      {new Date(snapshot.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}{' '}
                      ·{' '}
                      {new Date(snapshot.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {i === 0 ? (
                    <span
                      className="rounded-full px-2 py-0.5 shrink-0"
                      style={{
                        backgroundColor: 'rgba(59,130,246,0.2)',
                        color: '#93c5fd',
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                      }}
                    >
                      CURRENT
                    </span>
                  ) : (
                    <button
                      onClick={() => onRevert(snapshot)}
                      className="shrink-0 transition-colors"
                      style={{ color: '#60a5fa', fontSize: 12 }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = '#93c5fd')
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = '#60a5fa')
                      }
                    >
                      Restore →
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div
          className="px-5 py-4"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.25)',
            fontSize: 11,
          }}
        >
          Last {history.length} save{history.length !== 1 ? 's' : ''} stored
        </div>
      </div>
    </>
  );
}
