"use client";

import { useRef, useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { EMAIL, WEB3_KEY } from "@/lib/site";

type Status = { text: string; kind: "" | "ok" | "err" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Quote-request form. Validates required fields + email format, posts to Web3Forms. */
export function ContactForm() {
  const { t } = useLang();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>({ text: "", kind: "" });
  const [sending, setSending] = useState(false);

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
    if (!WEB3_KEY) {
      setStatus({ text: t.form.notConfigured, kind: "err" });
      return;
    }

    setSending(true);
    setStatus({ text: t.form.sending, kind: "" });
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3_KEY,
        subject: "New request / ახალი მოთხოვნა — Infra Core",
        from_name: "Infra Core Website",
        ...data,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res && res.success) {
          setStatus({ text: t.form.ok, kind: "ok" });
          form.reset();
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
          <input id="f-name" name="name" type="text" required aria-required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="f-company">{t.form.company}</label>
          <input id="f-company" name="company" type="text" autoComplete="organization" />
        </div>
      </div>
      <div className="qform__row">
        <div className="field">
          <label htmlFor="f-phone">{t.form.phone}</label>
          <input id="f-phone" name="phone" type="tel" required aria-required autoComplete="tel" inputMode="tel" placeholder="+995 5XX XX XX XX" />
        </div>
        <div className="field">
          <label htmlFor="f-email">{t.form.email}</label>
          <input id="f-email" name="email" type="email" autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-sector">{t.form.sector}</label>
        <input id="f-sector" name="sector" type="text" placeholder={t.form.sectorPh} />
      </div>
      <div className="field">
        <label htmlFor="f-message">{t.form.message}</label>
        <textarea id="f-message" name="message" rows={4} placeholder={t.form.messagePh} />
      </div>
      <label className="consent">
        <input type="checkbox" id="f-consent" name="consent" value="yes" required aria-required />
        <span>{t.form.consent}</span>
      </label>
      <button type="submit" className="btn btn--primary btn--lg qform__submit" disabled={sending}>{t.form.submit}</button>
      <p className={`qform__status${status.kind ? ` is-${status.kind}` : ""}`} id="formStatus" role="alert" aria-live="assertive">{status.text}</p>
    </form>
  );
}
