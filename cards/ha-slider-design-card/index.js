export class HaSliderDesignCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("ha-slider-design-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:ha-slider-design",
      entity: "light.living_room",
      name: "Living Room"
    };
  }

  constructor() {
    super();
    this._hass = null;
    this.config = null;
    this._rootReady = false;
    this._debounceTimer = null;
    this._lastBrightnessValue = null;
    this._refs = {};
  }

  setConfig(config) {
    if (!config || !config.entity) {
      throw new Error("You must define an entity.");
    }

    this.config = {
      name: "",
      icon: "mdi:lightbulb",
      background_start: "#ffa20f",
      background_end: "#ff9800",
      track_color: "rgba(255,255,255,0.20)",
      track_inner_color: "rgba(255,255,255,0.42)",
      knob_color: "#d9d9d9",
      chip_background: "rgba(216, 133, 0, 0.78)",
      chip_text_color: "#ffffff",
      state_text_on: "Active",
      state_text_off: "Idle",
      default_color: "#ffd39a",
      slider_height: 60,
      show_power_chip: true,
      show_state_chip: true,
      show_color_controls: true,
      tap_action: { action: "toggle" },
      hold_action: { action: "more-info" },
      double_tap_action: { action: "none" },
      ...config
    };

    this._ensureRoot();
    this._updateCard();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.config) return;
    this._ensureRoot();
    this._updateCard();
  }

  getCardSize() {
    return 2;
  }

  _ensureRoot() {
    if (this._rootReady) return;

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
      </style>
      <ha-card>
        <div class="card" id="main-card">
          <div class="title" id="title"></div>
          <div class="slider-shell">
            <input id="brightness" type="range" min="1" max="100" />
            <div class="icon-chip"><ha-icon id="icon"></ha-icon></div>
          </div>
          <div class="meta-row" id="meta-row">
            <div class="chip hidden" id="power-chip"></div>
            <div class="chip state-chip hidden" id="state-chip"></div>
          </div>
          <div class="color-row hidden" id="color-row">
            <input id="color-picker" class="color-picker" type="color" />
            <button id="color-apply" class="color-apply" type="button">Apply color</button>
          </div>
        </div>
      </ha-card>
    `;

    this._refs = {
      card: this.shadowRoot.getElementById("main-card"),
      title: this.shadowRoot.getElementById("title"),
      icon: this.shadowRoot.getElementById("icon"),
      brightness: this.shadowRoot.getElementById("brightness"),
      metaRow: this.shadowRoot.getElementById("meta-row"),
      powerChip: this.shadowRoot.getElementById("power-chip"),
      stateChip: this.shadowRoot.getElementById("state-chip"),
      colorRow: this.shadowRoot.getElementById("color-row"),
      colorPicker: this.shadowRoot.getElementById("color-picker"),
      colorApply: this.shadowRoot.getElementById("color-apply")
    };

    this._attachEventListeners();
    this._rootReady = true;
  }

  _attachEventListeners() {}
  _updateCard() {}
}

export class HaSliderDesignCardEditor extends HTMLElement {}
