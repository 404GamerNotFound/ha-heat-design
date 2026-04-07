(() => {
  // Load the card definition in a way that works for both module and non-module resource setups.
  if (customElements.get("heating-control-card")) {
    return;
  }

  const currentScript = document.currentScript;
  const matchingScript = Array.from(document.querySelectorAll("script[src]"))
    .reverse()
    .find((script) => script.src.includes("ha-heat-design.js"));
  const scriptUrl = currentScript?.src || matchingScript?.src || window.location.href;
  const cardModuleUrl = new URL("./heating-control-card.js", scriptUrl).toString();

  import(cardModuleUrl).catch((error) => {
    // Keep a clear error in the browser console when the card file cannot be loaded.
    // eslint-disable-next-line no-console
    console.error("[ha-heat-design] Failed to load heating-control-card.js", error);
  });
})();
