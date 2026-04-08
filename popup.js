
let currentLang = "bs";

const I18N = {
  en: {
    live: "LIVE",
    emptyTitle: "Take me to America",
    emptyHint: "Open the FIFA resale ticket site and browse a seat map. This passive version captures only what FIFA loads on screen.",
    emptyScanningTitle: "No data yet",
    emptyScanningHint: "Click around sections on the FIFA seat map so the site loads seat prices. Then reopen or refresh the extension popup.",
    seatMapHint: "You’re on the FIFA ticket site — open a match seat map and click around sections so prices load.",
    loadingMatch: "Match data loading…",
    browseMatch: "Browse the seat map to capture match info",
    sectionFilter: "Section filter",
    seats: "Seats",
    cheapest: "Cheapest",
    priciest: "Priciest",
    bestSet: "Best 100s",
    highest: "Highest",
    average: "avg",
    all: "All",
    other: "Other",
    seatsTogether: "Seats together",
    groups: "groups",
    bestDeals: "Best Deals",
    noSeatsFound: "No seats found",
    singleSeat: "single seat",
    together: "together",
    block: "Block",
    row: "Row",
    area: "Area",
    min: "Min",
    max: "Max",
    blockBreakdown: "Block Breakdown",
    discoverSections: "Discover Sections",
    loadAll: "Load All Discovered",
    exportCsv: "Export CSV",
    clearData: "Clear Data",
    sectionLoaderTitle: "Section Loader",
    sectionLoaderSubtitle: "Discover sections from responses, then load them one by one",
    discoverResponsesFirst: "Discover from loaded data",
    loadingSection: "Loading section",
    done: "done",
    discoveredSections: "discovered sections",
    loadThisCategory: "Load this category",
    categoryCoverage: "Category coverage",
    overallCoverage: "Overall coverage",
    complete: "Complete",
    partial: "Partial",
    loading: "Loading",
    noDiscovered: "No discovered sections yet.",
    coverageComplete: "Coverage complete",
    coveragePartial: "Coverage",
    loaded: "loaded",
    lowestComplete: "Lowest price is complete.",
    lowestLoaded: "Lowest shown is lowest loaded so far.",
    searchPlaceholder: "Search section / block only (example: 101)",
    clear: "Clear",
    ljiljan: "Ljiljan Edition",
    buyCoffee: "Buy me a coffee",
    refreshNeeded: "Click around the seat map first so FIFA loads prices.",
    sec: "Section",
    category: "Category",
    openSeatMap: "Open a seat map",
    openFifa: "Open FIFA Resale Site",
    seatsWord: "seats",
    barUnit: "bars",
    top20: "top 20%"
  },
  bs: {
    live: "UŽIVO",
    emptyTitle: "Vodi me u Ameriku",
    emptyHint: "Otvori FIFA resale stranicu i pregledaj mapu sjedišta. Ova pasivna verzija hvata samo ono što FIFA učita na ekranu.",
    emptyScanningTitle: "Još nema podataka",
    emptyScanningHint: "Klikaj po sektorima na FIFA mapi sjedišta da stranica učita cijene. Zatim ponovo otvori ili osvježi popup.",
    seatMapHint: "Na FIFA stranici si — otvori mapu sjedišta za utakmicu i klikaj po sektorima da se učitaju cijene.",
    loadingMatch: "Podaci o utakmici se učitavaju…",
    browseMatch: "Pregledaj mapu sjedišta da uhvatiš podatke o utakmici",
    sectionFilter: "Filter sektora",
    seats: "Sjedišta",
    cheapest: "Najjeftinije",
    priciest: "Najskuplje",
    bestSet: "Najbolji 100",
    highest: "Najviše",
    average: "prosjek",
    all: "Sve",
    other: "Ostalo",
    seatsTogether: "Sjedišta zajedno",
    groups: "grupa",
    bestDeals: "Najbolje ponude",
    noSeatsFound: "Nema pronađenih sjedišta",
    singleSeat: "jedno sjedište",
    together: "zajedno",
    block: "Blok",
    row: "Red",
    area: "Zona",
    min: "Min",
    max: "Maks",
    blockBreakdown: "Pregled blokova",
    discoverSections: "Pronađi sektore",
    loadAll: "Učitaj sve pronađene",
    exportCsv: "Izvezi CSV",
    clearData: "Obriši podatke",
    sectionLoaderTitle: "Učitavanje sektora",
    sectionLoaderSubtitle: "Pronađi sektore iz odgovora, zatim ih učitaj jedan po jedan",
    discoverResponsesFirst: "Pronađi iz učitanih podataka",
    loadingSection: "Učitavam sektor",
    done: "završeno",
    discoveredSections: "pronađenih sektora",
    loadThisCategory: "Učitaj ovu kategoriju",
    categoryCoverage: "Pokrivenost kategorije",
    overallCoverage: "Ukupna pokrivenost",
    complete: "Potpuno",
    partial: "Djelimično",
    loading: "Učitava se",
    noDiscovered: "Još nema pronađenih sektora.",
    coverageComplete: "Pokrivenost potpuna",
    coveragePartial: "Pokrivenost",
    loaded: "učitano",
    lowestComplete: "Najniža cijena je potpuna.",
    lowestLoaded: "Prikazana najniža cijena je najniža od trenutno učitanih.",
    searchPlaceholder: "Pretraži samo sektor / blok (primjer: 101)",
    clear: "Obriši",
    ljiljan: "Ljiljan izdanje",
    buyCoffee: "Kupi mi kafu",
    refreshNeeded: "Prvo klikaj po mapi sjedišta da FIFA učita cijene.",
    sec: "Sektor",
    category: "Kategorija",
    openSeatMap: "Otvori mapu sjedišta",
    openFifa: "Otvori FIFA Resale stranicu",
    seatsWord: "sjedišta",
    barUnit: "stupci",
    top20: "gornjih 20%"
  }
};

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang === "bs" ? "bs" : "en";
  const liveBadge = document.getElementById("liveBadge");
  if (liveBadge) liveBadge.innerHTML = `<span class="live-dot"></span> ${t("live")}`;
  const emptyTitle = document.getElementById("emptyTitle");
  if (emptyTitle) emptyTitle.textContent = t("emptyTitle");
  const emptyHint = document.getElementById("emptyHint");
  if (emptyHint && emptyHint.textContent.includes("Open the FIFA")) emptyHint.textContent = t("emptyHint");
  const search = document.getElementById("sectionSearch");
  if (search) search.placeholder = t("searchPlaceholder");
  const clearBtn = document.getElementById("sectionClearBtn");
  if (clearBtn) clearBtn.textContent = t("clear");
  const blockTitle = document.getElementById("blockBreakdownTitle");
  if (blockTitle) blockTitle.textContent = t("blockBreakdown");
  const scanBtnText = document.getElementById("scanBtnText");
  if (scanBtnText) scanBtnText.textContent = t("discoverSections");
  const loadAllBtn = document.getElementById("loadAllBtn");
  if (loadAllBtn) loadAllBtn.textContent = t("loadAll");
  const exportLbl = document.getElementById("exportBtnLabel");
  if (exportLbl) exportLbl.textContent = t("exportCsv");
  const clearDataLbl = document.getElementById("clearBtnLabel");
  if (clearDataLbl) clearDataLbl.textContent = t("clearData");
  const badge = document.querySelector(".ljiljan-badge");
  if (badge) badge.textContent = t("ljiljan");
  const coffee = document.querySelector(".header-coffee");
  if (coffee) coffee.title = t("buyCoffee");
  const loaderTitle = document.querySelector(".section-loader-title");
  if (loaderTitle) loaderTitle.textContent = t("sectionLoaderTitle");
  const loaderSubtitle = document.querySelector(".section-loader-subtitle");
  if (loaderSubtitle) loaderSubtitle.textContent = t("sectionLoaderSubtitle");

  document.querySelectorAll("#blockTable thead th").forEach((th, i) => {
    const vals = [t("block"), t("area"), t("seats"), t("min"), t("max")];
    if (vals[i]) th.textContent = vals[i];
  });
}

async function loadLanguagePreference() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["uiLang"], (data) => {
      currentLang = data.uiLang || "bs";
      resolve(currentLang);
    });
  });
}

function saveLanguagePreference() {
  chrome.storage.local.set({ uiLang: currentLang });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadLanguagePreference();
  applyStaticTranslations();
  const langToggleBtn = document.getElementById("langToggleBtn");
  if (langToggleBtn) {
    langToggleBtn.textContent = currentLang === "en" ? "BS" : "EN";
    langToggleBtn.title = currentLang === "en" ? "Prevedi na bosanski" : "Translate to English";
    langToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "bs" : "en";
      saveLanguagePreference();
      applyStaticTranslations();
      if (langToggleBtn) {
        langToggleBtn.textContent = currentLang === "en" ? "BS" : "EN";
        langToggleBtn.title = currentLang === "en" ? "Prevedi na bosanski" : "Translate to English";
      }
      loadData();
    });
  }
  loadData();

  // Listen for live updates from background
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "DATA_UPDATED") {
      loadData();
    }
    if (message.type === "SCAN_PROGRESS") {
      updateScanProgress(message.completed, message.total, message.status, message.eta);
    }
  });

  // Block toggle
  document.getElementById("blockToggle").addEventListener("click", () => {
    const body = document.getElementById("blockBody");
    const chevron = document.querySelector("#blockToggle .chevron");
    const isOpen = body.style.display !== "none";
    body.style.display = isOpen ? "none" : "block";
    chevron.classList.toggle("open", !isOpen);
  });

  document.getElementById("scanBtn").addEventListener("click", discoverSections);
  const loadAllBtn = document.getElementById("loadAllBtn");
  if (loadAllBtn) loadAllBtn.addEventListener("click", loadAllDiscoveredSections);

  // Export CSV
  document.getElementById("exportBtn").addEventListener("click", exportCSV);

  // Clear data
  document.getElementById("clearBtn").addEventListener("click", () => {
    if (confirm(currentLang === "bs" ? "Obrisati sve uhvaćene podatke?" : "Clear all captured data?")) {
      chrome.runtime.sendMessage({ type: "CLEAR_DATA" }, () => {
        loadData();
      });
    }
  });

  const sectionInput = document.getElementById("sectionSearch");
  const sectionClearBtn = document.getElementById("sectionClearBtn");
  if (sectionInput) {
    sectionInput.addEventListener("input", () => {
      sectionSearchValue = sectionInput.value.trim();
      activeClusterPage = 0;
      saveFilters();
      loadData();
    });
  }
  if (sectionClearBtn) {
    sectionClearBtn.addEventListener("click", () => {
      sectionSearchValue = "";
      activeClusterPage = 0;
      if (sectionInput) sectionInput.value = "";
      saveFilters();
      loadData();
    });
  }

});

async function getCurrentTabUrl() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.url || "";
  } catch { return ""; }
}


async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function sendToActiveTab(message) {
  const tab = await getActiveTab();
  if (!tab?.id) return null;
  try {
    return await chrome.tabs.sendMessage(tab.id, message);
  } catch {
    return null;
  }
}


async function getLoaderState(activeId) {
  return chrome.runtime.sendMessage({ type: "GET_SECTION_LOADER_STATE", performanceId: activeId });
}

async function setLoaderState(activeId, state) {
  return new Promise((resolve) => {
    chrome.storage.local.get(["sectionLoader"], (data) => {
      const all = data.sectionLoader || {};
      all[activeId] = state;
      chrome.storage.local.set({ sectionLoader: all }, resolve);
    });
  });
}


function labelMatchesSeat(label, seat) {
  const q = String(label || "").trim().toLowerCase();
  const block = String(seat.block || "").toLowerCase();
  const area = String(seat.area || "").toLowerCase();
  return block.includes(q) || area.includes(q) || q.includes(block) || q.includes(area);
}


function getCurrentNormalizedCategoryLabel() {
  if (activeCatIndex === -1 || !currentCatData[activeCatIndex]) return null;
  return currentCatData[activeCatIndex][0];
}

function seatMatchesNormalizedCategory(seat, normalizedCategory) {
  if (!normalizedCategory) return true;
  return normalizeCategoryName(seat.category) === normalizedCategory;
}

function looksLikeRealSectionLabel(label) {
  const raw = String(label || "").trim();
  if (!raw || raw.length > 24) return false;
  if (/match|stadium|venue|ticket|resale|fifa|world cup|buy|coffee|america|ljiljan/i.test(raw)) return false;
  return /^[A-Za-z]?\d{1,3}[A-Za-z]?$/.test(raw) || /^(block|section|sec|sector|zona)\s*[A-Za-z]?\d{1,3}[A-Za-z]?$/i.test(raw);
}


async function discoverSections() {
  const tab = await getActiveTab();
  if (!tab?.url || !/\.tickets\.fifa\.com/.test(tab.url)) {
    alert(currentLang === "bs" ? "Prvo otvori FIFA tickets stranicu." : "Open a FIFA tickets page first.");
    return;
  }

  chrome.storage.local.get(null, async (data) => {
    const games = data.games || {};
    const activeId = data.activeGame || Object.keys(games)[0];
    if (!activeId) {
      alert(currentLang === "bs" ? "Još nema aktivnih podataka o utakmici. Prvo klikaj po mapi sjedišta." : "No active game data yet. Click around the seat map first.");
      return;
    }

    const fromResponses = await getLoaderState(activeId);
    const domResult = await sendToActiveTab({ type: "DISCOVER_SECTIONS" });
    const domSections = domResult?.sections || [];

    const discovered = [...new Set([...(fromResponses?.discovered || []), ...domSections].map((s) => String(s).trim()).filter(Boolean))];
    if (!discovered.length) {
      alert(currentLang === "bs" ? "Nema pronađenih sektora još. Klikaj po mapi i pokušaj ponovo." : "No sections discovered yet. Click around the map and try again.");
      return;
    }

    const prev = await getLoaderState(activeId);
    const loaded = (prev.loaded || []).filter((x) => discovered.includes(x));
    const attempted = (prev.attempted || []).filter((x) => discovered.includes(x));
    await setLoaderState(activeId, { ...prev, discovered, loaded, attempted, pending: prev.pending || null });
    loadData();
  });
}




async function loadSectionsForActiveCategory() {
  const activeCategory = getCurrentNormalizedCategoryLabel();
  if (!activeCategory) return;

  chrome.storage.local.get(null, async (data) => {
    const games = data.games || {};
    const activeId = data.activeGame || Object.keys(games)[0];
    if (!activeId) return;

    const game = games[activeId] || {};
    const allSeats = Object.values(game.seats || {});
    const state = await getLoaderState(activeId);
    const discovered = state.discovered || [];
    const loaded = new Set(state.loaded || []);

    const matchingSeats = allSeats.filter((s) => seatMatchesNormalizedCategory(s, activeCategory));
    const knownLabels = new Set();
    matchingSeats.forEach((s) => {
      const block = String(s.block || "").trim();
      const area = String(s.area || "").trim();
      if (looksLikeRealSectionLabel(block)) knownLabels.add(block);
      if (looksLikeRealSectionLabel(area)) knownLabels.add(area);
    });

    const targeted = discovered.filter((label) => {
      const safe = looksLikeRealSectionLabel(label);
      const known = knownLabels.has(label);
      return safe && known && !loaded.has(label);
    });

    if (!targeted.length) {
      alert(currentLang === "bs"
        ? "Za ovu kategoriju nema sigurnih dodatnih sektora za učitavanje. Prvo ručno klikaj po mapi."
        : "There are no safe additional sections to load for this category yet. Click around the map manually first.");
      renderSectionCoverage(game, activeId);
      return;
    }

    const progress = document.getElementById("scanProgress");
    const fill = document.getElementById("progressFill");
    const text = document.getElementById("progressText");
    if (progress) progress.style.display = "";

    let completed = 0;
    for (const label of targeted) {
      const token = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await chrome.runtime.sendMessage({ type: "SECTION_LOAD_REQUEST", performanceId: activeId, label, token });
      const clicked = await sendToActiveTab({ type: "CLICK_SECTION", label });

      if (clicked?.ok) {
        if (text) text.textContent = `${t("loadingSection")}: ${label} (${completed + 1}/${targeted.length})`;
        const startTs = Date.now();
        while (Date.now() - startTs < 7000) {
          const status = await getLoaderState(activeId);
          if (!status.pending) break;
          await new Promise((r) => setTimeout(r, 300));
        }
      }

      completed++;
      const pct = Math.round((completed / targeted.length) * 100);
      if (fill) fill.style.width = pct + "%";
      if (text) text.textContent = `${completed}/${targeted.length} ${t("done")}`;
      await new Promise((r) => setTimeout(r, 350));
    }

    if (progress) progress.style.display = "none";
    loadData();
  });
}

async function loadAllDiscoveredSections() {
  if (isLoadingAllSections) return;
  isLoadingAllSections = true;

  chrome.storage.local.get(null, async (data) => {
    try {
      const games = data.games || {};
      const activeId = data.activeGame || Object.keys(games)[0];
      if (!activeId) {
        alert(currentLang === "bs" ? "Još nema aktivnih podataka o utakmici." : "No active game data yet.");
        isLoadingAllSections = false;
        return;
      }

      const game = games[activeId] || {};
      const state = await getLoaderState(activeId);
      const discovered = state.discovered || [];
      if (!discovered.length) {
        alert(currentLang === "bs" ? "Prvo pronađi sektore." : "Discover sections first.");
        isLoadingAllSections = false;
        return;
      }

      const progress = document.getElementById("scanProgress");
      const fill = document.getElementById("progressFill");
      const text = document.getElementById("progressText");
      if (progress) progress.style.display = "";

      let completed = 0;
      for (const label of discovered) {
        const latest = await getLoaderState(activeId);
        const loaded = new Set(latest.loaded || []);
        if (loaded.has(label)) {
          completed++;
          const pct = Math.round((completed / discovered.length) * 100);
          if (fill) fill.style.width = pct + "%";
          if (text) text.textContent = `${completed}/${discovered.length}`;
          continue;
        }

        const token = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        await chrome.runtime.sendMessage({ type: "SECTION_LOAD_REQUEST", performanceId: activeId, label, token });

        const clicked = await sendToActiveTab({ type: "CLICK_SECTION", label });
        if (clicked?.ok) {
          if (text) text.textContent = `${t("loadingSection")}: ${label} (${completed + 1}/${discovered.length})`;

          const startTs = Date.now();
          while (Date.now() - startTs < 8000) {
            const status = await getLoaderState(activeId);
            if (!status.pending) break;
            await new Promise((r) => setTimeout(r, 350));
          }
        }

        completed++;
        const pct = Math.round((completed / discovered.length) * 100);
        if (fill) fill.style.width = pct + "%";
        if (text) text.textContent = `${completed}/${discovered.length} ${t("done")}`;
        loadData();
        await new Promise((r) => setTimeout(r, 450));
      }

      if (progress) progress.style.display = "none";
      loadData();
    } finally {
      isLoadingAllSections = false;
    }
  });
}



function renderSectionCoverage(game, activeId) {
  const statusEl = document.getElementById("coverageStatus");
  const listEl = document.getElementById("coverageList");
  if (!statusEl) return;
  if (listEl) listEl.innerHTML = "";

  chrome.storage.local.get(["sectionLoader"], (data) => {
    const state = (data.sectionLoader || {})[activeId] || { discovered: [], loaded: [], attempted: [], pending: null };
    const discovered = state.discovered || [];
    const loaded = new Set(state.loaded || []);
    const pending = state.pending || null;
    const activeCategory = getCurrentNormalizedCategoryLabel();

    if (!discovered.length) {
      statusEl.innerHTML = `<span>${t("noDiscovered")}</span>`;
      return;
    }

    const allSeats = Object.values(game?.seats || {});
    const matchingSeats = activeCategory ? allSeats.filter((s) => seatMatchesNormalizedCategory(s, activeCategory)) : allSeats;

    const discoveredForCategory = !activeCategory
      ? discovered
      : discovered.filter((label) => matchingSeats.some((s) => labelMatchesSeat(label, s)));

    const loadedForCategory = !activeCategory
      ? [...loaded]
      : [...loaded].filter((label) => matchingSeats.some((s) => labelMatchesSeat(label, s)));

    const total = activeCategory ? discoveredForCategory.length : discovered.length;
    const count = activeCategory ? loadedForCategory.length : loaded.size;
    const statusClass = pending ? "loading" : (total > 0 && count >= total ? "complete" : "partial");
    const statusText = pending ? t("loading") : (total > 0 && count >= total ? t("complete") : t("partial"));
    const label = activeCategory ? t("categoryCoverage") : t("overallCoverage");
    const suffix = total > 0 && count >= total ? t("lowestComplete") : t("lowestLoaded");

    statusEl.innerHTML = `
      <span>${label}: ${count}/${Math.max(total, count || 0)} ${t("loaded")} ${t("discoveredSections")}</span>
      <span class="coverage-badge ${statusClass}">${statusText}</span>
      <span>${suffix}</span>
    `;
  });
}


function loadData() {
  getCurrentTabUrl().then((url) => {
    const isFifaSite = /\.tickets\.fifa\.com/.test(url);
    const isSeatMap = isFifaSite && (/perfId=/.test(url) || /\/seat\//.test(url));

    chrome.storage.local.get(null, (data) => {
      if (chrome.runtime.lastError || !data?.games) {
        showEmpty(isFifaSite, isSeatMap);
        return;
      }

      const games = data.games;
      const gameIds = Object.keys(games);

      if (gameIds.length === 0) {
        showEmpty(isFifaSite, isSeatMap);
        return;
      }

      const activeId = data.activeGame || gameIds[0];
      const game = games[activeId];

      if (!game || Object.keys(game.seats || {}).length === 0) {
        showEmpty(isFifaSite, isSeatMap);
        return;
      }

      // Restore persisted filters
      if (data.filters) {
        activeCatIndex = data.filters.activeCatIndex ?? -1;
        selectedTogether = new Set(data.filters.selectedTogether ?? [1, 2, 3, 4, 5, 6]);
        sectionSearchValue = data.filters.sectionSearchValue ?? "";
        const sectionInput = document.getElementById("sectionSearch");
        if (sectionInput) sectionInput.value = sectionSearchValue;
      }

      renderDashboard(game);
    });
  });
}

function showEmpty(isFifaSite, isSeatMap) {
  document.getElementById("noData").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("liveBadge").style.display = "none";

  const title = document.getElementById("emptyTitle");
  const hint = document.getElementById("emptyHint");
  const action = document.getElementById("emptyAction");

  if (isSeatMap) {
    title.textContent = "Scanning\u2026";
    hint.textContent = t("emptyScanningHint");
    action.style.display = "none";
  } else if (isFifaSite) {
    title.textContent = t("openSeatMap");
    hint.textContent = "You\u2019re on the FIFA ticket site \u2014 select a match and open its seat map to start capturing prices.";
    action.style.display = "none";
  } else {
    title.textContent = t("emptyTitle");
    hint.textContent = t("emptyHint");
    action.textContent = t("openFifa");
    action.style.display = "";
    action.onclick = (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: "https://fwc26-resale-usd.tickets.fifa.com" });
    };
  }
}

function renderDashboard(game) {
  document.getElementById("noData").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("liveBadge").style.display = "inline-flex";

  const allSeats = Object.values(game.seats || {});
  const seats = filterSeatsBySection(allSeats);
  const match = game.match;

  const activeId = game.match?.performanceId || "";
  renderMatchInfo(match, allSeats.length, seats.length);
  renderStatsBar(seats);
  renderCategorySections(seats);
  renderBlockTable(seats);
  renderSectionCoverage(game, activeId);
}

function filterSeatsBySection(seats) {
  const query = String(sectionSearchValue || "").trim().toLowerCase();
  if (!query) return seats;
  return seats.filter((s) => {
    const block = String(s.block || "").toLowerCase();
    const area = String(s.area || "").toLowerCase();
    return block.includes(query) || area.includes(query);
  });
}

// --- Match Info ---


function renderMatchInfo(match, totalSeats = 0, filteredSeats = 0) {
  const el = document.getElementById("matchInfo");

  if (match?.name) {
    const parts = match.name.split(" / ");
    const matchNum = parts[1] || "";
    const teams = parts[2] || match.name;
    const venue = parts[3] || "";
    const date = match.date ? formatDate(match.date) : "";

    el.innerHTML = `
      <div class="match-teams">${escapeHtml(teams)}</div>
      <div class="match-meta">
        ${matchNum ? `<span>${escapeHtml(matchNum)}</span>` : ""}
        ${matchNum && venue ? `<span class="sep">&middot;</span>` : ""}
        ${venue ? `<span>${escapeHtml(venue)}</span>` : ""}
        ${(matchNum || venue) && date ? `<span class="sep">&middot;</span>` : ""}
        ${date ? `<span>${escapeHtml(date)}</span>` : ""}
      </div>
      ${sectionSearchValue ? `<div class="match-meta">${t("sectionFilter")}: <strong>${escapeHtml(sectionSearchValue)}</strong> &middot; ${filteredSeats} of ${totalSeats} seats</div>` : ""}
    `;
  } else {
    el.innerHTML = `
      <div class="match-teams">${t("loadingMatch")}</div>
      <div class="match-meta">${t("browseMatch")}</div>
    `;
  }
}

// --- Stats Bar ---

function renderStatsBar(seats) {
  const el = document.getElementById("statsBar");

  if (seats.length > 0) {
    const prices = seats.map((s) => centsToUSD(s.price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    el.innerHTML = `
      <div class="stat">
        <div class="stat-value">${seats.length.toLocaleString()}</div>
        <div class="stat-label">${t("seats")}</div>
      </div>
      <div class="stat">
        <div class="stat-value">$${formatPrice(min)}</div>
        <div class="stat-label">${t("cheapest")}</div>
      </div>
      <div class="stat">
        <div class="stat-value">$${formatPrice(max)}</div>
        <div class="stat-label">${t("priciest")}</div>
      </div>
    `;
  } else {
    el.innerHTML = `
      <div class="stat">
        <div class="stat-value">0</div>
        <div class="stat-label">${t("seats")}</div>
      </div>
      <div class="stat">
        <div class="stat-value">&mdash;</div>
        <div class="stat-label">${t("cheapest")}</div>
      </div>
      <div class="stat">
        <div class="stat-value">&mdash;</div>
        <div class="stat-label">${t("priciest")}</div>
      </div>
    `;
  }
}

// --- Category Tabs with Distribution + Cheapest Clusters ---

let activeCatIndex = -1;
let currentCatData = [];
let activeClusterPage = 0;
let sectionSearchValue = "";
let isLoadingAllSections = false;

function saveFilters() {
  chrome.storage.local.set({ filters: { activeCatIndex, selectedTogether: [...selectedTogether], sectionSearchValue } });
}
let selectedTogether = new Set([1, 2, 3, 4, 5, 6]); // all ON by default


function normalizeCategoryName(rawCategory) {
  const raw = String(rawCategory || "").trim();
  const m = raw.match(/(?:category|cat|kategorija)\s*([1-4])\b/i) || raw.match(/\b([1-4])\b/);
  if (m) return `${t("category")} ${m[1]}`;
  return t("other");
}


function findBestSet100s(seats) {
  const candidates = seats.filter((s) => {
    const raw = String(s.block || "").trim();
    const numMatch = raw.match(/\d+/);
    if (!numMatch) return false;
    const num = parseInt(numMatch[0], 10);
    if (Number.isNaN(num)) return false;
    return num >= 100 && num <= 199 && typeof s.price === "number";
  });

  if (!candidates.length) return null;

  const sorted = candidates.slice().sort((a, b) => centsToUSD(a.price) - centsToUSD(b.price));
  const best = sorted[0];
  return {
    block: best.block || "",
    price: centsToUSD(best.price)
  };
}


function renderCategorySections(seats) {
  const tabsEl = document.getElementById("catTabs");
  const contentEl = document.getElementById("catContent");

  // Group seats by simplified category (Category 1-4 + Other)
  const groups = {};
  for (const s of seats) {
    const cat = normalizeCategoryName(s.category);
    if (!groups[cat]) groups[cat] = { seats: [], color: s.color };
    groups[cat].seats.push({ ...s, category: cat });
  }

  // Sort by cheapest displayed price first
  currentCatData = Object.entries(groups).sort((a, b) => {
    const aPrices = a[1].seats.map((s) => centsToUSD(s.price)).filter((n) => n > 0);
    const bPrices = b[1].seats.map((s) => centsToUSD(s.price)).filter((n) => n > 0);
    const aMin = aPrices.length ? Math.min(...aPrices) : Number.MAX_SAFE_INTEGER;
    const bMin = bPrices.length ? Math.min(...bPrices) : Number.MAX_SAFE_INTEGER;
    return aMin - bMin;
  });

  if (currentCatData.length === 0) {
    tabsEl.innerHTML = "";
    contentEl.innerHTML = "";
    return;
  }

  // Clamp active index (-1 = All)
  if (activeCatIndex >= currentCatData.length) activeCatIndex = -1;

  // Render tabs — "All" first, then categories by seat count
  const totalSeats = currentCatData.reduce((sum, [, d]) => sum + d.seats.length, 0);
  const allTab = `<button class="cat-tab ${activeCatIndex === -1 ? "active" : ""}" data-index="-1">
    ${t("all")}
    <span class="cat-tab-count">${totalSeats}</span>
  </button>`;

  const catTabs = currentCatData
    .map(([cat, data], i) => {
      const shortName = cat;
      const dotColor = data.color || "#6b7588";
      return `<button class="cat-tab ${i === activeCatIndex ? "active" : ""}" data-index="${i}">
        <span class="category-dot" style="background:${dotColor}"></span>${escapeHtml(shortName)}
        <span class="cat-tab-count">${data.seats.length}</span>
      </button>`;
    })
    .join("");

  tabsEl.innerHTML = allTab + catTabs;

  // Tab click handlers
  tabsEl.querySelectorAll(".cat-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCatIndex = parseInt(btn.dataset.index);
      activeClusterPage = 0;
      saveFilters();
      renderCategorySections(seats);
    });
  });

  // Render active category content
  let activeSeats, activeColor;
  if (activeCatIndex === -1) {
    // All categories combined
    activeSeats = currentCatData.flatMap(([, d]) => d.seats);
    activeColor = "#1a3d8f";
  } else {
    const [, data] = currentCatData[activeCatIndex];
    activeSeats = data.seats;
    activeColor = data.color || "#1a3d8f";
  }

  // Build clusters first so we can filter seats by "together" count
  const allClusters = buildAllClusters(activeSeats);
  const allOn = selectedTogether.size === 6;
  const filteredClusters = allOn
    ? allClusters
    : allClusters.filter((c) => {
        if (c.count >= 6) return selectedTogether.has(6);
        return selectedTogether.has(c.count);
      });

  // When filtering by together count, only use seats from qualifying clusters
  let displaySeats;
  if (!allOn) {
    const qualifyingKeys = new Set();
    for (const c of filteredClusters) {
      for (const s of c.seats) qualifyingKeys.add(seatKey(s));
    }
    displaySeats = activeSeats.filter((s) => qualifyingKeys.has(seatKey(s)));
  } else {
    displaySeats = activeSeats;
  }

  const prices = displaySeats.map((s) => centsToUSD(s.price));
  const sortedPrices = prices.slice().sort((a, b) => a - b);

  let statsHtml, histHtml;
  if (sortedPrices.length > 0) {
    const min = sortedPrices[0];
    const max = sortedPrices[sortedPrices.length - 1];
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const median = sortedPrices.length % 2 === 0
      ? (sortedPrices[sortedPrices.length / 2 - 1] + sortedPrices[sortedPrices.length / 2]) / 2
      : sortedPrices[Math.floor(sortedPrices.length / 2)];

    const bestSet = findBestSet100s(displaySeats);
    statsHtml = `
      <div class="cat-stats">
        <span class="cat-stat">
          <span class="cat-stat-label">${t("cheapest")}</span>
          <span class="price-green">$${formatPrice(min)}</span>
        </span>
        <span class="cat-stat">
          <span class="cat-stat-label">${t("bestSet")}</span>
          <span class="price-white">${bestSet ? "$" + formatPrice(bestSet.price) : "&mdash;"}</span>
          <span class="price-avg">${bestSet ? t("sec") + " " + escapeHtml(bestSet.block) : ""}</span>
        </span>
        <span class="cat-stat">
          <span class="cat-stat-label">${t("highest")}</span>
          <span class="price-red">$${formatPrice(max)}</span>
        </span>
      </div>`;
    histHtml = buildDistribution(prices, activeColor);
  } else {
    statsHtml = `
      <div class="cat-stats">
        <span class="cat-stat">
          <span class="cat-stat-label">${t("cheapest")}</span>
          <span class="price-green">&mdash;</span>
        </span>
        <span class="cat-stat">
          <span class="cat-stat-label">${t("bestSet")}</span>
          <span class="price-white">&mdash;</span>
        </span>
        <span class="cat-stat">
          <span class="cat-stat-label">${t("highest")}</span>
          <span class="price-red">&mdash;</span>
        </span>
      </div>`;
    histHtml = "";
  }

  const totalPages = Math.max(1, Math.ceil(filteredClusters.length / CLUSTERS_PER_PAGE));
  if (activeClusterPage >= totalPages) activeClusterPage = totalPages - 1;
  if (activeClusterPage < 0) activeClusterPage = 0;
  const clustersHtml = renderClusterPage(filteredClusters, activeClusterPage);

  const togetherBtns = [1, 2, 3, 4, 5, 6]
    .map((n) => {
      const label = n === 6 ? "6+" : String(n);
      const active = selectedTogether.has(n) ? "active" : "";
      return `<button class="together-btn ${active}" data-tog="${n}">${label}</button>`;
    })
    .join("");

  const seatCount = !allOn
    ? `<span class="together-count">${displaySeats.length} seats</span>`
    : "";

  const categoryLoadButton = activeCatIndex !== -1 ? `<div class="category-load-row"><button class="category-load-btn" id="loadCategoryBtn">${t("loadThisCategory")}</button></div>` : "";

  contentEl.innerHTML = `
    ${categoryLoadButton}
    <div class="together-filter">
      <span class="together-label">${t("seatsTogether")}</span>
      <div class="together-btns">${togetherBtns}</div>
      ${seatCount}
    </div>
    ${statsHtml}
    ${histHtml}
    <div class="cheapest-header">
      ${t("bestDeals")} <span class="deals-count">${filteredClusters.length} ${t("groups")}</span>
    </div>
    <div id="clusterContainer">${clustersHtml}</div>
  `;

  const loadCategoryBtn = document.getElementById("loadCategoryBtn");
  if (loadCategoryBtn) {
    loadCategoryBtn.addEventListener("click", () => {
      loadSectionsForActiveCategory();
    });
  }

  // Together-filter click handlers
  contentEl.querySelectorAll(".together-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const n = parseInt(btn.dataset.tog);
      if (selectedTogether.has(n)) {
        selectedTogether.delete(n);
      } else {
        selectedTogether.add(n);
      }
      // If all toggled off, reset to all ON
      if (selectedTogether.size === 0) {
        selectedTogether = new Set([1, 2, 3, 4, 5, 6]);
      }
      saveFilters();
      renderCategorySections(seats);
    });
  });

  // Attach pagination handler
  attachClusterPagination(filteredClusters);
}

function buildDistribution(prices, color) {
  if (prices.length < 2) return "";

  const sorted = prices.slice().sort((a, b) => a - b);
  const totalSeats = sorted.length;

  // Bottom 80% get individual buckets, top 20% lumped together
  const cutoffIndex = Math.floor(totalSeats * 0.8);
  const mainPrices = sorted.slice(0, cutoffIndex);
  const tailPrices = sorted.slice(cutoffIndex);

  if (mainPrices.length < 2) return "";

  const mainMin = mainPrices[0];
  const mainMax = mainPrices[mainPrices.length - 1];
  const mainRange = mainMax - mainMin;

  if (mainRange === 0) return "";

  // Target ~20 bars for the main section, round bucket size to a clean number
  let rawBucketSize = mainRange / 20;
  // Round to nearest nice number: 50, 100, 250, 500, 1000, 2500, 5000
  const niceSteps = [25, 50, 100, 250, 500, 1000, 2500, 5000];
  let bucketSize = niceSteps.find((s) => s >= rawBucketSize) || rawBucketSize;

  const bucketStart = Math.floor(mainMin / bucketSize) * bucketSize;
  const mainBucketCount = Math.ceil((mainMax - bucketStart) / bucketSize) + 1;
  const totalBuckets = mainBucketCount + 1; // +1 for the tail bucket
  const buckets = new Array(totalBuckets).fill(0);

  for (const p of mainPrices) {
    let idx = Math.floor((p - bucketStart) / bucketSize);
    if (idx < 0) idx = 0;
    if (idx >= mainBucketCount) idx = mainBucketCount - 1;
    buckets[idx]++;
  }
  buckets[totalBuckets - 1] = tailPrices.length;

  const maxBucket = Math.max(...buckets);
  const tailMin = tailPrices.length > 0 ? tailPrices[0] : 0;
  const tailMax = tailPrices.length > 0 ? tailPrices[tailPrices.length - 1] : 0;

  const bars = buckets
    .map((count, i) => {
      const isTail = i === totalBuckets - 1;
      let label;
      if (isTail) {
        label = `$${formatPrice(tailMin)}-$${formatPrice(tailMax)}: ${count} ${t("seatsWord")} (${t("top20")})`;
      } else {
        const lo = bucketStart + i * bucketSize;
        const hi = lo + bucketSize;
        label = `$${formatPrice(lo)}-$${formatPrice(hi)}: ${count} ${t("seatsWord")}`;
      }

      if (count === 0) {
        return `<div class="hist-bar" title="${label}" style="height:1px;background:${color};opacity:0.08;"></div>`;
      }
      const height = Math.max(Math.round((count / maxBucket) * 100), 4);
      return `<div class="hist-bar" title="${label}" style="height:${height}%;background:${isTail ? "var(--text-muted)" : color};opacity:${isTail ? 0.5 : 0.8};"></div>`;
    })
    .join("");

  return `
    <div class="distribution">
      <div class="hist-chart">${bars}</div>
      <div class="hist-labels">
        <span>$${formatPrice(bucketStart)}</span>
        <span class="hist-total">${totalSeats} ${t("seatsWord")} &middot; $${formatPrice(bucketSize)} ${t("barUnit")}</span>
        <span>${t("top20")}</span>
      </div>
    </div>
  `;
}

function seatKey(s) { return s.seat + "_" + s.block + "_" + s.row; }

function buildAllClusters(seats) {
  const sorted = seats.slice().sort((a, b) => a.price - b.price);
  const clusters = [];
  const used = new Set();

  // Group seats by block+row+price for O(n) neighbor lookup
  const groupMap = new Map();
  for (const s of sorted) {
    const k = s.block + "_" + s.row + "_" + s.price;
    if (!groupMap.has(k)) groupMap.set(k, []);
    groupMap.get(k).push(s);
  }

  for (const seat of sorted) {
    if (used.has(seatKey(seat))) continue;

    const k = seat.block + "_" + seat.row + "_" + seat.price;
    const neighbors = groupMap.get(k).filter((s) => !used.has(seatKey(s)));

    neighbors.sort((a, b) =>
      a.seat.localeCompare(b.seat, undefined, { numeric: true })
    );

    // Find consecutive runs
    const consecutive = [neighbors[0]];
    for (let i = 1; i < neighbors.length; i++) {
      const prev = parseInt(neighbors[i - 1].seat);
      const curr = parseInt(neighbors[i].seat);
      if (curr === prev + 1) {
        consecutive.push(neighbors[i]);
      } else {
        break;
      }
    }

    for (const s of consecutive) {
      used.add(seatKey(s));
    }

    const seatNums = consecutive.map((s) => s.seat);
    const seatDisplay =
      seatNums.length === 1
        ? `Seat ${seatNums[0]}`
        : `Seats ${seatNums[0]}-${seatNums[seatNums.length - 1]}`;

    clusters.push({
      block: seat.block,
      row: seat.row,
      seatDisplay,
      count: consecutive.length,
      price: centsToUSD(seat.price),
      area: seat.area,
      seats: consecutive,
    });
  }

  return clusters;
}

const CLUSTERS_PER_PAGE = 10;

function renderClusterPage(clusters, page) {
  if (clusters.length === 0) return `<div class="no-deals">${t("noSeatsFound")}</div>`;

  const totalPages = Math.max(1, Math.ceil(clusters.length / CLUSTERS_PER_PAGE));
  page = Math.max(0, Math.min(page, totalPages - 1));
  const start = page * CLUSTERS_PER_PAGE;
  const pageItems = clusters.slice(start, start + CLUSTERS_PER_PAGE);
  const hasMore = start + CLUSTERS_PER_PAGE < clusters.length;
  const hasPrev = page > 0;

  const rows = pageItems
    .map((c, i) => {
      const rank = start + i + 1;
      return `
      <div class="cluster-row">
        <div class="cluster-rank">${rank}</div>
        <div class="cluster-info">
          <div class="cluster-location">${t("block")} ${escapeHtml(c.block)} &middot; ${t("row")} ${escapeHtml(c.row)} &middot; ${escapeHtml(c.seatDisplay)}</div>
          <div class="cluster-detail">${c.count > 1 ? c.count + " " + t("together") : t("singleSeat")}${c.area ? " &middot; " + escapeHtml(c.area.length > 30 ? c.area.substring(0, 28) + "\u2026" : c.area) : ""}</div>
        </div>
        <div class="cluster-price">$${formatPrice(c.price)}${c.count > 1 ? "<span class='each'>ea</span>" : ""}</div>
      </div>`;
    })
    .join("");

  const pagination =
    totalPages > 1
      ? `<div class="cluster-pagination">
          <button class="page-btn" data-page="${page - 1}" ${hasPrev ? "" : "disabled"}>&#8592; ${currentLang === "bs" ? "Nazad" : "Prev"}</button>
          <span class="page-info">${page + 1} / ${totalPages}</span>
          <button class="page-btn" data-page="${page + 1}" ${hasMore ? "" : "disabled"}>${currentLang === "bs" ? "Dalje" : "Next"} &#8594;</button>
        </div>`
      : "";

  return `<div class="clusters">${rows}</div>${pagination}`;
}

function attachClusterPagination(allClusters) {
  const container = document.getElementById("clusterContainer");
  if (!container) return;

  if (container.dataset.paginationBound === "1") {
    container.dataset.clusterCount = String(allClusters.length);
    return;
  }

  container.dataset.paginationBound = "1";
  container.dataset.clusterCount = String(allClusters.length);

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".page-btn");
    if (!btn || btn.disabled) return;

    const requestedPage = parseInt(btn.dataset.page, 10);
    if (Number.isNaN(requestedPage)) return;

    const totalPages = Math.max(1, Math.ceil(allClusters.length / CLUSTERS_PER_PAGE));
    activeClusterPage = Math.max(0, Math.min(requestedPage, totalPages - 1));
    container.innerHTML = renderClusterPage(allClusters, activeClusterPage);
  });
}

// --- Block Table ---

function renderBlockTable(seats) {
  const tbody = document.querySelector("#blockTable tbody");

  const groups = {};
  for (const s of seats) {
    const key = s.block;
    if (!groups[key]) groups[key] = { area: s.area, prices: [] };
    groups[key].prices.push(centsToUSD(s.price));
  }

  const sorted = Object.entries(groups).sort((a, b) =>
    a[0].localeCompare(b[0], undefined, { numeric: true })
  );

  tbody.innerHTML = sorted
    .map(([block, data]) => {
      const min = Math.min(...data.prices);
      const max = Math.max(...data.prices);
      const areaDisplay =
        data.area.length > 26 ? data.area.substring(0, 24) + "\u2026" : data.area;

      return `<tr>
        <td>${escapeHtml(block)}</td>
        <td title="${escapeHtml(data.area)}">${escapeHtml(areaDisplay)}</td>
        <td class="num">${data.prices.length}</td>
        <td class="num price">$${formatPrice(min)}</td>
        <td class="num price">$${formatPrice(max)}</td>
      </tr>`;
    })
    .join("");
}


// --- Export CSV ---

function exportCSV() {
  chrome.storage.local.get(null, (data) => {
    if (!data?.games) return;

    const activeId = data.activeGame || Object.keys(data.games)[0];
    const game = data.games[activeId];
    if (!game) return;

    const seats = Object.values(game.seats || {});
    if (seats.length === 0) return;

    const match = game.match;
    const now = new Date();
    const exportTime = now.toISOString();

    const meta = [
      `# Match: ${match?.name || "Unknown"}`,
      `# Date: ${match?.date || "Unknown"}`,
      `# Currency: ${match?.currency || "USD"}`,
      `# Performance ID: ${activeId}`,
      `# Exported: ${exportTime}`,
      `# Total Seats: ${seats.length}`,
    ];

    const header = "Block,Area,Row,Seat,Category,Price_USD,Exclusive";
    const rows = seats
      .sort((a, b) => a.price - b.price)
      .map((s) => {
        const area = s.area.includes(",") ? `"${s.area}"` : s.area;
        return `${s.block},${area},${s.row},${s.seat},${s.category},${centsToUSD(s.price).toFixed(2)},${s.exclusive}`;
      });

    const csv = [...meta, "", header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const matchName =
      game.match?.name?.replace(/[^a-zA-Z0-9]/g, "_") || "seats";
    const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${matchName}_${ts}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// --- Utilities ---

const FEE_MULTIPLIER = 1.15;
function centsToUSD(cents) {
  if (typeof cents !== "number") return 0;
  return (cents / 1000) * FEE_MULTIPLIER;
}

function formatPrice(n) {
  if (n >= 1000) {
    return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  return n.toFixed(2);
}

function formatDate(dateStr) {
  // Input format: "15-06-2026 - 12:00"
  const m = dateStr.match(/(\d{2})-(\d{2})-(\d{4})\s*-\s*(\d{2}:\d{2})/);
  if (!m) return dateStr;
  const [, day, month, year, time] = m;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year} \u00B7 ${time}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// --- Scan All Sections ---

function startScan_disabled() {
  chrome.storage.local.get(null, (data) => {
    if (!data?.games) {
      alert("No game data yet. Browse to a match seat map first and click around the map so FIFA loads prices.");
      return;
    }

    const activeId = data.activeGame || Object.keys(data.games)[0];
    const game = data.games[activeId];

    if (!game?.productId || !activeId) {
      alert("Browse to a match seat map first so the extension can detect the game IDs.");
      return;
    }

    chrome.runtime.sendMessage({ type: "CLEAR_DATA" }, () => {
      document.getElementById("dashboard").style.display = "none";
      document.getElementById("noData").style.display = "block";
      document.getElementById("liveBadge").style.display = "none";
      document.getElementById("emptyTitle").textContent = "Data cleared";
      document.getElementById("emptyHint").textContent = "Click refresh in your browser to repull the data.";
      document.getElementById("emptyAction").style.display = "none";
    });
  });
}

function updateScanProgress(completed, total, status, eta) {
  const pct = Math.round((completed / total) * 100);
  document.getElementById("progressFill").style.width = pct + "%";

  if (status === "done") {
    document.getElementById("progressText").textContent = "Done!";
    const btn = document.getElementById("scanBtn");
    btn.disabled = false;
    document.getElementById("scanBtnText").textContent = "Scan Complete!";
    setTimeout(() => {
      document.getElementById("scanBtnText").textContent = "Scan All Sections";
      document.getElementById("scanProgress").style.display = "none";
    }, 3000);
  } else {
    let label = pct + "%";
    if (eta != null && eta > 0) {
      label += eta >= 60
        ? " · ~" + Math.ceil(eta / 60) + "m left"
        : " · ~" + eta + "s left";
    }
    document.getElementById("progressText").textContent = label;
  }
}
