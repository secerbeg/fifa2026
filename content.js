// Content script — bridges page context (injected.js) and extension (background.js)
// injected.js runs in MAIN world via manifest, no manual injection needed.

// Listen for messages from injected code
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data?.type === "FIFA_TICKET_SCOUT") {
    chrome.runtime.sendMessage({
      type: "API_RESPONSE",
      url: event.data.url,
      body: event.data.body,
    });
  }

  if (event.data?.type === "FIFA_TICKET_SCOUT_SCAN_PROGRESS") {
    chrome.runtime.sendMessage({
      type: "SCAN_PROGRESS",
      completed: event.data.completed,
      total: event.data.total,
      status: event.data.status,
      eta: event.data.eta,
    });
  }
});

// Passive build: support discovery/click helpers, ignore synthetic scan commands.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_SCAN") {
    sendResponse?.({ ok: true });
    return;
  }
  if (message.type === "DISCOVER_SECTIONS") {
    sendResponse?.({ sections: tmtaDiscoverSectionCandidates() });
    return true;
  }
  if (message.type === "CLICK_SECTION") {
    sendResponse?.(tmtaClickSection(message.label));
    return true;
  }
});


function tmtaNormalizeSectionLabel(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function tmtaDiscoverSectionCandidates() {
  const out = [];
  const seen = new Set();
  const selectors = [
    "[aria-label]",
    "button",
    "[role='button']",
    "[data-testid]",
    "svg [aria-label]",
    "text",
    "[data-section]",
    "[data-block]"
  ];

  document.querySelectorAll(selectors.join(",")).forEach((el) => {
    const raw = el.getAttribute?.("aria-label") || el.getAttribute?.("data-testid") || el.textContent || "";
    const label = tmtaNormalizeSectionLabel(raw);
    if (!label) return;
    if (label.length > 40) return;
    if (!(/[0-9]/.test(label) || /block|section|sec/i.test(label))) return;
    const key = label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, selectorText: key });
  });

  window.__tmtaSectionCandidates = out;
  return out.map((x) => x.label);
}

function tmtaClickSection(label) {
  const q = tmtaNormalizeSectionLabel(label).toLowerCase();
  const candidates = Array.from(document.querySelectorAll("[aria-label], button, [role='button'], [data-testid], text"));
  const match = candidates.filter((el) => !(el.tagName === "A" && el.href)).find((el) => {
    const raw = el.getAttribute?.("aria-label") || el.getAttribute?.("data-testid") || el.textContent || "";
    return tmtaNormalizeSectionLabel(raw).toLowerCase() === q;
  }) || candidates.filter((el) => !(el.tagName === "A" && el.href)).find((el) => {
    const raw = el.getAttribute?.("aria-label") || el.getAttribute?.("data-testid") || el.textContent || "";
    return tmtaNormalizeSectionLabel(raw).toLowerCase().includes(q);
  });

  if (!match) return { ok: false };

  try {
    match.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    match.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    match.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    if (match.tagName === "A" && match.href) return { ok: false };
    match.click?.();
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
