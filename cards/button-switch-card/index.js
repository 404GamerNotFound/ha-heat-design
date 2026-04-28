import { ButtonSwitchCard } from "./component.js";
import { ButtonSwitchCardEditor } from "./editor.js";

if (!customElements.get("button-switch-card")) {
  customElements.define("button-switch-card", ButtonSwitchCard);
}

if (!customElements.get("button-switch-card-editor")) {
  customElements.define("button-switch-card-editor", ButtonSwitchCardEditor);
}

window.customCards = window.customCards || [];

const buttonSwitchPickerCards = [
  {
    type: "button-switch-card",
    name: "Button Switch Card",
    description: "Switch on/off controller card with a visual editor and preview support."
  }
];

buttonSwitchPickerCards.forEach((cardDefinition) => {
  const compatibleTypes = [cardDefinition.type, `custom:${cardDefinition.type}`];
  const alreadyRegistered = window.customCards.some((entry) => compatibleTypes.includes(entry.type));
  if (alreadyRegistered) return;

  window.customCards.push({
    ...cardDefinition,
    preview: true,
    documentationURL: "https://github.com/404GamerNotFound/ha-button-design"
  });
});

export { ButtonSwitchCard, ButtonSwitchCardEditor };
