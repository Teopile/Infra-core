"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { Turnstile } from "./Turnstile";
import { TURNSTILE_CONFIGURED, TURNSTILE_SITE_KEY, WEB3_KEY } from "@/lib/site";

type Status = { text: string; kind: "" | "ok" | "err" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Client-side throttle: bounces accidental double-submits and casual flooding
   from one browser. Real anti-automation is the server-validated Turnstile
   token (when configured); this is only a courtesy guard. */
const COOLDOWN_MS = 20_000;
const COOLDOWN_KEY = "ic_quote_last";

/** Quote-request form. Validates required fields + email format, posts to Web3Forms. */
export function ContactForm() {
  const { t } = useLang();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>({ text: "", kind: "" });
  const [sending, setSending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  // Set when Turnstile can't load/render; lets submit fall back to honeypot-only.
  const [captchaFailed, setCaptchaFailed] = useState(false);
  // Bumping this remounts the Turnstile widget for a fresh challenge after a send.
  const [widgetNonce, setWidgetNonce] = useState(0);

  const onVerify = useCallback((token: string) => setCaptchaToken(token), []);
  const onCaptchaError = useCallback(() => setCaptchaFailed(true), []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    form.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    });

    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const mark = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.setAttribute("aria-invalid", "true");
        el.setAttribute("aria-describedby", "formStatus");
        (el as HTMLElement).focus();
      }
    };

    if (!String(data.name || "").trim()) {
      setStatus({ text: t.form.required, kind: "err" });
      mark("f-name");
      return;
    }
    if (!String(data.phone || "").trim()) {
      setStatus({ text: t.form.required, kind: "err" });
      mark("f-phone");
      return;
    }
    const email = String(data.email || "").trim();
    if (email && !EMAIL_RE.test(email)) {
      setStatus({ text: t.form.emailErr, kind: "err" });
      mark("f-email");
      return;
    }
    if (data.consent !== "yes") {
      setStatus({ text: t.form.consentErr, kind: "err" });
      mark("f-consent");
      return;
    }
    if (TURNSTILE_CONFIGURED && !captchaToken && !captchaFailed) {
      setStatus({ text: t.form.captchaErr, kind: "err" });
      return;
    }
    if (!WEB3_KEY) {
      setStatus({ text: t.form.notConfigured, kind: "err" });
      return;
    }

    try {
      const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
      if (Date.now() - last < COOLDOWN_MS) {
        setStatus({ text: t.form.tooSoon, kind: "err" });
        return;
      }
    } catch {
      /* localStorage unavailable (private mode) — skip the courtesy throttle. */
    }

    setSending(true);
    setStatus({ text: t.form.sending, kind: "" });
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      // Fixed control fields follow the spread so no form field can override them.
      body: JSON.stringify({
        ...data,
        ...(TURNSTILE_CONFIGURED ? { "cf-turnstile-response": captchaToken } : {}),
        access_key: WEB3_KEY,
        subject: "New request / ახალი მოთხოვნა — Infra Core",
        from_name: "Infra Core Website",
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res && res.success) {
          setStatus({ text: t.form.ok, kind: "ok" });
          form.reset();
          setCaptchaToken("");
          setWidgetNonce((n) => n + 1);
          // Stamp the cooldown only on a real send, so a failed attempt can retry.
          try {
            localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
          } catch {
            /* localStorage unavailable — courtesy throttle skipped. */
          }
        } else {
          setStatus({ text: t.form.err, kind: "err" });
        }
      })
      .catch(() => setStatus({ text: t.form.err, kind: "err" }))
      .finally(() => setSending(false));
  };

  return (
    <form className="qform reveal" id="quoteForm" ref={formRef} onSubmit={onSubmit} noValidate>
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="qform__row">
        <div className="field">
          <label htmlFor="f-name">{t.form.name}</label>
          <input id="f-name" name="name" type="text" required aria-required autoComplete="name" maxLength={200} />
        </div>
        <div className="field">
          <label htmlFor="f-company">{t.form.company}</label>
          <input id="f-company" name="company" type="text" autoComplete="organization" maxLength={200} />
        </div>
      </div>
      <div className="qform__row">
        <div className="field">
          <label htmlFor="f-phone">{t.form.phone}</label>
          <input id="f-phone" name="phone" type="tel" required aria-required autoComplete="tel" inputMode="tel" maxLength={30} placeholder="+995 5XX XX XX XX" />
        </div>
        <div className="field">
          <label htmlFor="f-email">{t.form.email}</label>
          <input id="f-email" name="email" type="email" autoComplete="email" maxLength={254} />
        </div>
      </div>
      <div className="qform__row">
        <div className="field">
          <label htmlFor="f-category">{t.form.category}</label>
          <select id="f-category" name="category" defaultValue="">
            <option value="">—</option>
            {t.products.items.map((it) => (
              <option value={it.t} key={it.t}>{it.t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-sector">{t.form.sector}</label>
          <input id="f-sector" name="sector" type="text" maxLength={200} placeholder={t.form.sectorPh} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-message">{t.form.message}</label>
        <textarea id="f-message" name="message" rows={4} maxLength={2000} placeholder={t.form.messagePh} />
      </div>
      <label className="consent">
        <input type="checkbox" id="f-consent" name="consent" value="yes" required aria-required />
        <span>{t.form.consent}</span>
      </label>
      {TURNSTILE_CONFIGURED ? (
        <Turnstile key={widgetNonce} siteKey={TURNSTILE_SITE_KEY} onVerify={onVerify} onError={onCaptchaError} className="qform__captcha" />
      ) : null}
      <button type="submit" className="btn btn--primary btn--lg qform__submit" disabled={sending}>{t.form.submit}</button>
      <p className={`qform__status${status.kind ? ` is-${status.kind}` : ""}`} id="formStatus" role="alert" aria-live="assertive">{status.text}</p>
    </form>
  );
}
