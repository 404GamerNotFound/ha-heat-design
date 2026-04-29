import { HeatingControlCard } from "./component.js";
import { getCardSectionTranslations } from "./i18n.js";

export class HeatingControlCardEditor extends HTMLElement {
  static get EDITOR_TRANSLATIONS() {
    return getCardSectionTranslations("heatingControlCardEditor");
  }

  constructor() {
    super();
    this._hass = null;
    this._config = null;
    this._language = "en";
    this._rendered = false;
    this._updatingForm = false;
  }

  set hass(hass) {
    this._hass = hass;
    const newLanguage = this._resolveLanguageCode(hass);
    const languageChanged = newLanguage !== this._language;
    this._language = newLanguage;

    if (!this._config) {
      return;
    }

    if (!this._rendered || languageChanged) {
      this._render();
      return;
    }

    this._updateFormValues();
  }

  setConfig(config) {
    this._config = {
      ...HeatingControlCard.getStubConfig(),
      ...config
    };

    if (!this._rendered) {
      this._render();
      return;
    }

    this._updateFormValues();
  }

  _render() {
    if (!this._config) {
      return;
    }

    this.innerHTML = `
      <style>
        .editor {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
        }

        input,
        select {
          border: 1px solid var(--divider-color, #ccc);
          border-radius: 8px;
          padding: 8px;
          font-size: 14px;
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color, #111);
          box-sizing: border-box;
          width: 100%;
        }

        .full {
          grid-column: 1 / -1;
        }

        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .checkbox-row input {
          width: auto;
        }
      </style>

      <div class="editor">
        ${this._textField("entity", this._te("climateEntity"), true)}
        ${this._textField("humidity_entity", this._te("humidityEntity"))}
        ${this._textField("outdoor_temp_entity", this._te("outdoorTemperatureEntity"))}
        ${this._textField("window_contact_entity", this._te("windowContactEntity"))}
        ${this._textField("co2_entity", this._te("co2Entity"))}
        ${this._textField("heating_active_since_entity", this._te("heatingActiveEntity"))}
        ${this._textField("battery_entity", this._te("batteryEntity"))}
        ${this._textField("name", this._te("cardName"))}
        ${this._numberField("min_temp", this._te("minimumTemperature"))}
        ${this._numberField("max_temp", this._te("maximumTemperature"))}
        ${this._numberField("step", this._te("temperatureStep"), "0.1")}
        ${this._colorField("background_start", this._te("backgroundStart"))}
        ${this._colorField("background_end", this._te("backgroundEnd"))}
        ${this._selectField("slider_orientation", this._te("sliderOrientation"), ["vertical", "horizontal"])}
        ${this._selectField("slider_orientation_mobile", this._te("mobileOrientation"), ["", "vertical", "horizontal"])}
        ${this._selectField("slider_orientation_desktop", this._te("desktopOrientation"), ["", "vertical", "horizontal"])}
        ${this._selectField("desktop_layout", this._te("desktopLayout"), ["standard", "compact"])}
        ${this._datalistTextField("heating_on_mode", this._te("heatingOnMode"), "heating-mode-presets")}
        <datalist id="heating-mode-presets">
          <option value="heat"></option>
          <option value="auto"></option>
          <option value="heat_cool"></option>
          <option value="cool"></option>
          <option value="dry"></option>
          <option value="fan_only"></option>
          <option value="heat,auto"></option>
          <option value="heat,auto,heat_cool"></option>
        </datalist>
        ${this._selectField("history_range", this._te("historyRange"), ["24h", "7d", "30d"])}
        <label class="full checkbox-row">
          <input type="checkbox" data-key="preview" />
          <span>${this._te("previewMode")}</span>
        </label>
      </div>
    `;

    this._bindEvents();
    this._rendered = true;
    this._updateFormValues(true);
  }

  _bindEvents() {
    this.querySelectorAll("[data-key]").forEach((input) => {
      input.addEventListener("input", (event) => this._handleValueChange(event));
      input.addEventListener("change", (event) => this._handleValueChange(event));
    });
  }

  _updateFormValues(force = false) {
    if (!this._config || this._updatingForm) {
      return;
    }

    this._updatingForm = true;

    const activeElement = this.querySelector(":focus");
    const activeKey = activeElement?.dataset?.key || null;

    this.querySelectorAll("[data-key]").forEach((field) => {
      const key = field.dataset.key;
      if (!key) {
        return;
      }

      if (!force && activeKey === key) {
        return;
      }

      const configValue = this._config[key];

      if (field.type === "checkbox") {
        const nextValue = Boolean(configValue);
        if (field.checked !== nextValue) {
          field.checked = nextValue;
        }
        return;
      }

      const nextValue = configValue ?? "";

      if (field.value !== String(nextValue)) {
        field.value = String(nextValue);
      }
    });

    this._updatingForm = false;
  }

  _textField(key, label, required = false) {
    return `
      <label>
        <span>${label}</span>
        <input type="text" data-key="${key}" ${required ? "required" : ""} />
      </label>
    `;
  }

  _datalistTextField(key, label, listId) {
    return `
      <label>
        <span>${label}</span>
        <input type="text" data-key="${key}" list="${listId}" />
      </label>
    `;
  }

  _numberField(key, label, step = "0.5") {
    return `
      <label>
        <span>${label}</span>
        <input type="number" data-key="${key}" step="${step}" />
      </label>
    `;
  }

  _colorField(key, label) {
    return `
      <label>
        <span>${label}</span>
        <input type="text" data-key="${key}" placeholder="#ffa20f" />
      </label>
    `;
  }

  _selectField(key, label, options) {
    const optionsMarkup = options
      .map((option) => {
        const optionLabel = option === "" ? this._te("useDefault") : option;
        return `<option value="${option}">${optionLabel}</option>`;
      })
      .join("");

    return `
      <label>
        <span>${label}</span>
        <select data-key="${key}">
          ${optionsMarkup}
        </select>
      </label>
    `;
  }

  _handleValueChange(event) {
    if (this._updatingForm) {
      return;
    }

    const target = event.target;
    const key = target.dataset.key;
    if (!key) {
      return;
    }

    let value;

    if (target.type === "checkbox") {
      value = target.checked;
    } else if (target.type === "number") {
      value = target.value === "" ? undefined : Number(target.value);
    } else {
      value = target.value;
    }

    const updatedConfig = { ...this._config };

    if (value === "" || value === undefined) {
      delete updatedConfig[key];
    } else {
      updatedConfig[key] = value;
    }

    this._config = updatedConfig;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: updatedConfig },
        bubbles: true,
        composed: true
      })
    );
  }

  _resolveLanguageCode(hass) {
    const language =
      hass?.language ||
      hass?.locale?.language ||
      hass?.selectedLanguage ||
      (typeof navigator !== "undefined" ? navigator.language : "en");

    const shortCode = String(language || "en").toLowerCase().split("-")[0];
    return HeatingControlCardEditor.EDITOR_TRANSLATIONS[shortCode] ? shortCode : "en";
  }

  _te(key) {
    return (
      HeatingControlCardEditor.EDITOR_TRANSLATIONS[this._language]?.[key] ??
      HeatingControlCardEditor.EDITOR_TRANSLATIONS.en[key] ??
      key
    );
  }
}

