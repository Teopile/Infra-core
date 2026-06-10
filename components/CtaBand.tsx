"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { displayText } from "@/lib/georgian";
import { WEB3_KEY } from "@/lib/site";

type Status = { text: string; kind: "" | "ok" | "err" };

/* The inline module only renders once the form backend is live — until
   then the band keeps its link-button, so the page never shows a lead
   form that cannot deliver. */
const FORM_ACTIVE = Boolean(WEB3_KEY);

/** Closing call-to-action: paper band between heavy ink rules. With the
 *  backend configured it becomes an every-page quote module (name +
 *  phone + consent), posting with the source path. */
export function CtaBand() {
  const { t, lang } = useLang();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>({ text: "", kind: "" });
  const [sending, setSending] = useState(false);

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
    data.append("access_key", WEB3_KEY);
    data.append("subject", `Quote request — ${pathname}`);
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
          setStatus({ text: t.form.ok, kind: "ok" });
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
                <input id="cta-name" name="name" type="text" required aria-required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="cta-phone">{t.form.phone}</label>
                <input id="cta-phone" name="phone" type="tel" required aria-required autoComplete="tel" inputMode="tel" />
              </div>
              <button type="submit" className="btn btn--primary" disabled={sending}>{t.form.submit}</button>
            </div>
            <label className="consent">
              <input type="checkbox" name="consent" value="yes" required aria-required />
              <span>{t.form.consent}</span>
            </label>
            <p className={`qform__status${status.kind ? ` is-${status.kind}` : ""}`} role="alert" aria-live="assertive">{status.text}</p>
          </form>
        ) : (
          <Link href="/contact" className="btn btn--primary btn--lg">{t.pages.cta.button}</Link>
        )}
      </div>
    </section>
  );
}
