"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE_URL } from "@/lib/seo";

// The production URL, not location.origin, so a link shared from a preview
// deploy or localhost still lands on the real site.
export const PLUGIN_SECTION_URL = `${SITE_URL}/#plugins`;

/**
 * Shares the homepage's plugin section: the native share sheet where there is
 * one (mostly phones), the clipboard everywhere else. `copied` flips true for
 * a couple of seconds after a clipboard copy so the caller can confirm it.
 */
export function useSharePluginLink(text: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const share = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text, url: PLUGIN_SECTION_URL });
        return;
      } catch (error) {
        // Dismissing the sheet is a choice, not a failure — don't follow it
        // with a surprise clipboard write.
        if ((error as DOMException).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(PLUGIN_SECTION_URL);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied permission): nothing
      // useful to fall back to, and the link is still in the address bar.
    }
  }, [text]);

  return { share, copied };
}
