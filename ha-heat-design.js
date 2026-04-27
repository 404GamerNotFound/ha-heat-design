import "./heating-control-card.js";
import "./button-switch-card.js";

(() => {
  const findScriptSource = () => {
    const currentScriptSource = document.currentScript?.src;
    if (currentScriptSource) {
      return currentScriptSource;
    }

    const matchingScript = Array.from(document.querySelectorAll("script[src]"))
      .reverse()
      .find(
        (script) =>
          script.src.includes("ha-heat-design.js") ||
          script.src.includes("heating-control-card.js") ||
          script.src.includes("button-switch-card.js")
      );

    return matchingScript?.src || null;
  };

  const candidateUrls = new Set();
  const addRelativeCandidate = (baseUrl, moduleName) => {
    if (!baseUrl) {
      return;
    }

    try {
      candidateUrls.add(new URL(`./${moduleName}`, baseUrl).toString());
    } catch (_error) {
      // Ignore invalid base URLs and continue with fallbacks.
    }
  };

  const moduleNames = ["heating-control-card.js", "button-switch-card.js"];

  for (const moduleName of moduleNames) {
    addRelativeCandidate(typeof import.meta !== "undefined" ? import.meta.url : null, moduleName);
    addRelativeCandidate(findScriptSource(), moduleName);
    candidateUrls.add(`/hacsfiles/ha-heat-design/${moduleName}`);
    candidateUrls.add(`/local/community/ha-heat-design/${moduleName}`);
    candidateUrls.add(`/local/${moduleName}`);
  }

  const hasRequiredElements = () =>
    customElements.get("heating-control-card") && customElements.get("button-switch-card");

  const loadCardModules = async () => {
    if (hasRequiredElements()) {
      return;
    }

    let lastError = null;

    for (const moduleUrl of candidateUrls) {
      try {
        await import(moduleUrl);

        if (hasRequiredElements()) {
          return;
        }
      } catch (error) {
        lastError = error;
      }
    }

    // eslint-disable-next-line no-console
    console.error("[ha-heat-design] Failed to load card modules from known paths", {
      attemptedUrls: [...candidateUrls],
      lastError
    });
  };

  loadCardModules();
})();
