import { HeatingControlCard } from "./cards/heating-control-card/component.js";

if (!customElements.get("heating-control-card")) {
  customElements.define("heating-control-card", HeatingControlCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "heating-control-card")) {
  window.customCards.push({
    type: "heating-control-card",
    name: "Heating Control Card",
    description: "A custom orange heating dashboard card with a thermostat slider and 24h history drawer.",
    preview: true
  });
}

export { HeatingControlCard };
