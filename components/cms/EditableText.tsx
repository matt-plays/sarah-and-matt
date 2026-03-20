'use client';

import { useCMS } from '@/context/CMSContext';
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface EditableTextProps {
  path: string;
  children: string;
  tag?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  /** Opens a textarea modal instead of inline editing — best for long body text. */
  multiline?: boolean;
}

export function EditableText({
  path,
  children,
  tag = 'span',
  className = '',
  style,
  multiline = false,
}: EditableTextProps) {
  const cms = useCMS();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const isActivelyEditing = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState(children);

  // Sync external content changes (e.g. after history revert)
  useEffect(() => {
    setModalValue(children);
    if (ref.current && !isActivelyEditing.current) {
      ref.current.textContent = children;
    }
  }, [children]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const El: any = tag;

  // ── View mode ────────────────────────────────────────────────────────────
  if (!cms?.isEditing) {
    return (
      <El className={className} style={style}>
        {children}
      </El>
    );
  }

  // ── Edit mode — multiline modal ──────────────────────────────────────────
  if (multiline) {
    return (
      <>
        <El
          className={`${className} cursor-pointer ring-1 ring-transparent hover:ring-blue-400/60 hover:ring-offset-1 rounded-sm transition-all`}
          style={style}
          onClick={() => { setModalValue(children); setShowModal(true); }}
          title={`Edit: ${path}`}
          data-cms-path={path}
        >
          {children}
        </El>

        {showModal && typeof document !== 'undefined' && createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 99999 }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <code className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{path}</code>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-700 text-2xl leading-none w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <textarea
                autoFocus
                value={modalValue}
                onChange={(e) => setModalValue(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-900 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
              />
              <div className="flex gap-3 mt-4 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { cms.updateField(path, modalValue); setShowModal(false); }}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg font-medium transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }

  // ── Edit mode — inline contenteditable ──────────────────────────────────
  return (
    <El
      ref={ref}
      className={`${className} outline-none hover:ring-2 hover:ring-blue-400/60 focus:ring-2 focus:ring-blue-500 rounded-sm px-0.5 -mx-0.5 transition-shadow`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{ __html: children }}
      data-cms-path={path}
      onFocus={() => { isActivelyEditing.current = true; }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter') e.preventDefault();
        if (e.key === 'Escape') (e.target as HTMLElement).blur();
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        isActivelyEditing.current = false;
        cms.updateField(path, e.currentTarget.textContent ?? '');
      }}
    />
  );
}
