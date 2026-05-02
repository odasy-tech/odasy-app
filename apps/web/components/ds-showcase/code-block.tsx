'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export interface CodeBlockProps {
  /** Snippet body. */
  children: string;
  /** Filename or label shown in the strip above. */
  label?: string;
  /** Tag (e.g., 'tsx', 'css'). */
  language?: string;
}

/**
 * Editorial code block — corner-ticked frame, mono type, copy button.
 * Whitespace inside `children` is preserved as-is (use template literals).
 */
export function CodeBlock({ children, label, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* swallow */
    }
  }

  return (
    <div className="relative border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]">
      <span aria-hidden className="ds-corners pointer-events-none absolute inset-0">
        <span className="ds-corner tl" />
        <span className="ds-corner tr" />
        <span className="ds-corner bl" />
        <span className="ds-corner br" />
      </span>

      {/* strip */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] px-5 py-2.5">
        <div className="flex items-center gap-3">
          <span
            className="text-[9.5px] uppercase tracking-[0.42em] text-[var(--color-accent-action)]"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}
          >
            {language}
          </span>
          {label ? (
            <>
              <span className="h-3 w-px bg-[var(--color-border-default)]" aria-hidden />
              <span
                className="text-[11px] tracking-[0.05em] text-[var(--color-ink-secondary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {label}
              </span>
            </>
          ) : null}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.32em] text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-accent-action)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          aria-label={copied ? 'Copied' : 'Copy snippet'}
        >
          {copied ? <Check size={12} strokeWidth={2} /> : <Copy size={12} strokeWidth={1.7} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* code */}
      <pre
        className="overflow-x-auto px-5 py-4 text-[12.5px] leading-[1.65] text-[var(--color-ink-primary)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
