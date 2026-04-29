import "./heating-control-card.js";
import "./button-switch-card.js";
import "./markdown-title-card.js";

const HA_HEAT_DESIGN_DEBUG_FLAG = "__HA_HEAT_DESIGN_LOADED__";

if (!window[HA_HEAT_DESIGN_DEBUG_FLAG]) {
  window[HA_HEAT_DESIGN_DEBUG_FLAG] = true;

  const registeredCards = [
    "heating-control-card",
    "button-switch-card",
    "ha-markdown-title-design"
  ];

  const registrationState = registeredCards.reduce((state, cardTag) => {
    state[cardTag] = Boolean(customElements.get(cardTag));
    return state;
  }, {});

  console.info(
    "%cHA Heat Design bundle loaded",
    "color: #ff9800; font-weight: bold;",
    {
      version: "dev",
      cards: registeredCards,
      registrationState
    }
  );
}
