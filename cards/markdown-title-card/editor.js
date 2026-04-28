import { cardName, defaultConfig, normalizeConfig } from "./config.js";

export class HaMarkdownTitleDesignEditor extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._config = { ...defaultConfig };
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

