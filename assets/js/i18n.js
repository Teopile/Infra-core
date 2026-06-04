/* =================================================================
   Infra Core — i18n.js
   Georgian-first (KA) with English (EN) toggle.
   KA text lives in index.html; EN translations live here, keyed by
   data-i18n / data-i18n-placeholder / data-i18n-aria attributes.
   ================================================================= */
(function () {
  "use strict";

  var EN = {
    skip: "Skip to main content",

    nav_products: "Products",
    nav_services: "Services",
    nav_why: "Why us",
    nav_vendors: "Brands",
    nav_process: "How we work",
    nav_contact: "Contact",
    cta_quote: "Request a quote",

    hero_eyebrow: "Complete IT solutions for business",
    hero_title: "Everything your office runs on — supplied, set up, and supported.",
    hero_sub: "Computers, networking, printers, Jabra headsets and software — with fast delivery, installation, and an official warranty.",
    hero_cta1: "Request a quote",
    hero_cta2: "Browse products",
    trust_1: "Official warranty",
    trust_2: "Fast delivery",
    trust_3: "Competitive pricing",

    herocard_label: "Office setup",
    hc_pc: "Workstations / Mini PC",
    hc_net: "Network · Wi-Fi · switches",
    hc_print: "Printers · peripherals",
    hc_lic: "Software · licensing",
    hc_audio: "Jabra headsets",
    hc_turnkey: "All in one place — turnkey delivery",

    what_title: "What we do",
    vp1_t: "One supplier for the whole office",
    vp1_d: "Hardware, networking, licensing and accessories — all in one place.",
    vp2_t: "Delivery & deployment",
    vp2_d: "Fast delivery and installation — full office setup, turnkey.",
    vp3_t: "Official warranty on everything",
    vp3_d: "Every piece of equipment comes with an official warranty.",
    vp4_t: "Professional consultation & support",
    vp4_d: "We help you make the right choice and stay by your side.",

    prod_eyebrow: "Products",
    prod_title: "What we supply",
    prod_lead: "Everything your office needs — in one place, with official warranty.",
    p1_t: "Computers & Mini PCs",
    p1_d: "PCs, Mini PCs, workstations and all-in-ones — including Beelink.",
    p2_t: "Monitors & accessories",
    p2_d: "Monitors and accessories for the office.",
    p3_t: "Networking equipment",
    p3_d: "Switches, routers and Wi-Fi solutions.",
    p4_t: "Printers & office hardware",
    p4_d: "Printers, MFPs, scanners and office hardware.",
    p5_t: "Headsets & audio — Jabra",
    p5_d: "Jabra headsets and other headphones for office and call-center.",
    p6_t: "Software & licensing",
    p6_d: "Software and licensing for business.",
    more: 'See more <em aria-hidden="true">→</em>',

    serv_eyebrow: "Services",
    serv_title: "More than just hardware",
    serv_lead: "We supply, set up and look after your IT — so you can focus on your business.",
    s1_t: "Official warranty",
    s1_d: "Official warranty on all equipment.",
    s2_t: "Delivery & deployment",
    s2_d: "Fast delivery, installation and full office setup — turnkey.",
    s3_t: "Consultation & support",
    s3_d: "Professional consultation to help you choose, plus technical support.",
    s4_t: "IT infrastructure",
    s4_d: "Backups, network modernization and preventive maintenance — prevention is cheaper than recovery.",

    why_eyebrow: "Why Infra Core",
    why_title: "Why businesses choose us",
    pr1_t: "One supplier for the whole office",
    pr1_d: "Hardware, networking, licensing and accessories — all in one place.",
    pr2_t: "Competitive pricing",
    pr2_d: "Cost-effective pricing — from a small team to an entire corporate office.",
    pr3_t: "End-to-end office setup",
    pr3_d: "From consultation to deployment and warranty — full service.",

    ven_eyebrow: "Brands",
    ven_title: "Brands we supply",
    ven_note: "All trademarks are the property of their respective owners. The full list of partner brands will be updated soon.",

    proc_eyebrow: "How we work",
    proc_title: "From empty office to fully equipped — in three steps",
    st1_t: "Consultation",
    st1_d: "We understand your needs and recommend the right equipment.",
    st2_t: "Delivery & setup",
    st2_d: "We deliver, set up the network, and configure computers and licenses.",
    st3_t: "Warranty & support",
    st3_d: "We stay with you — with official warranty and technical support.",

    con_eyebrow: "Get in touch",
    con_title: "Tell us what your office needs",
    con_lead: "Fill in the form and get a quote — we'll get back to you shortly.",
    con_city: "Georgia",
    f_name: "Name *",
    f_company: "Company",
    f_phone: "Phone *",
    f_email: "Email",
    f_sector: "Industry / sector",
    f_msg: "Message",
    f_consent: "I consent to the processing of my personal data in order to respond to this inquiry.",
    f_submit: "Get a quote",

    foot_tag: "One supplier for the whole office — hardware, networking, licensing and support.",
    foot_products: "Products",
    foot_services: "Services",
    foot_contact: "Contact",
    foot_p1: "Computers & Mini PCs",
    foot_p3: "Networking",
    foot_p4: "Printers",
    foot_p6: "Software & licensing",
    foot_s1: "Official warranty",
    foot_s2: "Delivery & deployment",
    foot_s3: "Consultation & support",
    foot_s4: "IT infrastructure",
    foot_rights: "All rights reserved.",
    foot_built: "Georgia · B2B IT solutions"
  };

  var EN_PH = {
    f_sector_ph: "e.g. legal, restaurant/food, retail, clinic…",
    f_msg_ph: "How many workstations? What do you need?"
  };

  var EN_ARIA = {
    float_tg: "Telegram — opens in a new tab",
    float_wa: "WhatsApp — opens in a new tab"
  };

  var TITLES = {
    ka: "Infra Core — სრული IT გადაწყვეტილებები თქვენი ოფისისთვის",
    en: "Infra Core — Complete IT solutions for your office"
  };

  var DESC = {
    ka: "Infra Core — კომპიუტერები, ქსელი, პრინტერები, Jabra ყურსასმენები და პროგრამული უზრუნველყოფა ბიზნესისთვის. სწრაფი მიწოდება, მონტაჟი, ოფიციალური გარანტია.",
    en: "Infra Core — computers, networking, printers, Jabra headsets and software for business. Fast delivery, installation, official warranty."
  };

  var STORE_KEY = "infracore-lang";
  var originals = new Map();

  function setMeta(sel, val) {
    var m = document.querySelector(sel);
    if (m) m.setAttribute("content", val);
  }

  function cacheOriginals() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      if (el.dataset.kaPh == null) el.dataset.kaPh = el.getAttribute("placeholder") || "";
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      if (el.dataset.kaAria == null) el.dataset.kaAria = el.getAttribute("aria-label") || "";
    });
  }

  function apply(lang) {
    if (lang !== "en") lang = "ka";
    cacheOriginals();

    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (lang === "en" && EN[k] != null) el.innerHTML = EN[k];
      else el.innerHTML = originals.get(el);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", lang === "en" && EN_PH[k] != null ? EN_PH[k] : el.dataset.kaPh);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      var v = lang === "en" && EN_ARIA[k] != null ? EN_ARIA[k] : el.dataset.kaAria;
      if (v) el.setAttribute("aria-label", v);
    });

    if (TITLES[lang]) {
      document.title = TITLES[lang];
      setMeta('meta[property="og:title"]', TITLES[lang]);
      setMeta('meta[name="twitter:title"]', TITLES[lang]);
    }
    if (DESC[lang]) {
      setMeta('meta[name="description"]', DESC[lang]);
      setMeta('meta[property="og:description"]', DESC[lang]);
      setMeta('meta[name="twitter:description"]', DESC[lang]);
    }

    document.querySelectorAll("[data-setlang]").forEach(function (b) {
      var on = b.getAttribute("data-setlang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  function init() {
    var saved = "ka";
    try { saved = localStorage.getItem(STORE_KEY) || "ka"; } catch (e) {}

    document.querySelectorAll("[data-setlang]").forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.getAttribute("data-setlang"));
      });
    });

    apply(saved);
  }

  window.InfraI18n = { apply: apply };

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
