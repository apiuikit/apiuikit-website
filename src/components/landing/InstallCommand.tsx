"use client";

import { useEffect, useRef, useState } from "react";

const INSTALL_COMMAND = "npm install apiuikit";

/**
 * The whole row is the button, so clicking anywhere on the command copies it.
 */
export default function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
    } catch {
      // navigator.clipboard is undefined on insecure origins (a plain-HTTP LAN
      // preview, say). Leave the label at "Copy" rather than claiming success.
      return;
    }
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy "${INSTALL_COMMAND}" to the clipboard`}
      className="mx-auto flex w-full max-w-xs items-center gap-3 rounded-lg border border-chrome-border bg-chrome-surface px-4 py-3 text-left font-mono text-sm text-ink shadow-sm transition-colors hover:border-brand-300"
    >
      <span aria-hidden className="text-ink-faint">
        $
      </span>
      <span className="flex-1">{INSTALL_COMMAND}</span>
      {/* Fixed width so swapping the label doesn't reflow the command. */}
      <span
        aria-hidden
        className="w-12 shrink-0 text-right text-xs font-medium text-ink-faint"
      >
        {copied ? "Copied" : "Copy"}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
