/* =================================================================
   Infra Core — main.js
   Mobile nav (focus-trap + inert), sticky-header shadow,
   scroll reveal, form submit/validation, footer year.
   ================================================================= */
(function () {
  "use strict";

  var doc = document;
  var MOBILE = 1024; // matches CSS nav drawer breakpoint

  var isEN = function () {
    try { if (localStorage.getItem("infracore-lang") === "en") return true; } catch (e) {}
    return doc.documentElement.getAttribute("data-lang") === "en";
  };

  /* ---------- Footer year ---------- */
  var yearEl = doc.getElementById("year");
  if (yearEl) {
    var y = new Date().getFullYear();
    if (!isNaN(y)) yearEl.textContent = y;
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = doc.getElementById("navtoggle");
  var nav = doc.getElementById("nav");

  if (toggle && nav) {
    var scrim = doc.createElement("div");
    scrim.className = "nav-scrim";
    doc.body.appendChild(scrim);

    var navLinks = function () { return Array.prototype.slice.call(nav.querySelectorAll("a")); };

    var syncInert = function () {
      if (window.innerWidth <= MOBILE && !nav.classList.contains("is-open")) nav.setAttribute("inert", "");
      else nav.removeAttribute("inert");
    };

    var openNav = function () {
      nav.classList.add("is-open");
      scrim.classList.add("is-open");
      doc.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      nav.removeAttribute("inert");
      var first = navLinks()[0];
      if (first) first.focus();
    };
    var closeNav = function (returnFocus) {
      nav.classList.remove("is-open");
      scrim.classList.remove("is-open");
      doc.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      syncInert();
      if (returnFocus) toggle.focus();
    };

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeNav(true);
      else openNav();
    });
    scrim.addEventListener("click", function () { closeNav(false); });
    navLinks().forEach(function (a) { a.addEventListener("click", function () { closeNav(false); }); });

    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav(true);
    });

    // Trap Tab within the open drawer (mobile)
    nav.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !nav.classList.contains("is-open")) return;
      var items = navLinks();
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > MOBILE) closeNav(false);
      syncInert();
    });
    syncInert();
  }

  /* ---------- Sticky header shadow ---------- */
  var header = doc.getElementById("header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = doc.querySelectorAll(".reveal");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    // Safety net: anything already within the viewport after load gets revealed
    window.addEventListener("load", function () {
      setTimeout(function () {
        revealEls.forEach(function (el) {
          if (el.classList.contains("is-visible")) return;
          var r = el.getBoundingClientRect();
          if (r.top < (window.innerHeight || 0) && r.bottom > 0) el.classList.add("is-visible");
        });
      }, 300);
    });
  }

  /* ---------- Quote form (Web3Forms) ---------- */
  var form = doc.getElementById("quoteForm");
  var statusEl = doc.getElementById("formStatus");

  var MSG = {
    sending: { ka: "იგზავნება…", en: "Sending…" },
    ok: {
      ka: "მადლობა! თქვენი მოთხოვნა მიღებულია — დაგიკავშირდებით მალე.",
      en: "Thank you! Your request was received — we'll be in touch shortly."
    },
    err: {
      ka: "დაფიქსირდა შეცდომა. სცადეთ თავიდან ან დაგვირეკეთ.",
      en: "Something went wrong. Please try again or call us."
    },
    consent: {
      ka: "გთხოვთ, დაეთანხმოთ მონაცემთა დამუშავებას.",
      en: "Please agree to the processing of your data."
    },
    required: {
      ka: "გთხოვთ, შეავსოთ სავალდებულო ველები.",
      en: "Please fill in the required fields."
    },
    notconfigured: {
      ka: "ფორმა ჯერ არ არის კონფიგურირებული (იხ. README). სანაცვლოდ მოგვწერეთ: info@infracore-consulting.com",
      en: "The form is not configured yet (see README). In the meantime, email us: info@infracore-consulting.com"
    }
  };

  var t = function (obj) { return isEN() ? obj.en : obj.ka; };
  var setStatus = function (text, kind) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.classList.remove("is-ok", "is-err");
    if (kind) statusEl.classList.add(kind);
  };
  var clearInvalid = function () {
    form.querySelectorAll('[aria-invalid="true"]').forEach(function (el) {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    });
  };
  var markInvalid = function (el) {
    if (!el) return;
    el.setAttribute("aria-invalid", "true");
    el.setAttribute("aria-describedby", "formStatus");
    el.focus();
  };

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearInvalid();

      var consent = doc.getElementById("f-consent");
      var name = doc.getElementById("f-name");
      var phone = doc.getElementById("f-phone");

      if (name && !name.value.trim()) { setStatus(t(MSG.required), "is-err"); markInvalid(name); return; }
      if (phone && !phone.value.trim()) { setStatus(t(MSG.required), "is-err"); markInvalid(phone); return; }
      if (consent && !consent.checked) { setStatus(t(MSG.consent), "is-err"); markInvalid(consent); return; }

      var keyField = form.querySelector('[name="access_key"]');
      var accessKey = keyField ? keyField.value : "";
      if (!accessKey || accessKey.indexOf("YOUR_") === 0) {
        setStatus(t(MSG.notconfigured), "is-err");
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      setStatus(t(MSG.sending), null);

      var data = Object.fromEntries(new FormData(form).entries());

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.success) { setStatus(t(MSG.ok), "is-ok"); form.reset(); }
          else { setStatus(t(MSG.err), "is-err"); }
        })
        .catch(function () { setStatus(t(MSG.err), "is-err"); })
        .finally(function () { if (submitBtn) submitBtn.disabled = false; });
    });
  }
})();
