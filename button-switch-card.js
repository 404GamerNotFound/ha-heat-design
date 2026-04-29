const defineCard = async () => {
  if (customElements.get("button-switch-card") && customElements.get("button-switch-card-editor")) {
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

  addCandidate(typeof import.meta !== "undefined" ? import.meta.url : null, "./cards/button-switch-card/index.js");
  candidateUrls.add("/hacsfiles/ha-heat-design/cards/button-switch-card/index.js");
  candidateUrls.add("/local/community/ha-heat-design/cards/button-switch-card/index.js");
  candidateUrls.add("/local/cards/button-switch-card/index.js");

  let lastError = null;

  for (const url of candidateUrls) {
    try {
      await import(url);
      if (customElements.get("button-switch-card") && customElements.get("button-switch-card-editor")) {
        return;
      }
    } catch (error) {
      lastError = error;
    }
  }

  // eslint-disable-next-line no-console
  console.error("[ha-heat-design] Unable to load button-switch-card module", {
    attemptedUrls: [...candidateUrls],
    lastError
  });
};

void defineCard();
