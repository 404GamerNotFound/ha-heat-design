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

  const scriptSource = findScriptSource();
  const candidateUrls = [];

  if (scriptSource) {
    candidateUrls.push(new URL("./heating-control-card.js", scriptSource).toString());
  }

  // Backward-compatible fallbacks for uncommon Home Assistant resource setups.
  candidateUrls.push("/hacsfiles/ha-heat-design/heating-control-card.js");
  candidateUrls.push("/local/community/ha-heat-design/heating-control-card.js");
  candidateUrls.push("/local/heating-control-card.js");

  const uniqueUrls = [...new Set(candidateUrls)];

  const loadCardModule = async () => {
    for (const moduleUrl of uniqueUrls) {
      try {
        await import(moduleUrl);
        if (customElements.get("heating-control-card")) {
          return;
        }
      } catch (error) {
        // Keep trying fallback paths before reporting a final error.
      }
    }

    // Keep a clear error in the browser console when the card file cannot be loaded.
    // eslint-disable-next-line no-console
    console.error("[ha-heat-design] Failed to load heating-control-card.js from known paths", {
      attemptedUrls: uniqueUrls
    });
  };

  loadCardModule();
})();
