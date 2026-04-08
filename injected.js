// Runs in PAGE context — intercepts fetch/XHR responses
// and relays matching ones back to the content script via postMessage

(function () {
  if (window.__fifaTicketScoutLoaded) return;
  window.__fifaTicketScoutLoaded = true;
  console.log("[Take me to America] Injected script loaded successfully");
  const MATCH_PATTERNS = ["/seatmap/", "/performance/"];

  function shouldCapture(url) {
    return MATCH_PATTERNS.some((p) => url.includes(p));
  }

  // Capture headers from real requests so the scan can reuse them
  let capturedHeaders = null;

  // Patch fetch
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const url = typeof args[0] === "string" ? args[0] : args[0]?.url || "";

    // Capture headers from any seatmap request the page makes
    if (shouldCapture(url) && !capturedHeaders) {
      const init = args[1] || {};
      if (init.headers) {
        capturedHeaders = init.headers instanceof Headers
          ? Object.fromEntries(init.headers.entries())
          : { ...init.headers };
        console.log("[Take me to America] Captured request headers");
      }
    }

    const response = await originalFetch.apply(this, args);

    if (shouldCapture(url)) {
      try {
        const clone = response.clone();
        const body = await clone.json();
        window.postMessage(
          { type: "FIFA_TICKET_SCOUT", url, body },
          "*"
        );
      } catch {
        // not JSON or parse error
      }
    }

    return response;
  };

  // Patch XMLHttpRequest — also capture headers
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;
  const originalSetHeader = XMLHttpRequest.prototype.setRequestHeader;

  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this._ftsUrl = url;
    this._ftsHeaders = {};
    return originalOpen.call(this, method, url, ...rest);
  };

  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    if (this._ftsHeaders) {
      this._ftsHeaders[name] = value;
    }
    return originalSetHeader.call(this, name, value);
  };

  XMLHttpRequest.prototype.send = function (...args) {
    if (this._ftsUrl && shouldCapture(this._ftsUrl)) {
      // Capture headers from real XHR requests
      if (!capturedHeaders && this._ftsHeaders && Object.keys(this._ftsHeaders).length > 0) {
        capturedHeaders = { ...this._ftsHeaders };
        console.log("[Take me to America] Captured XHR headers");
      }

      this.addEventListener("load", function () {
        try {
          const body = JSON.parse(this.responseText);
          window.postMessage(
            { type: "FIFA_TICKET_SCOUT", url: this._ftsUrl, body },
            "*"
          );
        } catch {
          // not JSON
        }
      });
    }
    return originalSend.apply(this, args);
  };

  
  // Passive build: no synthetic scan requests.
  // We only capture real FIFA page fetch/XHR traffic.
})();
