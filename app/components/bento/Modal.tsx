"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CloseIcon } from "../icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** id applied to the title element; also passed as aria-labelledby. */
  titleId: string;
  eyebrow?: string;
  icon?: ReactNode;
  children: ReactNode;
};

// Accessible, animated dialog. Portals to <body> so it escapes the bento cards'
// stacking/overflow contexts. Handles: focus move-in + Tab trap + focus restore,
// Esc-to-close, body scroll-lock, backdrop click, and reduced-motion.
export default function Modal({
  open,
  onClose,
  title,
  titleId,
  eyebrow,
  icon,
  children,
}: ModalProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // Move focus into the dialog once it has painted.
    const raf = requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      // Return focus to whatever opened the dialog (the bento card).
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center tab:items-center tab:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-[rgba(3,6,14,0.7)] backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="glass-strong gradient-border relative z-10 max-h-[90vh] w-full max-w-[42rem] overflow-y-auto rounded-t-3xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] tab:rounded-3xl"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }
            }
            animate={
              reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
            }
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* faint circuit texture top-right */}
            <div
              aria-hidden="true"
              className="dot-grid pointer-events-none absolute right-0 top-0 h-28 w-28 opacity-60 [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]"
            />

            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-white/3 px-6 py-5 backdrop-blur-md tab:px-8">
              <div>
                {eyebrow ? (
                  <p className="m-0 mb-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-strong">
                    {eyebrow}
                  </p>
                ) : null}
                <h2
                  id={titleId}
                  className="m-0 flex items-center gap-[0.6rem] text-[clamp(1.4rem,4vw,1.9rem)] font-bold"
                >
                  {icon ? (
                    <span className="title-icon" aria-hidden="true">
                      {icon}
                    </span>
                  ) : null}
                  {title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[1.15rem] text-fg transition hover:border-accent hover:text-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <CloseIcon />
              </button>
            </header>

            <div className="px-6 py-6 tab:px-8 tab:py-7">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
