/* Capsule Educational Institute — shared behaviour
   Header, footer, WhatsApp links, course rendering, lead capture. */
(function () {
  "use strict";
  var C = window.CAPSULE_CONFIG;
  var D = window.COURSES;
  var page = location.pathname.split("/").pop() || "index.html";

  function wa(text) {
    return "https://wa.me/" + C.whatsappNumber + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var ICON = {
    wa: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>'
  };

  var MARK = '<svg class="logo-mark" viewBox="-50 -26 100 54" aria-hidden="true"><path d="M0 -24 L48 0 L0 24 L-48 0 Z" fill="#0A2A5E"/><path d="M-22 7 C-22 7 -8 21 0 21 C8 21 22 7 22 7 L14 14 C7 19 -7 19 -14 14 Z" fill="#0A2A5E"/><line x1="22" y1="0" x2="22" y2="14" stroke="#0A2A5E" stroke-width="2" stroke-linecap="round"/><circle cx="22" cy="17" r="3.2" fill="#F26522"/></svg>';

  var NAV = [
    ["index.html", "Home"],
    ["about.html", "About Us"],
    ["courses.html", "Courses & University"],
    ["ai-courses.html", "AI Courses", "Soon"],
    ["founders.html", "Founders"],
    ["admission.html", "Admission Inquiry"]
  ];

  /* ---------- Header ---------- */
  function renderHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    var links = NAV.map(function (n) {
      var cur = page === n[0] || (page === "" && n[0] === "index.html");
      return '<a href="' + n[0] + '"' + (cur ? ' aria-current="page"' : "") + ">" + n[1] +
        (n[2] ? ' <span class="tag-soon">' + n[2] + "</span>" : "") + "</a>";
    }).join("");
    el.innerHTML =
      '<header class="site-header"><div class="container bar">' +
      '<a class="brand" href="index.html" aria-label="Capsule Educational Institute — home">' + MARK +
      '<span class="brand-text"><strong>Capsule</strong><em>Educational Institute</em></span></a>' +
      '<nav class="nav" id="nav" aria-label="Main">' + links + "</nav>" +
      '<a class="btn btn-wa btn-sm head-wa" href="' + wa("Hi Capsule, I'd like to know more about your programs.") + '" target="_blank" rel="noopener">' + ICON.wa + "<span>WhatsApp</span></a>" +
      '<button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span><span></span><span></span></button>' +
      "</div></header>";
    var btn = document.getElementById("menuBtn");
    var nav = document.getElementById("nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var social = "";
    if (C.instagramUrl) social += '<a class="social" href="' + esc(C.instagramUrl) + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.ig + "</a>";
    if (C.whatsappChannelUrl) social += '<a class="social" href="' + esc(C.whatsappChannelUrl) + '" target="_blank" rel="noopener" aria-label="WhatsApp Channel">' + ICON.wa + "</a>";
    var quick = NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + "</a></li>"; }).join("");
    el.innerHTML =
      '<footer class="site-footer"><div class="container foot-grid">' +
      '<div><div class="foot-brand">Capsule <span>Educational Institute</span></div>' +
      '<p class="foot-tag">Recognized degrees and career-focused learning, with counseling from first call to graduation.</p>' +
      (social ? '<div class="socials">' + social + "</div>" : "") + "</div>" +
      '<div><h3>Quick links</h3><ul class="foot-list">' + quick + "</ul></div>" +
      '<div><h3>Visit or contact us</h3><ul class="foot-list contact">' +
      '<li>' + ICON.pin + '<span>' + esc(C.address) + '<br><a href="' + esc(C.mapUrl) + '" target="_blank" rel="noopener">Open in Google Maps</a></span></li>' +
      '<li>' + ICON.phone + '<a href="tel:+' + C.whatsappNumber + '">' + esc(C.phoneDisplay) + "</a></li>" +
      '<li>' + ICON.wa + '<a href="' + wa("Hi Capsule, I have a question.") + '" target="_blank" rel="noopener">Chat on WhatsApp</a></li>' +
      (C.email ? '<li><span aria-hidden="true">✉</span><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>" : "") +
      "</ul></div></div>" +
      '<div class="container foot-base"><span>© ' + new Date().getFullYear() + " Capsule Educational Institute. All rights reserved.</span>" +
      "<span>Abu Dhabi, UAE</span></div></footer>" +
      '<a class="wa-float" href="' + wa("Hi Capsule, I'd like to know more about your programs.") + '" target="_blank" rel="noopener" aria-label="Chat with Capsule on WhatsApp">' + ICON.wa + "</a>";
  }

  /* ---------- Payments block ---------- */
  function renderPayments() {
    document.querySelectorAll("[data-payments]").forEach(function (el) {
      el.innerHTML =
        '<div class="pay">' +
        '<div class="pay-copy"><h2>Pay in a way that fits your budget</h2>' +
        "<p>Split your program fee into smaller payments. Ask our team which option suits your course.</p></div>" +
        '<ul class="pay-list">' +
        '<li><strong>Tabby</strong><span>Pay in instalments</span></li>' +
        '<li><strong>Tamara</strong><span>Pay in instalments</span></li>' +
        '<li><strong>EMI</strong><span>Monthly payment plans</span></li>' +
        "</ul>" +
        '<p class="pay-note">Availability, limits and terms are set by each provider and depend on approval.</p>' +
        "</div>";
    });
  }

  /* ---------- Courses ---------- */
  function feeCell(v) {
    return v ? esc(v) : '<span class="muted">Ask admissions</span>';
  }
  function feeTable(f) {
    return '<table class="fees"><caption>Fee structure</caption><tbody>' +
      "<tr><th scope=\"row\">Registration fee</th><td>" + feeCell(f.registration) + "</td></tr>" +
      "<tr><th scope=\"row\">Course fee</th><td>" + feeCell(f.course) + "</td></tr>" +
      "<tr><th scope=\"row\">Program fee</th><td>" + feeCell(f.program) + "</td></tr>" +
      '<tr class="total"><th scope="row">Total</th><td>' + feeCell(f.total) + "</td></tr></tbody></table>";
  }
  function courseMsg(c) {
    return "Hi, I'm interested in " + c.code + " (" + c.name + "). Please share more details.";
  }
  function renderCourses() {
    document.querySelectorAll("[data-courses]").forEach(function (box) {
      var key = box.getAttribute("data-courses");
      var list = D[key] || [];
      if (key === "short") {
        box.innerHTML = list.map(function (c) {
          return '<article class="short-card' + (c.placeholder ? " is-placeholder" : "") + '">' +
            '<span class="chip">' + esc(c.duration) + "</span>" +
            "<h3>" + esc(c.name) + "</h3><p>" + esc(c.description) + "</p>" +
            '<div class="short-foot"><span class="price">' + (c.fees ? esc(c.fees) : "Fee to be announced") + "</span>" +
            '<a class="btn btn-navy btn-sm" target="_blank" rel="noopener" href="' + wa("Hi, I'm interested in short courses at Capsule. Please share the list and fees.") + '">Enquire about this course</a></div></article>';
        }).join("");
        return;
      }
      box.innerHTML = list.map(function (c) {
        var specs = c.specs && c.specs.length
          ? '<div class="spec"><h4>Specializations</h4><ul class="chips">' + c.specs.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>" : "";
        return '<details class="course" id="' + c.id + '">' +
          '<summary><span class="course-code">' + esc(c.code) + '</span><span class="course-name">' + esc(c.name) + '</span><span class="course-dur">' + esc(c.duration) + "</span></summary>" +
          '<div class="course-body"><div class="course-info">' +
          '<div class="spec"><h4>Eligibility</h4><p>' + esc(c.eligibility) + "</p></div>" + specs +
          '<a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa(courseMsg(c)) + '">' + ICON.wa + "Enquire about this course</a></div>" +
          feeTable(c.fees) + "</div></details>";
      }).join("");
    });
    // open the course named in the URL hash
    if (location.hash) {
      var t = document.querySelector(location.hash);
      if (t && t.tagName === "DETAILS") { t.open = true; }
    }
  }

  /* ---------- Course dropdowns ---------- */
  function fillSelects() {
    document.querySelectorAll("select[data-course-select]").forEach(function (sel) {
      var html = '<option value="" disabled selected>Choose a program</option>';
      html += '<optgroup label="Undergraduate">' + D.ug.map(function (c) { return "<option>" + esc(c.code + " — " + c.name) + "</option>"; }).join("") + "</optgroup>";
      html += '<optgroup label="Postgraduate">' + D.pg.map(function (c) { return "<option>" + esc(c.code + " — " + c.name) + "</option>"; }).join("") + "</optgroup>";
      html += '<optgroup label="Other"><option>Short-term course</option><option>Not sure yet — I need guidance</option></optgroup>';
      sel.innerHTML = html;
      var pre = new URLSearchParams(location.search).get("course");
      if (pre) { for (var i = 0; i < sel.options.length; i++) { if (sel.options[i].text.indexOf(pre) === 0) { sel.selectedIndex = i; } } }
    });
  }

  /* ---------- Lead capture: Google Sheet + WhatsApp ---------- */
  function sendToSheet(payload) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 7000);
    return fetch(C.sheetUrl, {
      method: "POST",
      mode: "no-cors",              // Apps Script doesn't send CORS headers; the write still succeeds
      body: new URLSearchParams(payload),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function () { clearTimeout(timer); return true; })
      .catch(function () { clearTimeout(timer); return false; });
  }

  function initForms() {
    document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
      var status = form.querySelector(".form-status");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(form);
        if (fd.get("company_website")) { return; }               // honeypot: bots fill this
        var fixedCourse = form.getAttribute("data-course-fixed");
        var name = (fd.get("name") || "").toString().trim();
        var phone = (fd.get("phone") || "").toString().trim();
        var email = (fd.get("email") || "").toString().trim();
        var dob = (fd.get("dob") || "").toString();
        var nationality = (fd.get("nationality") || "").toString().trim();
        var course = fixedCourse || (fd.get("course") || "").toString();
        var message = (fd.get("message") || "").toString().trim();

        if (!name || !phone || !course) {
          status.className = "form-status err";
          status.textContent = "Please add your name, phone number and program.";
          return;
        }
        var stamp = new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" });
        var payload = {
          "Timestamp": stamp, "Full Name": name, "Phone Number": phone, "Email Address": email,
          "Date of Birth": dob, "Nationality": nationality, "Program / Course": course,
          // short aliases, in case the Apps Script reads these
          timestamp: stamp, name: name, phone: phone, email: email, dob: dob, nationality: nationality, course: course,
          message: message, source: page
        };

        var btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        status.className = "form-status";
        status.textContent = "Sending your details…";

        var text = form.getAttribute("data-wa-message") ||
          ("Hi Capsule, I'm " + name + ". I'm interested in " + course + "." +
            (nationality ? " Nationality: " + nationality + "." : "") +
            (message ? " " + message : "") + " My number: " + phone + ".");

        sendToSheet(payload).then(function () {
          var link = wa(text);
          status.className = "form-status ok";
          status.innerHTML = 'Thank you, ' + esc(name) + '. Opening WhatsApp… <a href="' + link + '">Tap here if it doesn\'t open</a>';
          form.reset();
          btn.disabled = false;
          setTimeout(function () { window.location.href = link; }, 700);
        });
      });
    });
  }

  /* ---------- Contact links that use config ---------- */
  function fillContacts() {
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = wa(a.getAttribute("data-wa"));
      a.target = "_blank"; a.rel = "noopener";
    });
    document.querySelectorAll("[data-phone]").forEach(function (a) { a.textContent = C.phoneDisplay; a.href = "tel:+" + C.whatsappNumber; });
    document.querySelectorAll("[data-address]").forEach(function (a) { a.textContent = C.address; });
    document.querySelectorAll("[data-map]").forEach(function (a) { a.href = C.mapUrl; a.target = "_blank"; a.rel = "noopener"; });
    document.querySelectorAll("[data-email]").forEach(function (a) {
      if (C.email) { a.textContent = C.email; a.href = "mailto:" + C.email; } else { a.closest("[data-email-wrap]") && (a.closest("[data-email-wrap]").hidden = true); }
    });
    document.querySelectorAll("[data-ig]").forEach(function (a) {
      if (C.instagramUrl) { a.href = C.instagramUrl; a.target = "_blank"; a.rel = "noopener"; } else { a.href = "#"; a.setAttribute("aria-disabled", "true"); a.classList.add("is-off"); }
    });
    document.querySelectorAll("[data-channel]").forEach(function (a) {
      if (C.whatsappChannelUrl) { a.href = C.whatsappChannelUrl; a.target = "_blank"; a.rel = "noopener"; } else { a.href = "#"; a.setAttribute("aria-disabled", "true"); a.classList.add("is-off"); }
    });
    document.querySelectorAll("[data-ig-count]").forEach(function (n) { if (C.instagramFollowers) { n.textContent = C.instagramFollowers; n.parentElement.hidden = false; } });
    document.querySelectorAll("[data-channel-count]").forEach(function (n) { if (C.channelMembers) { n.textContent = C.channelMembers; n.parentElement.hidden = false; } });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    renderPayments();
    renderCourses();
    fillSelects();
    fillContacts();
    initForms();
  });
})();
