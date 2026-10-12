"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { definePlugin } from "apiuikit/plugin";
import { useSharePluginLink } from "./useSharePluginLink";

// The canonical upload, via the no-cookie host so an untouched homepage sets
// nothing. Only requested once the button is pressed.
const VIDEO_SRC =
  "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0";

function ClickMeButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const { share, copied } = useSharePluginLink(
    "Found a red button on the apiuikit homepage. You should press it.",
  );

  const show = useCallback(() => {
    setOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Same reason as StreetlightSpotlightImpl: showModal() doesn't stop the page
  // scrolling underneath.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      {/* Inline colours rather than theme tokens on purpose: this button is
          meant to clash with the document around it. */}
      <button
        type="button"
        onClick={show}
        className="plugin-flash cursor-pointer rounded-md px-3 py-1.5 text-xs font-extrabold tracking-wide whitespace-nowrap"
        style={{ background: "#dc2626", color: "#ffffff" }}
      >
        CLICK ME !!
      </button>

      {/* showModal() lifts the dialog into the top layer, so it escapes the
          document's top bar and the card it sits in. */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Never gonna give you up"
        // Full-viewport and centred by the flex wrapper, as in
        // StreetlightSpotlightImpl: a margin-centred dialog lands top-left
        // under the site's CSS reset.
        className="spotlight-dialog m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/70"
      >
        {/* Click-outside: only the padding around the card closes it. */}
        <div
          className="flex h-full items-center justify-center p-5 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-chrome-border bg-chrome-bg px-4 py-2.5">
              <span className="text-sm font-medium text-ink">
                You asked for it.
              </span>
              <div className="flex shrink-0 items-center gap-1">
                {/* The moment someone wants to pass it on is right now. */}
                <button
                  type="button"
                  onClick={share}
                  className="cursor-pointer rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap"
                  style={{ background: "#dc2626", color: "#ffffff" }}
                >
                  <span aria-live="polite">
                    {copied ? "Link copied!" : "Rickroll a friend"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="rounded-lg px-2 py-1 text-sm text-ink-muted transition-colors hover:bg-chrome-surface hover:text-ink"
                >
                  ✕
                </button>
              </div>
            </div>
            {/* Mounted only while open, so closing the dialog stops the video. */}
            <div className="aspect-video bg-black">
              {open && (
                <iframe
                  src={VIDEO_SRC}
                  title="Rick Astley - Never Gonna Give You Up"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export const rickRollPlugin = definePlugin({
  name: "click-me",
  slots: {
    "openapi.document.topbar": ClickMeButton,
  },
});
