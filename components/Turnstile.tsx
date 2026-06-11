"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget for the quote forms. Loads the challenges script
 * once (idempotent across both forms and client-side navigations), renders
 * explicitly into a ref'd container, and reports the verification token via
 * `onVerify`. `response-field` is disabled so the token never lands in a hidden
 * input — the host form owns it and injects it into the payload deterministically.
 *
 * If the script can't load or the widget faults, `onError` fires so the host
 * form can fall back to its honeypot-only path instead of locking out submits.
 *
 * Render only when a site key is configured (see TURNSTILE_CONFIGURED); with no
 * key the forms keep their honeypot-only path.
 */

type TurnstileRenderOptions = {
  sitekey: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  "response-field"?: boolean;
  theme?: "auto" | "light" | "dark";
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileRenderOptions) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  /** Fired when the script can't load or the widget faults — host falls back. */
  onError?: () => void;
  className?: string;
}

export function Turnstile({ siteKey, onVerify, onError, className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  // Keep the latest callbacks without re-running the render effect each render.
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          "response-field": false,
          callback: (token) => onVerifyRef.current(token),
          // A hard widget fault (not mere expiry): let the form drop to honeypot.
          "error-callback": () => onErrorRef.current?.(),
          // Expiry auto-re-challenges; just drop the stale token.
          "expired-callback": () => onVerifyRef.current(""),
        });
      })
      .catch(() => {
        // CDN/script unreachable: signal the host to fall back to honeypot-only.
        if (!cancelled) onErrorRef.current?.();
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* widget already torn down */
        }
        widgetId.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} className={className} />;
}
