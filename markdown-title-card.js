const CARD_NAME = "ha-markdown-title-design";

const DEFAULT_CONFIG = {
  type: `custom:${CARD_NAME}`,
  title: "",
  subtitle: "",
  text: "",
  align: "center",

  background_start: "#ffad10",
  background_end: "#ff9f00",
  gradient_direction: 180,

  title_color: "#ffffff",
  subtitle_color: "rgba(255,255,255,0.88)",
  text_color: "rgba(255,255,255,0.92)",

  title_size: 42,
  subtitle_size: 22,
  text_size: 16,

  title_weight: 800,
  subtitle_weight: 600,
  text_weight: 500,

  title_line_height: 1.12,
  subtitle_line_height: 1.2,
  text_line_height: 1.35,

  title_letter_spacing: 0.01,
  subtitle_letter_spacing: 0,
  text_letter_spacing: 0,

  padding_top: 28,
  padding_bottom: 24,
  padding_left: 24,
  padding_right: 24,

  border_radius: 28,
  min_height: 130,
  max_content_width: 100,

  subtitle_spacing: 10,
  divider_spacing: 14,
  text_spacing: 14,

  show_divider: false,
  divider_color: "rgba(255,255,255,0.34)",
  divider_width: 96,
  divider_height: 2,

  uppercase_title: false,

  enable_shadow: true,
  shadow_blur: 24,
  shadow_opacity: 0.2,
};

function clampNumber(value, fallback, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function normalizeConfig(config) {
  return {
    ...DEFAULT_CONFIG,
    ...(config || {}),
    align: ["left", "center", "right"].includes(config?.align) ? config.align : DEFAULT_CONFIG.align,
    gradient_direction: clampNumber(config?.gradient_direction, DEFAULT_CONFIG.gradient_direction, 0, 360),

    title_size: clampNumber(config?.title_size, DEFAULT_CONFIG.title_size, 10, 200),
    subtitle_size: clampNumber(config?.subtitle_size, DEFAULT_CONFIG.subtitle_size, 8, 200),
    text_size: clampNumber(config?.text_size, DEFAULT_CONFIG.text_size, 8, 200),

    title_weight: clampNumber(config?.title_weight, DEFAULT_CONFIG.title_weight, 100, 1000),
    subtitle_weight: clampNumber(config?.subtitle_weight, DEFAULT_CONFIG.subtitle_weight, 100, 1000),
    text_weight: clampNumber(config?.text_weight, DEFAULT_CONFIG.text_weight, 100, 1000),

    title_line_height: clampNumber(config?.title_line_height, DEFAULT_CONFIG.title_line_height, 0.6, 3),
    subtitle_line_height: clampNumber(config?.subtitle_line_height, DEFAULT_CONFIG.subtitle_line_height, 0.6, 3),
    text_line_height: clampNumber(config?.text_line_height, DEFAULT_CONFIG.text_line_height, 0.6, 3),

    title_letter_spacing: clampNumber(config?.title_letter_spacing, DEFAULT_CONFIG.title_letter_spacing, -1, 5),
    subtitle_letter_spacing: clampNumber(config?.subtitle_letter_spacing, DEFAULT_CONFIG.subtitle_letter_spacing, -1, 5),
    text_letter_spacing: clampNumber(config?.text_letter_spacing, DEFAULT_CONFIG.text_letter_spacing, -1, 5),

    padding_top: clampNumber(config?.padding_top, DEFAULT_CONFIG.padding_top, 0, 200),
    padding_bottom: clampNumber(config?.padding_bottom, DEFAULT_CONFIG.padding_bottom, 0, 200),
    padding_left: clampNumber(config?.padding_left, DEFAULT_CONFIG.padding_left, 0, 200),
    padding_right: clampNumber(config?.padding_right, DEFAULT_CONFIG.padding_right, 0, 200),

    border_radius: clampNumber(config?.border_radius, DEFAULT_CONFIG.border_radius, 0, 100),
    min_height: clampNumber(config?.min_height, DEFAULT_CONFIG.min_height, 0, 2000),
    max_content_width: clampNumber(config?.max_content_width, DEFAULT_CONFIG.max_content_width, 10, 100),

    subtitle_spacing: clampNumber(config?.subtitle_spacing, DEFAULT_CONFIG.subtitle_spacing, 0, 200),
    divider_spacing: clampNumber(config?.divider_spacing, DEFAULT_CONFIG.divider_spacing, 0, 200),
    text_spacing: clampNumber(config?.text_spacing, DEFAULT_CONFIG.text_spacing, 0, 200),

    divider_width: clampNumber(config?.divider_width, DEFAULT_CONFIG.divider_width, 10, 1000),
    divider_height: clampNumber(config?.divider_height, DEFAULT_CONFIG.divider_height, 1, 30),

    shadow_blur: clampNumber(config?.shadow_blur, DEFAULT_CONFIG.shadow_blur, 0, 120),
    shadow_opacity: clampNumber(config?.shadow_opacity, DEFAULT_CONFIG.shadow_opacity, 0, 1),

    show_divider: Boolean(config?.show_divider),
    uppercase_title: Boolean(config?.uppercase_title),
    enable_shadow: config?.enable_shadow !== false,
  };
}

function configsEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

class HaMarkdownTitleDesignCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("ha-markdown-title-design-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:ha-markdown-title-design",
      title: "Living Room",
      subtitle: "Lights and media",
      text: "Optional description text",
    };
  }

  constructor() {
    super();
    this._hass = null;
    this.config = null;
    this._rootReady = false;
    this._refs = {};
    this._updateScheduled = false;
  }

  setConfig(config) {
    if (!config || typeof config !== "object") {
      throw new Error("Invalid configuration.");
    }

    const normalized = normalizeConfig(config);
    if (this.config && configsEqual(this.config, normalized)) return;

    this.config = normalized;
    this._ensureRoot();
    this._scheduleUpdate();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.config) return;
    this._ensureRoot();
    this._scheduleUpdate();
  }

  getCardSize() {
    const hasText = Boolean(String(this.config?.text || "").trim());
    return hasText ? 2 : 1;
  }

  _ensureRoot() {
    if (this._rootReady) return;

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        ha-card {
          overflow: hidden;
          border-radius: var(--card-radius, 28px);
          background: transparent;
        }

        .card {
          box-sizing: border-box;
          min-height: var(--card-min-height, 130px);
          border-radius: var(--card-radius, 28px);
          padding:
            var(--card-padding-top, 28px)
            var(--card-padding-right, 24px)
            var(--card-padding-bottom, 24px)
            var(--card-padding-left, 24px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: var(--content-align, center);
          text-align: var(--text-align, center);
          background: linear-gradient(
            var(--gradient-direction, 180deg),
            var(--bg-start),
            var(--bg-end)
          );
          box-shadow: var(--card-shadow, 0 9px 24px rgba(0, 0, 0, 0.2));
          transition: box-shadow 120ms ease, transform 120ms ease;
        }

        .content {
          width: 100%;
          max-width: var(--content-max-width, 100%);
        }

        .title,
        .subtitle,
        .divider,
        .text {
          box-sizing: border-box;
        }

        .title {
          color: var(--title-color, #fff);
          font-size: var(--title-size, 42px);
          font-weight: var(--title-weight, 800);
          line-height: var(--title-line-height, 1.12);
          letter-spacing: calc(var(--title-letter-spacing, 0.01) * 1em);
          margin: 0;
          word-break: break-word;
        }

        .subtitle {
          margin-top: var(--subtitle-spacing, 10px);
          color: var(--subtitle-color, rgba(255,255,255,0.88));
          font-size: var(--subtitle-size, 22px);
          font-weight: var(--subtitle-weight, 600);
          line-height: var(--subtitle-line-height, 1.2);
          letter-spacing: calc(var(--subtitle-letter-spacing, 0) * 1em);
          word-break: break-word;
        }

        .divider {
          margin-top: var(--divider-spacing, 14px);
          width: var(--divider-width, 96px);
          height: var(--divider-height, 2px);
          border-radius: 999px;
          background: var(--divider-color, rgba(255,255,255,0.34));
        }

        .text {
          margin-top: var(--text-spacing, 14px);
          color: var(--text-color, rgba(255,255,255,0.92));
          font-size: var(--text-size, 16px);
          font-weight: var(--text-weight, 500);
          line-height: var(--text-line-height, 1.35);
          letter-spacing: calc(var(--text-letter-spacing, 0) * 1em);
          width: 100%;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .hidden {
          display: none !important;
        }
      </style>

      <ha-card>
        <div class="card" id="card">
          <div class="content" id="content">
            <div class="title" id="title"></div>
            <div class="subtitle" id="subtitle"></div>
            <div class="divider" id="divider"></div>
            <div class="text" id="text"></div>
          </div>
        </div>
      </ha-card>
    `;

    this._refs = {
      card: this.shadowRoot.getElementById("card"),
      content: this.shadowRoot.getElementById("content"),
      title: this.shadowRoot.getElementById("title"),
      subtitle: this.shadowRoot.getElementById("subtitle"),
      divider: this.shadowRoot.getElementById("divider"),
      text: this.shadowRoot.getElementById("text"),
    };

    this._rootReady = true;
  }

  _scheduleUpdate() {
    if (this._updateScheduled) return;
    this._updateScheduled = true;

    requestAnimationFrame(() => {
      this._updateScheduled = false;
      this._updateCard();
    });
  }

  _updateCard() {
    if (!this._rootReady || !this.config) return;

    const cfg = this.config;
    const title = String(cfg.title || "").trim();
    const subtitle = String(cfg.subtitle || "").trim();
    const bodyText = String(cfg.text || "").trim();

    const cssAlign =
      cfg.align === "left" ? "flex-start" :
      cfg.align === "right" ? "flex-end" :
      "center";

    const shadow = cfg.enable_shadow
      ? `0 9px ${cfg.shadow_blur}px rgba(0, 0, 0, ${cfg.shadow_opacity})`
      : "none";

    this._refs.card.style.setProperty("--bg-start", cfg.background_start);
    this._refs.card.style.setProperty("--bg-end", cfg.background_end);
    this._refs.card.style.setProperty("--gradient-direction", `${cfg.gradient_direction}deg`);

    this._refs.card.style.setProperty("--title-color", cfg.title_color);
    this._refs.card.style.setProperty("--subtitle-color", cfg.subtitle_color);
    this._refs.card.style.setProperty("--text-color", cfg.text_color);

    this._refs.card.style.setProperty("--title-size", `${cfg.title_size}px`);
    this._refs.card.style.setProperty("--subtitle-size", `${cfg.subtitle_size}px`);
    this._refs.card.style.setProperty("--text-size", `${cfg.text_size}px`);

    this._refs.card.style.setProperty("--title-weight", `${cfg.title_weight}`);
    this._refs.card.style.setProperty("--subtitle-weight", `${cfg.subtitle_weight}`);
    this._refs.card.style.setProperty("--text-weight", `${cfg.text_weight}`);

    this._refs.card.style.setProperty("--title-line-height", `${cfg.title_line_height}`);
    this._refs.card.style.setProperty("--subtitle-line-height", `${cfg.subtitle_line_height}`);
    this._refs.card.style.setProperty("--text-line-height", `${cfg.text_line_height}`);

    this._refs.card.style.setProperty("--title-letter-spacing", `${cfg.title_letter_spacing}`);
    this._refs.card.style.setProperty("--subtitle-letter-spacing", `${cfg.subtitle_letter_spacing}`);
    this._refs.card.style.setProperty("--text-letter-spacing", `${cfg.text_letter_spacing}`);

    this._refs.card.style.setProperty("--card-padding-top", `${cfg.padding_top}px`);
    this._refs.card.style.setProperty("--card-padding-right", `${cfg.padding_right}px`);
    this._refs.card.style.setProperty("--card-padding-bottom", `${cfg.padding_bottom}px`);
    this._refs.card.style.setProperty("--card-padding-left", `${cfg.padding_left}px`);

    this._refs.card.style.setProperty("--card-radius", `${cfg.border_radius}px`);
    this._refs.card.style.setProperty("--card-min-height", `${cfg.min_height}px`);
    this._refs.card.style.setProperty("--content-max-width", `${cfg.max_content_width}%`);

    this._refs.card.style.setProperty("--subtitle-spacing", `${cfg.subtitle_spacing}px`);
    this._refs.card.style.setProperty("--divider-spacing", `${cfg.divider_spacing}px`);
    this._refs.card.style.setProperty("--text-spacing", `${cfg.text_spacing}px`);

    this._refs.card.style.setProperty("--divider-color", cfg.divider_color);
    this._refs.card.style.setProperty("--divider-width", `${cfg.divider_width}px`);
    this._refs.card.style.setProperty("--divider-height", `${cfg.divider_height}px`);

    this._refs.card.style.setProperty("--content-align", cssAlign);
    this._refs.card.style.setProperty("--text-align", cfg.align);
    this._refs.card.style.setProperty("--card-shadow", shadow);

    this._refs.title.textContent = cfg.uppercase_title ? title.toUpperCase() : title;
    this._refs.subtitle.textContent = subtitle;
    this._refs.text.textContent = bodyText;

    this._refs.title.classList.toggle("hidden", !title);
    this._refs.subtitle.classList.toggle("hidden", !subtitle);
    this._refs.text.classList.toggle("hidden", !bodyText);

    const hasVisibleTitleBlock = !!title || !!subtitle;
    this._refs.divider.classList.toggle("hidden", !(cfg.show_divider && hasVisibleTitleBlock));
  }
}

class HaMarkdownTitleDesignEditor extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._config = { ...DEFAULT_CONFIG };
    this._rootReady = false;
    this._inputHandler = this._onInput.bind(this);
    this._changeHandler = this._onChange.bind(this);
    this._emitTimer = null;
    this._lastEmittedConfigString = "";
  }

  setConfig(config) {
    const normalized = normalizeConfig(config || {});
    this._config = normalized;
    this._ensureRoot();
    this._updateValues();
  }

  set hass(hass) {
    this._hass = hass;
    this._ensureRoot();
  }

  _ensureRoot() {
    if (this._rootReady) return;

    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding-top: 6px;
        }

        .layout {
          display: grid;
          gap: 14px;
        }

        .section {
          border-radius: 12px;
          border: 1px solid var(--divider-color, rgba(120,120,120,0.35));
          padding: 12px;
          background: var(--card-background-color, transparent);
        }

        .section-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .grid {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .field.checkbox {
          flex-direction: row;
          align-items: center;
          min-height: 40px;
          gap: 10px;
        }

        label {
          font-size: 0.9rem;
          font-weight: 600;
        }

        input,
        select,
        textarea {
          box-sizing: border-box;
          width: 100%;
          padding: 9px 11px;
          border-radius: 9px;
          border: 1px solid var(--divider-color, #999);
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color, #000);
          font: inherit;
        }

        textarea {
          min-height: 96px;
          resize: vertical;
        }

        input[type="checkbox"] {
          width: 18px;
          height: 18px;
          margin: 0;
          padding: 0;
        }

        input[type="color"] {
          min-height: 42px;
          padding: 4px;
          cursor: pointer;
        }

        .hint {
          font-size: 0.78rem;
          opacity: 0.75;
        }
      </style>

      <div class="layout">
        <div class="section">
          <div class="section-title">Content</div>
          <div class="grid">
            ${this._textField("Title", "title")}
            ${this._textField("Subtitle", "subtitle")}
            ${this._selectField("Alignment", "align", ["left", "center", "right"])}
            ${this._checkboxField("Uppercase title", "uppercase_title")}
            ${this._checkboxField("Show divider", "show_divider")}
            ${this._textareaField("Additional text", "text")}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Colors & Background</div>
          <div class="grid">
            ${this._colorField("Background start", "background_start")}
            ${this._colorField("Background end", "background_end")}
            ${this._numberField("Gradient direction", "gradient_direction", 0, 360, 1)}

            ${this._colorField("Title color", "title_color")}
            ${this._textField("Subtitle color", "subtitle_color", "e.g. rgba(255,255,255,0.88)")}
            ${this._textField("Text color", "text_color", "e.g. rgba(255,255,255,0.92)")}
            ${this._textField("Divider color", "divider_color", "e.g. rgba(255,255,255,0.34)")}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Typography</div>
          <div class="grid">
            ${this._numberField("Title size", "title_size", 10, 200, 1)}
            ${this._numberField("Subtitle size", "subtitle_size", 8, 200, 1)}
            ${this._numberField("Text size", "text_size", 8, 200, 1)}

            ${this._numberField("Title weight", "title_weight", 100, 1000, 100)}
            ${this._numberField("Subtitle weight", "subtitle_weight", 100, 1000, 100)}
            ${this._numberField("Text weight", "text_weight", 100, 1000, 100)}

            ${this._numberField("Title line-height", "title_line_height", 0.6, 3, 0.01)}
            ${this._numberField("Subtitle line-height", "subtitle_line_height", 0.6, 3, 0.01)}
            ${this._numberField("Text line-height", "text_line_height", 0.6, 3, 0.01)}

            ${this._numberField("Title letter-spacing", "title_letter_spacing", -1, 5, 0.01)}
            ${this._numberField("Subtitle letter-spacing", "subtitle_letter_spacing", -1, 5, 0.01)}
            ${this._numberField("Text letter-spacing", "text_letter_spacing", -1, 5, 0.01)}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Layout</div>
          <div class="grid">
            ${this._numberField("Card min height", "min_height", 0, 2000, 1)}
            ${this._numberField("Border radius", "border_radius", 0, 100, 1)}
            ${this._numberField("Max content width (%)", "max_content_width", 10, 100, 1)}

            ${this._numberField("Padding top", "padding_top", 0, 200, 1)}
            ${this._numberField("Padding right", "padding_right", 0, 200, 1)}
            ${this._numberField("Padding bottom", "padding_bottom", 0, 200, 1)}
            ${this._numberField("Padding left", "padding_left", 0, 200, 1)}

            ${this._numberField("Subtitle spacing", "subtitle_spacing", 0, 200, 1)}
            ${this._numberField("Divider spacing", "divider_spacing", 0, 200, 1)}
            ${this._numberField("Text spacing", "text_spacing", 0, 200, 1)}

            ${this._numberField("Divider width", "divider_width", 10, 1000, 1)}
            ${this._numberField("Divider height", "divider_height", 1, 30, 1)}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Shadow</div>
          <div class="grid">
            ${this._checkboxField("Enable shadow", "enable_shadow")}
            ${this._numberField("Shadow blur", "shadow_blur", 0, 120, 1)}
            ${this._numberField("Shadow opacity", "shadow_opacity", 0, 1, 0.01)}
          </div>
          <div class="hint">Subtitle/Text/Divider colors can use rgba(...). Background colors use the native color picker.</div>
        </div>
      </div>
    `;

    this.shadowRoot.addEventListener("input", this._inputHandler);
    this.shadowRoot.addEventListener("change", this._changeHandler);

    this._rootReady = true;
  }

  _textField(label, key, placeholder = "") {
    return `
      <div class="field">
        <label for="${key}">${label}</label>
        <input id="${key}" data-field="${key}" type="text" placeholder="${placeholder}">
      </div>
    `;
  }

  _textareaField(label, key) {
    return `
      <div class="field">
        <label for="${key}">${label}</label>
        <textarea id="${key}" data-field="${key}"></textarea>
      </div>
    `;
  }

  _numberField(label, key, min, max, step) {
    return `
      <div class="field">
        <label for="${key}">${label}</label>
        <input
          id="${key}"
          data-field="${key}"
          type="number"
          min="${min}"
          max="${max}"
          step="${step}"
        >
      </div>
    `;
  }

  _colorField(label, key) {
    return `
      <div class="field">
        <label for="${key}">${label}</label>
        <input id="${key}" data-field="${key}" type="color">
      </div>
    `;
  }

  _checkboxField(label, key) {
    return `
      <div class="field checkbox">
        <label for="${key}">${label}</label>
        <input id="${key}" data-field="${key}" type="checkbox">
      </div>
    `;
  }

  _selectField(label, key, options) {
    const optionHtml = options
      .map((option) => `<option value="${option}">${option}</option>`)
      .join("");

    return `
      <div class="field">
        <label for="${key}">${label}</label>
        <select id="${key}" data-field="${key}">
          ${optionHtml}
        </select>
      </div>
    `;
  }

  _onInput(event) {
    this._handleValueChanged(event, true);
  }

  _onChange(event) {
    this._handleValueChanged(event, false);
  }

  _handleValueChanged(event, isLiveInput) {
    const target = event?.target;
    if (!target?.dataset?.field) return;

    const key = target.dataset.field;
    const nextConfig = { ...this._config };
    let nextValue;

    if (target.type === "checkbox") {
      nextValue = target.checked;
    } else if (target.type === "number") {
      if (target.value === "") {
        nextValue = "";
      } else {
        const parsed = Number(target.value);
        nextValue = Number.isFinite(parsed) ? parsed : target.value;
      }
    } else {
      nextValue = target.value;
    }

    if (nextConfig[key] === nextValue) return;

    nextConfig[key] = nextValue;
    this._config = nextConfig;

    if (isLiveInput && (target.tagName === "TEXTAREA" || target.type === "text" || target.type === "number")) {
      this._emitConfigChangedDebounced();
      return;
    }

    this._emitConfigChanged();
  }

  _emitConfigChangedDebounced() {
    window.clearTimeout(this._emitTimer);
    this._emitTimer = window.setTimeout(() => {
      this._emitConfigChanged();
    }, 160);
  }

  _emitConfigChanged() {
    const normalized = normalizeConfig(this._config);
    const serialized = JSON.stringify(normalized);

    if (serialized === this._lastEmittedConfigString) return;
    this._lastEmittedConfigString = serialized;
    this._config = normalized;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: normalized },
        bubbles: true,
        composed: true,
      })
    );
  }

  _updateValues() {
    if (!this._rootReady || !this._config) return;

    const active = this.shadowRoot.activeElement;
    const fields = this.shadowRoot.querySelectorAll("[data-field]");

    fields.forEach((field) => {
      if (field === active) return;

      const key = field.dataset.field;
      const value = this._config[key];

      if (field.type === "checkbox") {
        const nextChecked = value === true;
        if (field.checked !== nextChecked) field.checked = nextChecked;
        return;
      }

      const nextValue = value == null ? "" : String(value);
      if (field.value !== nextValue) {
        try {
          field.value = nextValue;
        } catch (_error) {
          // Ignore invalid native color assignment and continue.
        }
      }
    });
  }
}

if (!customElements.get("ha-markdown-title-design")) {
  customElements.define("ha-markdown-title-design", HaMarkdownTitleDesignCard);
}

if (!customElements.get("ha-markdown-title-design-editor")) {
  customElements.define("ha-markdown-title-design-editor", HaMarkdownTitleDesignEditor);
}

window.customCards = window.customCards || [];

if (!window.customCards.some((card) => card.type === "ha-markdown-title-design")) {
  window.customCards.push({
    type: "ha-markdown-title-design",
    name: "HA Markdown Title Design",
    preview: true,
    description: "Stylish title/subtitle card that can replace markdown cards in Home Assistant dashboards.",
    documentationURL: "https://github.com/404GamerNotFound/ha-markdown-title-design",
  });
}
