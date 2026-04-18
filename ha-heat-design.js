import "./heating-control-card.js";

(() => {
  if (customElements.get("heating-control-card")) {
    return;
  }

  const findScriptSource = () => {
    const currentScriptSource = document.currentScript?.src;
    if (currentScriptSource) {
      return currentScriptSource;
    }

    const matchingScript = Array.from(document.querySelectorAll("script[src]"))
      .reverse()
      .find((script) => script.src.includes("ha-heat-design.js") || script.src.includes("heating-control-card.js"));

    return matchingScript?.src || null;
  };

  const candidateUrls = new Set();
  const addRelativeCandidate = (baseUrl) => {
    if (!baseUrl) {
      return;
    }

    try {
      candidateUrls.add(new URL("./heating-control-card.js", baseUrl).toString());
    } catch (_error) {
      // Ignore invalid base URLs and continue with fallbacks.
    }
  };

  addRelativeCandidate(typeof import.meta !== "undefined" ? import.meta.url : null);
  addRelativeCandidate(findScriptSource());

  candidateUrls.add("/hacsfiles/ha-heat-design/heating-control-card.js");
  candidateUrls.add("/local/community/ha-heat-design/heating-control-card.js");
  candidateUrls.add("/local/heating-control-card.js");

  const loadCardModule = async () => {
    let lastError = null;

    for (const moduleUrl of candidateUrls) {
      try {
        await import(moduleUrl);

        if (customElements.get("heating-control-card")) {
          return;
        }
      } catch (error) {
        lastError = error;
      }
    }

    // eslint-disable-next-line no-console
    console.error("[ha-heat-design] Failed to load heating-control-card.js from known paths", {
      attemptedUrls: [...candidateUrls],
      lastError
    });
  };

  loadCardModule();
})();
