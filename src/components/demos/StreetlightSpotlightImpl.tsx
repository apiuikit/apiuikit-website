"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AsyncAPI } from "apiuikit";
import { streetlight } from "@/data/examples";
import { useDemoTheme } from "./DemoThemeSync";

export default function StreetlightSpotlightImpl() {
  const theme = useDemoTheme();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(false);
  // Latches on first play and never resets. Unmounting the widget on close
  // would empty the card mid-exit-animation (the dialog stays painted for the
  // duration of its transition), and it makes reopening instant.
  const [hasPlayed, setHasPlayed] = useState(false);

  // "component" keeps operation side panels clipped to the widget, so in the
  // confined preview they can't escape the frame and in the dialog they can't
  // cover the close button.
  const config = { theme, sidePanel: { containment: "component" as const } };

  // The preview strips every floating control: the sidebar's scroll-spy spine,
  // the search toggle, and the Copy-as-Markdown menu. All three are fixed to
  // the viewport and follow the page scroll, so on a decorative crop that
  // can't be clicked they just drift around the card. The dialog keeps the
  // full config, where all of them are the point.
  const previewConfig = {
    ...config,
    show: { sidebar: false, search: false, copyMarkdown: false },
  };

  const play = useCallback(() => {
    setHasPlayed(true);
    setPlaying(true);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    // Let <dialog> run its own close sequence (focus restore, ::backdrop
    // teardown); the onClose handler below is what clears `playing`.
    dialogRef.current?.close();
  }, []);

  // showModal() blocks interaction with the page but not scrolling of it —
  // without this the background still scrolls under the dialog.
  useEffect(() => {
    if (!playing) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [playing]);

  return (
    <>
      {/* spotlight-settle: shrinks from 105% to natural size across the first
          360px of page scroll (globals.css). */}
      <div className="spotlight-settle relative h-[520px] overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface shadow-sm">
        {/* aria-hidden + pointer-events-none: this copy is scenery. It's
            cropped and non-interactive, and the real one lives in the dialog,
            so exposing it twice to assistive tech would just be noise.

            Unmounted while the dialog is open, not merely concealed. Both
            copies render the same document, so both carry the same element
            ids; the dialog's search resolves a hit with getElementById, which
            returns the first match in the document — this preview, since it
            precedes the dialog in the DOM. Searching in the popup would
            scroll and highlight the copy behind it instead. Concealing it with
            CSS wouldn't help: the ids would still be there to find. */}
        {!playing && (
          <div
            aria-hidden
            className="pointer-events-none h-full overflow-hidden"
          >
            {/* apiuikit's provider root pads 8px, and every Section adds mt-6
                including the first, so content starts ~32px down. A full-page
                host never notices; in a cropped preview it reads as an empty
                band above the content. Pull back the section margin and keep
                the root's 8px as breathing room. */}
            <div className="-mt-6">
              <AsyncAPI asyncapi={streetlight} config={previewConfig} />
            </div>
          </div>
        )}

        {/* Fades the hard crop at the bottom edge into the card. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-chrome-surface via-chrome-surface/80 to-transparent"
        />

        <button
          type="button"
          onClick={play}
          aria-label="Play the full Streetlights API documentation"
          className="group absolute inset-0 grid cursor-pointer place-items-center bg-chrome-bg/40 backdrop-blur-sm transition-colors hover:bg-chrome-bg/50"
        >
          <span className="flex flex-col items-center gap-3">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 shadow-lg transition-transform duration-200 ease-out group-hover:scale-110 group-active:scale-95"
              style={{ color: "#ffffff" }}
            >
              {/* Nudged right by 2px: a triangle's visual centre sits left of
                  its bounding box, so a centred one looks off-centre. */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="ml-0.5 h-6 w-6"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="rounded-full bg-chrome-surface px-3 py-1 text-xs font-medium text-ink shadow-sm">
              Open the full documentation
            </span>
          </span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setPlaying(false)}
        // spotlight-dialog carries the open/close transition — see globals.css.
        className="spotlight-dialog m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/60"
      >
        {/* Click-outside: only fires when the padding around the card is hit,
            not when a click bubbles up from inside it. */}
        <div
          className="flex h-full items-center justify-center p-5 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          {/* Wide enough that the widget lays out like a real docs page, but
              the padding above keeps a band of backdrop visible on every side
              so it still reads as a floating panel rather than a navigation. */}
          <div className="flex h-full max-h-[90vh] w-full max-w-[96rem] flex-col overflow-hidden rounded-xl border border-chrome-border bg-chrome-surface shadow-2xl">
            {/* Mock browser chrome. Everything but the close button is
                decorative and aria-hidden — the URL is set dressing to sell
                "this is a whole docs site", not a link and not a real host. */}
            <div className="flex shrink-0 items-center gap-3 border-b border-chrome-border bg-chrome-bg px-4 py-2.5">
              <span aria-hidden className="flex shrink-0 items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>

              <span
                aria-hidden
                className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md border border-chrome-border bg-chrome-surface px-3 py-1.5 font-mono text-xs text-ink-faint"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="7" width="10" height="6.5" rx="1.5" />
                  <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
                </svg>
                <span className="truncate">
                  streetlights.apiuikit.com/docs
                </span>
              </span>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="shrink-0 rounded-lg px-2 py-1 text-sm text-ink-muted transition-colors hover:bg-chrome-surface hover:text-ink"
              >
                ✕
              </button>
            </div>
            {/* [&>*] puts the height and the scrolling on the widget's own
                root rather than on this wrapper. The side panel is a fixed
                overlay sized from that root's bounding rect, so if the root
                keeps its natural content height the overlay is measured from
                a box that runs up behind the chrome bar and down past the
                card, leaving undimmed strips where they meet. */}
            <div className="min-h-0 flex-1 [&>*]:h-full [&>*]:overflow-auto">
              {/* Not mounted until the first play, so the page isn't carrying
                  two full parsed documents before anyone clicks anything. */}
              {hasPlayed && <AsyncAPI asyncapi={streetlight} config={config} />}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
