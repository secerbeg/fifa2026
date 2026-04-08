// Background service worker — passive capture with metadata-driven section discovery/loading

function emptyGame() {
  return { match: null, seats: {}, availability: null, productId: null };
}

let dataUpdatedTimer = null;
const sectionTimers = new Map();

function notifyDataUpdated() {
  clearTimeout(dataUpdatedTimer);
  dataUpdatedTimer = setTimeout(() => {
    chrome.runtime.sendMessage({ type: "DATA_UPDATED" }).catch(() => {});
  }, 300);
}

function getStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, (data) => resolve(data || {}));
  });
}

function setStorage(obj) {
  return new Promise((resolve) => chrome.storage.local.set(obj, resolve));
}

function normalizeSectionLabel(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function looksLikeSectionLabel(value) {
  const s = normalizeSectionLabel(value);
  if (!s || s.length > 60) return false;
  return /[0-9]/.test(s) || /(block|section|sec|tribune|stand|sector|zona)/i.test(s);
}

function uniqueLabels(values) {
  const out = [];
  const seen = new Set();
  for (const value of values || []) {
    const label = normalizeSectionLabel(value);
    if (!label) continue;
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(label);
  }
  return out;
}

function extractParam(url, param) {
  try {
    const u = new URL(url, "https://dummy.local");
    return u.searchParams.get(param);
  } catch {
    const match = String(url || "").match(new RegExp(`[?&]${param}=([^&]+)`));
    return match ? decodeURIComponent(match[1]) : null;
  }
}

async function ensureGame(perfId) {
  const data = await getStorage();
  const games = data.games || {};
  if (!games[perfId]) games[perfId] = emptyGame();
  return { data, games };
}

async function setActiveGame(perfId) {
  const data = await getStorage();
  if (data.activeGame !== perfId) {
    await setStorage({ activeGame: perfId });
  }
}

function emptyLoaderState() {
  return {
    discovered: [],
    loaded: [],
    attempted: [],
    pending: null,
    lastResponseAt: null
  };
}

async function getLoaderState(perfId) {
  const data = await getStorage();
  return (data.sectionLoader || {})[perfId] || emptyLoaderState();
}

async function setLoaderState(perfId, state) {
  const data = await getStorage();
  const all = data.sectionLoader || {};
  all[perfId] = state;
  await setStorage({ sectionLoader: all });
}

async function mergeDiscoveredSections(perfId, labels) {
  if (!perfId || !labels?.length) return;
  const state = await getLoaderState(perfId);
  state.discovered = uniqueLabels([...(state.discovered || []), ...labels]);
  await setLoaderState(perfId, state);
}

function extractFeatureLabels(features) {
  const labels = [];
  for (const f of features || []) {
    const p = f?.properties;
    if (!p) continue;
    const block = p.block?.name?.en || p.block?.name || "";
    const area = p.area?.name?.en || p.area?.name || "";
    if (looksLikeSectionLabel(block)) labels.push(block);
    if (looksLikeSectionLabel(area)) labels.push(area);
  }
  return uniqueLabels(labels);
}

function extractSectionsFromBody(body) {
  const found = [];
  const seen = new Set();

  function add(value) {
    const label = normalizeSectionLabel(value);
    if (!looksLikeSectionLabel(label)) return;
    const key = label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    found.push(label);
  }

  function walk(node, depth = 0) {
    if (depth > 6 || node == null) return;
    if (typeof node === "string" || typeof node === "number") {
      add(String(node));
      return;
    }
    if (Array.isArray(node)) {
      for (const item of node.slice(0, 500)) walk(item, depth + 1);
      return;
    }
    if (typeof node === "object") {
      const directCandidates = [
        node.block, node.section, node.area, node.zone, node.label, node.name,
        node.blockName, node.sectionName, node.areaName, node.zoneName
      ];
      for (const value of directCandidates) {
        if (typeof value === "object") {
          add(value?.en || value?.label || value?.name || "");
        } else {
          add(value);
        }
      }
      for (const [key, value] of Object.entries(node)) {
        if (/(block|section|area|zone|name|label)/i.test(key)) {
          if (typeof value === "object") {
            add(value?.en || value?.label || value?.name || "");
          } else {
            add(value);
          }
        }
      }
      for (const value of Object.values(node).slice(0, 200)) walk(value, depth + 1);
    }
  }

  walk(body, 0);
  return found;
}

async function saveMatchInfo(product) {
  const perfId = String(product?.performanceId || product?.performanceID || "");
  if (!perfId) return;

  const { games } = await ensureGame(perfId);
  games[perfId].match = {
    name: product?.name || "FIFA Match",
    date: product?.date || "",
    currency: product?.currency || "USD",
    performanceId: perfId,
    imgUrl: product?.imgUrl || ""
  };

  await setStorage({ games, activeGame: perfId });
}

async function saveAvailability(perfId, body) {
  if (!perfId) return;
  const { games } = await ensureGame(perfId);

  games[perfId].availability = {
    categories: (body.priceRangeCategories || []).map((c) => ({
      id: c.id,
      name: c.name?.en || c.name || "Unknown",
      rank: c.rank,
      minPrice: c.minPrice,
      maxPrice: c.maxPrice,
      bgColor: c.bgColor,
      textColor: c.textColor
    })),
    globalMin: body.seatMapPriceRanges?.min ?? null,
    globalMax: body.seatMapPriceRanges?.max ?? null
  };

  await setStorage({ games, activeGame: perfId });
}

async function saveSeats(perfId, features) {
  if (!perfId) return;
  const { games } = await ensureGame(perfId);
  const seats = games[perfId].seats || {};

  for (const f of features || []) {
    const p = f?.properties;
    if (!p) continue;

    const seatId = String(p.id ?? `${p.block?.name?.en || p.block?.name || ""}-${p.row || ""}-${p.number || ""}`);
    seats[seatId] = {
      block: p.block?.name?.en || p.block?.name || "",
      area: p.area?.name?.en || p.area?.name || "",
      row: p.row || "",
      seat: p.number || "",
      category: p.seatCategory || p.seatCategoryName || "Unknown",
      categoryId: p.seatCategoryId,
      price: p.amount,
      color: p.color || "",
      exclusive: p.exclusive
    };
  }

  games[perfId].seats = seats;
  await setStorage({ games, activeGame: perfId });
}

async function saveProductId(perfId, productId) {
  if (!perfId || !productId) return;
  const { games } = await ensureGame(perfId);
  games[perfId].productId = productId;
  await setStorage({ games });
}

async function markSectionLoadStarted(perfId, label, token) {
  const state = await getLoaderState(perfId);
  const attempted = new Set(state.attempted || []);
  attempted.add(label);
  state.attempted = [...attempted];
  state.pending = {
    label,
    token,
    startedAt: Date.now(),
    responseCount: 0,
    observedSections: [],
    done: false
  };
  await setLoaderState(perfId, state);
}

async function finalizePendingSection(perfId) {
  const state = await getLoaderState(perfId);
  if (!state.pending) return;

  const loaded = new Set(state.loaded || []);
  const discovered = new Set(state.discovered || []);
  const pending = state.pending;

  if (pending.responseCount > 0) {
    loaded.add(pending.label);
    for (const section of pending.observedSections || []) {
      discovered.add(section);
      loaded.add(section);
    }
  }

  state.loaded = [...loaded];
  state.discovered = [...discovered];
  state.pending = null;
  state.lastResponseAt = Date.now();
  await setLoaderState(perfId, state);
  notifyDataUpdated();
}

function scheduleFinalizePending(perfId) {
  const key = String(perfId);
  if (sectionTimers.has(key)) clearTimeout(sectionTimers.get(key));
  const timer = setTimeout(() => {
    finalizePendingSection(key).catch(() => {});
    sectionTimers.delete(key);
  }, 1400);
  sectionTimers.set(key, timer);
}

async function processApiResponse(url, body) {
  if (!body || !url) return;
  const urlStr = String(url);

  if (urlStr.includes("google-ecommerce-detail") && body.ecommerceViewProduct) {
    await saveMatchInfo(body.ecommerceViewProduct);
  }

  const perfIdAny = extractParam(urlStr, "perfId") || extractParam(urlStr, "performanceId");
  if (perfIdAny) {
    const discoveredFromPayload = extractSectionsFromBody(body);
    if (discoveredFromPayload.length) await mergeDiscoveredSections(perfIdAny, discoveredFromPayload);
  }

  if (urlStr.includes("seatmap/availability") && body.priceRangeCategories) {
    const perfId = extractParam(urlStr, "perfId") || extractParam(urlStr, "performanceId");
    if (perfId) await saveAvailability(perfId, body);
  }

  if (urlStr.includes("seats/free") && body.features) {
    const perfId = extractParam(urlStr, "performanceId") || extractParam(urlStr, "perfId");
    const prodId = extractParam(urlStr, "productId");
    if (perfId) {
      await saveSeats(perfId, body.features);
      await setActiveGame(perfId);
      if (prodId) await saveProductId(perfId, prodId);

      const observedSections = extractFeatureLabels(body.features);
      if (observedSections.length) await mergeDiscoveredSections(perfId, observedSections);

      const state = await getLoaderState(perfId);
      if (state.pending) {
        state.pending.responseCount = (state.pending.responseCount || 0) + 1;
        state.pending.observedSections = uniqueLabels([...(state.pending.observedSections || []), ...observedSections]);
        state.lastResponseAt = Date.now();
        await setLoaderState(perfId, state);
        scheduleFinalizePending(perfId);
      }
    }
  }

  if (urlStr.includes("seatmap/config")) {
    const perfId = extractParam(urlStr, "performanceId") || extractParam(urlStr, "perfId");
    const prodId = extractParam(urlStr, "productId");
    if (perfId) await setActiveGame(perfId);
    if (perfId && prodId) await saveProductId(perfId, prodId);
  }

  notifyDataUpdated();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "API_RESPONSE") {
    processApiResponse(message.url, message.body);
    return;
  }

  if (message.type === "CLEAR_DATA") {
    chrome.storage.local.clear(() => {
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message.type === "START_SCAN") {
    notifyDataUpdated();
    return;
  }

  if (message.type === "SECTION_LOAD_REQUEST") {
    markSectionLoadStarted(message.performanceId, message.label, message.token).then(() => {
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message.type === "GET_SECTION_LOADER_STATE") {
    getLoaderState(message.performanceId).then((state) => sendResponse(state));
    return true;
  }

  if (message.type === "SCAN_PROGRESS") {
    chrome.runtime.sendMessage({
      type: "SCAN_PROGRESS",
      completed: message.completed,
      total: message.total,
      status: message.status,
      eta: message.eta
    }).catch(() => {});
    return;
  }
});
