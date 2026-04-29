const defineCard = async () => {
  if (customElements.get("ha-markdown-title-design") && customElements.get("ha-markdown-title-design-editor")) {
    return;
  }

  const candidateUrls = new Set();

  const addCandidate = (baseUrl, relativePath) => {
    if (!baseUrl) {
      return;
    }

    try {
      candidateUrls.add(new URL(relativePath, baseUrl).toString());
    } catch (_error) {
      // Ignore invalid URLs and continue with the next candidate.
    }
  };

  addCandidate(typeof import.meta !== "undefined" ? import.meta.url : null, "./cards/markdown-title-card/index.js");
  candidateUrls.add("/hacsfiles/ha-heat-design/cards/markdown-title-card/index.js");
  candidateUrls.add("/local/community/ha-heat-design/cards/markdown-title-card/index.js");
  candidateUrls.add("/local/cards/markdown-title-card/index.js");

  let lastError = null;

  for (const url of candidateUrls) {
    try {
      await import(url);
      if (customElements.get("ha-markdown-title-design") && customElements.get("ha-markdown-title-design-editor")) {
        return;
      }
    } catch (error) {
      lastError = error;
    }
  }

  // eslint-disable-next-line no-console
  console.error("[ha-heat-design] Unable to load markdown-title-card module", {
    attemptedUrls: [...candidateUrls],
    lastError
  });
};

void defineCard();
