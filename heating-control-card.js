const defineCard = async () => {
  if (customElements.get("heating-control-card") && customElements.get("heating-control-card-editor")) {
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

  addCandidate(typeof import.meta !== "undefined" ? import.meta.url : null, "./cards/heating-control-card/index.js");
  candidateUrls.add("/hacsfiles/ha-heat-design/cards/heating-control-card/index.js");
  candidateUrls.add("/local/community/ha-heat-design/cards/heating-control-card/index.js");
  candidateUrls.add("/local/cards/heating-control-card/index.js");

  let lastError = null;

  for (const url of candidateUrls) {
    try {
      await import(url);
      if (customElements.get("heating-control-card") && customElements.get("heating-control-card-editor")) {
        return;
      }
    } catch (error) {
      lastError = error;
    }
  }

  // eslint-disable-next-line no-console
  console.error("[ha-heat-design] Unable to load heating-control-card module", {
    attemptedUrls: [...candidateUrls],
    lastError
  });
};

void defineCard();
