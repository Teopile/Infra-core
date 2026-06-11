"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { Turnstile } from "./Turnstile";
import { displayText } from "@/lib/georgian";
import { TURNSTILE_CONFIGURED, TURNSTILE_SITE_KEY, WEB3_KEY } from "@/lib/site";

type Status = { text: string; kind: "" | "ok" | "err" };

/* The inline module only renders once the form backend is live — until
   then the band keeps its link-button, so the page never shows a lead
   form that cannot deliver. */
const FORM_ACTIVE = Boolean(WEB3_KEY);

/* Courtesy client-side throttle; real anti-automation is the server-validated
   Turnstile token when configured. Its own key so a send here does not throttle
   the dedicated /contact form. */
const COOLDOWN_MS = 20_000;
const COOLDOWN_KEY = "ic_cta_last";

/** Closing call-to-action: paper band between heavy ink rules. With the
 *  backend configured it becomes an every-page quote module (name +
 *  phone + consent), posting with the source path. */
export function CtaBand() {
  const { t, lang } = useLang();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>({ text: "", kind: "" });
  const [sending, setSending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const [widgetNonce, setWidgetNonce] = useState(0);

  const onVerify = useCallback((token: string) => setCaptchaToken(token), []);
  const onCaptchaError = useCallback(() => setCaptchaFailed(true), []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (!name || !phone) {
      setStatus({ text: t.form.required, kind: "err" });
      return;
    }
    if (!data.get("consent")) {
      setStatus({ text: t.form.consentErr, kind: "err" });
      return;
    }
    if (TURNSTILE_CONFIGURED && !captchaToken && !captchaFailed) {
      setStatus({ text: t.form.captchaErr, kind: "err" });
      return;
    }

    try {
      const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
      if (Date.now() - last < COOLDOWN_MS) {
        setStatus({ text: t.form.tooSoon, kind: "err" });
        return;
      }
    } catch {
      /* localStorage unavailable — skip the courtesy throttle. */
    }

    // set() (not append) so a future colliding field can't override control fields.
    data.set("access_key", WEB3_KEY);
    data.set("subject", `Quote request — ${pathname}`);
    if (TURNSTILE_CONFIGURED) data.set("cf-turnstile-response", captchaToken);
    setSending(true);
    setStatus({ text: t.form.sending, kind: "" });
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          form.reset();
          setCaptchaToken("");
          setWidgetNonce((n) => n + 1);
          setStatus({ text: t.form.ok, kind: "ok" });
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
    <section className="ctaband" aria-labelledby="cta-title">
      <div className="container ctaband__inner reveal">
        <div>
          <h2 id="cta-title" className="ctaband__title display">{displayText(lang, t.pages.cta.title)}</h2>
          <p className="ctaband__text">{t.pages.cta.text}</p>
        </div>
        {FORM_ACTIVE ? (
          <form className="ctaband__module" ref={formRef} onSubmit={onSubmit} noValidate>
            <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="ctaband__fields">
              <div className="field">
                <label htmlFor="cta-name">{t.form.name}</label>
                <input id="cta-name" name="name" type="text" required aria-required autoComplete="name" maxLength={200} />
              </div>
              <div className="field">
                <label htmlFor="cta-phone">{t.form.phone}</label>
                <input id="cta-phone" name="phone" type="tel" required aria-required autoComplete="tel" inputMode="tel" maxLength={30} />
              </div>
              <button type="submit" className="btn btn--primary" disabled={sending}>{t.form.submit}</button>
            </div>
            <label className="consent">
              <input type="checkbox" name="consent" value="yes" required aria-required />
              <span>{t.form.consent}</span>
            </label>
            {TURNSTILE_CONFIGURED ? (
              <Turnstile key={widgetNonce} siteKey={TURNSTILE_SITE_KEY} onVerify={onVerify} onError={onCaptchaError} className="ctaband__captcha" />
            ) : null}
            <p className={`qform__status${status.kind ? ` is-${status.kind}` : ""}`} role="alert" aria-live="assertive">{status.text}</p>
          </form>
        ) : (
          <Link href="/contact" className="btn btn--primary btn--lg">{t.pages.cta.button}</Link>
        )}
      </div>
    </section>
  );
}
