import { cardName } from "./config.js";
import { HaMarkdownTitleDesignCard } from "./component.js";
import { HaMarkdownTitleDesignEditor } from "./editor.js";

if (!customElements.get(cardName)) {
  customElements.define(cardName, HaMarkdownTitleDesignCard);
}

if (!customElements.get(`${cardName}-editor`)) {
  customElements.define(`${cardName}-editor`, HaMarkdownTitleDesignEditor);
}

window.customCards = window.customCards || [];

if (!window.customCards.some((card) => card.type === cardName)) {
  window.customCards.push({
    type: cardName,
    name: "HA Markdown Title Design",
    preview: true,
    description: "Stylish title/subtitle card that can replace markdown cards in Home Assistant dashboards.",
    documentationURL: "https://github.com/404GamerNotFound/ha-markdown-title-design"
  });
}

export { HaMarkdownTitleDesignCard, HaMarkdownTitleDesignEditor };
