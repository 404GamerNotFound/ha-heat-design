(() => {
  // Load the card definition in a way that works for both module and non-module resource setups.
  if (customElements.get("heating-control-card")) {
    return;
  }

  const currentScript = document.currentScript;
  const baseUrl = currentScript?.src ? new URL(".", currentScript.src).href : window.location.href;
  const cardModuleUrl = new URL("heating-control-card.js", baseUrl).toString();

  import(cardModuleUrl).catch((error) => {
    // Keep a clear error in the browser console when the card file cannot be loaded.
    // eslint-disable-next-line no-console
    console.error("[ha-heat-design] Failed to load heating-control-card.js", error);
  });
})();
