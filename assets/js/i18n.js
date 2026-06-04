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
    topbar_hours: "Mon–Fri 10:00–19:00",

    nav_products: "Products",
    nav_services: "Services",
    nav_why: "Why us",
    nav_vendors: "Brands",
    nav_process: "How we work",
    nav_contact: "Contact",
    cta_quote: "Request a quote",

    hero_eyebrow: "Complete IT solutions for business",
    hero_title: "Everything your office runs on — supplied, set up, and supported.",
    hero_sub: "Computers, networking, printers, Jabra headsets and software — delivered fast, installed by our engineers, and backed by an official warranty.",
    hero_cta1: "Request a quote",
    hero_cta2: "Browse products",
    trust_1: "Official warranty",
    trust_2: "Fast delivery",
    trust_3: "B2B invoicing / installments",

    herocard_label: "Office setup",
    hc_pc: "Workstations / Mini PC",
    hc_net: "Network · Wi-Fi · switches",
    hc_print: "Printers · peripherals",
    hc_lic: "Microsoft 365 · licensing",
    hc_audio: "Jabra headsets",
    hc_turnkey: "All in one place — turnkey delivery",

    what_title: "What we do",
    vp1_t: "One supplier for the whole office",
    vp1_d: "Hardware, networking, licensing and accessories — in one place, on one invoice.",
    vp2_t: "Engineers who actually install it",
    vp2_d: "We don't just sell — we install, configure and hand it over ready to work.",
    vp3_t: "Official warranty on everything",
    vp3_d: "Genuine products from authorized channels, with manufacturer warranty and local RMA.",
    vp4_t: "Fast quotes, faster delivery",
    vp4_d: "A real person who answers and sees the job through to the end.",

    prod_eyebrow: "Products",
    prod_title: "What we supply",
    prod_lead: "One shop for the whole office — leading brands, with official warranty.",
    p1_t: "Computers & Mini PCs",
    p1_d: "Workstations, Mini PCs, all-in-ones — Beelink, Dell, HP, Lenovo, ASUS.",
    p2_t: "Monitors & accessories",
    p2_d: "Monitors, docks, cables, mounts and peripherals.",
    p3_t: "Networking equipment",
    p3_d: "Switches, routers, Wi-Fi — Ubiquiti, MikroTik, Cisco, TP-Link.",
    p4_t: "Printers & office hardware",
    p4_d: "Printers, MFPs, scanners and consumables — HP, Canon, Epson.",
    p5_t: "Headsets & audio — Jabra",
    p5_d: "Office and call-center headsets, speakerphones and webcams.",
    p6_t: "Software & licensing",
    p6_d: "Microsoft 365, Windows, antivirus and subscription licensing — full compliance.",
    more: 'See more <em aria-hidden="true">→</em>',

    serv_eyebrow: "Services",
    serv_title: "More than just hardware",
    serv_lead: "We supply, set up and look after your IT — so you can focus on your business.",
    s1_t: "Official warranty & service",
    s1_d: "Warranty registration, RMA and repair/replacement — we manage the process, not you.",
    s2_t: "Delivery & deployment",
    s2_d: "Fast delivery, on-site installation and full office setup — turnkey.",
    s3_t: "Consultation & support",
    s3_d: "The right hardware for your needs, plus ongoing technical support.",
    s4_t: "IT infrastructure",
    s4_d: "Backups, network modernization and preventive maintenance — prevention is cheaper than recovery.",

    why_eyebrow: "Why Infra Core",
    why_title: "Why businesses choose us",
    pr1_t: "Official warranty",
    pr1_d: "Manufacturer's official warranty on every product — no unofficial (grey-market) import risk.",
    pr2_u: "h",
    pr2_t: "Response time",
    pr2_d: "A guaranteed response within 4 business hours. A real person, real time.",
    pr3_u: "days",
    pr3_t: "Delivery & install",
    pr3_d: "Delivery and installation in Tbilisi within 2 business days for in-stock products.",
    why_note: "A new company, led by engineers with years of experience in Georgian IT.",

    ven_eyebrow: "Brands",
    ven_title: "Leading brands we supply",
    ven_note: "All trademarks are the property of their respective owners. Brand names indicate products we supply.",

    proc_eyebrow: "How we work",
    proc_title: "From empty office to fully equipped — in three steps",
    st1_t: "Consultation",
    st1_d: "We learn your needs and budget, then recommend the right equipment.",
    st2_t: "Delivery & setup",
    st2_d: "We deliver, set up the network, and configure computers and licenses.",
    st3_t: "Warranty & support",
    st3_d: "We stay with you — with official warranty and ongoing technical support.",

    con_eyebrow: "Get in touch",
    con_title: "Tell us what your office needs",
    con_lead: "Fill in the form and get a quote — we'll get back to you within 4 business hours.",
    con_city: "Tbilisi, Georgia",
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
    ka: "Infra Core — კომპიუტერები, ქსელი, პრინტერები, Jabra ყურსასმენები და პროგრამული უზრუნველყოფა ბიზნესისთვის. სწრაფი მიწოდება, ჩვენი ინჟინრების მონტაჟი, ოფიციალური გარანტია.",
    en: "Infra Core — computers, networking, printers, Jabra headsets and software for business. Fast delivery, engineer install, official warranty."
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
