import { normalizeButtonSwitchConfig } from "./config.js";

export class ButtonSwitchCardEditor extends HTMLElement {
  constructor() {
    super();
    this._config = null;
    this._hass = null;
    this._focusState = null;
    this._scrollState = null;
    this._lastInteractedField = null;
  }

  _configsEqual(leftConfig, rightConfig) {
    if (leftConfig === rightConfig) return true;
    if (!leftConfig || !rightConfig) return false;

    try {
      return JSON.stringify(leftConfig) === JSON.stringify(rightConfig);
    } catch (_error) {
      return false;
    }
  }

  _escapeAttribute(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  _findScrollContainer() {
    let current = this.parentElement;

    while (current) {
      const style = window.getComputedStyle(current);
      const canScroll =
        /(auto|scroll)/.test(style.overflowY || "") && current.scrollHeight > current.clientHeight;

      if (canScroll) {
        return current;
      }

      current = current.parentElement;
    }

    return null;
  }

  _captureScrollState() {
    const container = this._findScrollContainer();
    this._scrollState = container
      ? { type: "element", element: container, top: container.scrollTop }
      : { type: "window", top: window.scrollY };
  }

  _restoreScrollState() {
    if (!this._scrollState) return;

    requestAnimationFrame(() => {
      if (this._scrollState.type === "element" && this._scrollState.element) {
        this._scrollState.element.scrollTop = this._scrollState.top;
        return;
      }

      window.scrollTo({ top: this._scrollState.top, behavior: "auto" });
    });
  }

  _captureFocusState(sourceElement = null) {
    const activeElement =
      sourceElement ||
      this.querySelector("ha-textfield:focus, select:focus, input:focus, ha-entity-picker:focus");

    if (!activeElement) {
      this._focusState = null;
      return;
    }

    const tagName = activeElement.tagName?.toLowerCase?.() || "";
    const inputType = activeElement.type || activeElement.inputElement?.type || "";
    const shouldRestoreFocus =
      tagName === "ha-textfield" ||
      tagName === "select" ||
      (tagName === "input" && inputType !== "checkbox" && inputType !== "radio");

    if (!shouldRestoreFocus) {
      this._focusState = null;
      return;
    }

    const valueElement = activeElement.inputElement || activeElement;

    this._focusState = {
      selector:
        `${tagName}` +
        `${activeElement.dataset?.field ? `[data-field="${activeElement.dataset.field}"]` : ""}` +
        `${
  activeElement.dataset?.actionField
    ? `[data-action-field="${activeElement.dataset.actionField}"][data-action-key="${activeElement.dataset.actionKey}"]`
    : ""
}` +
        `${
  activeElement.dataset?.thresholdIndex
    ? `[data-threshold-index="${activeElement.dataset.thresholdIndex}"][data-threshold-key="${activeElement.dataset.thresholdKey}"]`
    : ""
}`,
      selectionStart:
        typeof valueElement.selectionStart === "number" ? valueElement.selectionStart : null,
      selectionEnd:
        typeof valueElement.selectionEnd === "number" ? valueElement.selectionEnd : null
    };
  }

  _restoreFocusState() {
    if (!this._focusState?.selector) return;

    requestAnimationFrame(() => {
      const target = this.querySelector(this._focusState.selector);
      if (!target) return;

      target.focus();

      const valueElement = target.inputElement || target;
      if (
        valueElement &&
        typeof valueElement.setSelectionRange === "function" &&
        this._focusState.selectionStart !== null &&
        this._focusState.selectionEnd !== null
      ) {
        valueElement.setSelectionRange(
          this._focusState.selectionStart,
          this._focusState.selectionEnd
        );
      }
    });
  }

  _emitConfigChanged(nextConfig, rerender = false) {
    this._captureFocusState(this._lastInteractedField);
    this._captureScrollState();
    this._config = nextConfig;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: true,
        composed: true,
        detail: { config: nextConfig }
      })
    );

    if (rerender) {
      this._render();
    }
  }

  setConfig(config) {
    const nextConfig = normalizeButtonSwitchConfig(config);

    if (this._configsEqual(this._config, nextConfig)) {
      this._config = nextConfig;
      return;
    }

    this._captureScrollState();
    this._config = nextConfig;
    this._render();
  }

  set hass(hass) {
    const isFirstRender = !this._hass;
    this._hass = hass;

    if (isFirstRender) {
      this._captureScrollState();
      this._render();
      return;
    }

    const entityPicker = this.querySelector('ha-entity-picker[data-field="entity"]');
    if (entityPicker) {
      entityPicker.hass = hass;
      entityPicker.includeDomains = ["switch"];
    }
  }

  _valueChanged(event) {
    if (!this._config) return;

    const target = event.target;
    this._lastInteractedField = target;

    const field = target?.dataset?.field;
    if (!field) return;

    const detailValue = event.detail?.value;
    const rawValue = detailValue !== undefined ? detailValue : target.value;
    const value = target.type === "checkbox" ? target.checked : rawValue;

    const nextConfig = { ...this._config };
    const previousValue = nextConfig[field];

    if (typeof value === "boolean") {
      nextConfig[field] = value;
    } else if (value !== undefined && value !== null && value !== "") {
      nextConfig[field] = value;
    } else {
      delete nextConfig[field];
    }

    if (field === "layout_variant") {
      if (nextConfig.layout_variant !== "large") {
        nextConfig.layout_variant = "compact";
      }
      nextConfig.compact = nextConfig.layout_variant === "compact";
    }

    if (previousValue === nextConfig[field]) return;

    const shouldRerender = field === "layout_variant";
    this._emitConfigChanged(nextConfig, shouldRerender);
  }

  _actionChanged(event) {
    if (!this._config) return;

    const target = event.target;
    this._lastInteractedField = target;

    const actionField = target?.dataset?.actionField;
    const key = target?.dataset?.actionKey;
    if (!actionField || !key) return;

    const nextConfig = { ...this._config };
    const currentAction = { ...(nextConfig[actionField] || {}) };
    const rawValue = event.detail?.value !== undefined ? event.detail.value : target.value;
    const value = typeof rawValue === "string" ? rawValue : rawValue ?? "";

    if (!value) {
      delete currentAction[key];
    } else if (key === "service_data") {
      try {
        currentAction[key] = JSON.parse(value);
      } catch (_error) {
        return;
      }
    } else {
      currentAction[key] = value;
    }

    if (!currentAction.action) {
      currentAction.action = "toggle";
    }

    nextConfig[actionField] = currentAction;
    this._emitConfigChanged(nextConfig);
  }

  _thresholdChanged(index, key, value) {
    const thresholds = [...(this._config.power_thresholds || [])];
    const current = { ...(thresholds[index] || { above: "", color: "#ff0000" }) };
    current[key] = value;
    thresholds[index] = current;

    this._emitConfigChanged(
      { ...this._config, power_thresholds: thresholds },
      false
    );
  }

  _addThreshold() {
    const thresholds = [...(this._config.power_thresholds || [])];
    thresholds.push({ above: "", color: "#ff0000" });

    this._emitConfigChanged(
      { ...this._config, power_thresholds: thresholds },
      true
    );
  }

  _removeThreshold(index) {
    const thresholds = [...(this._config.power_thresholds || [])];
    thresholds.splice(index, 1);

    this._emitConfigChanged(
      { ...this._config, power_thresholds: thresholds },
      true
    );
  }

  _renderActionFields(actionField, label) {
    const action = this._config[actionField] || { action: "toggle" };
    const serviceData =
      typeof action.service_data === "object"
        ? JSON.stringify(action.service_data)
        : action.service_data || "";

    return `
      <fieldset class="action-group">
        <legend>${label}</legend>
        <label class="orientation-field">
          <span>Action type</span>
          <select data-action-field="${actionField}" data-action-key="action">
            <option value="toggle" ${
  action.action !== "more-info" && action.action !== "call-service" ? "selected" : ""
}>Toggle</option>
            <option value="more-info" ${action.action === "more-info" ? "selected" : ""}>More info</option>
            <option value="call-service" ${action.action === "call-service" ? "selected" : ""}>Call service</option>
          </select>
        </label>
        <ha-textfield
          label="Service (for call-service)"
          helper="Example: light.turn_on"
          data-action-field="${actionField}"
          data-action-key="service"
          value="${this._escapeAttribute(action.service || "")}"
        ></ha-textfield>
        <ha-textfield
          label="Service data JSON"
          helper='Example: {"entity_id":"switch.tv"}'
          data-action-field="${actionField}"
          data-action-key="service_data"
          value="${this._escapeAttribute(serviceData)}"
        ></ha-textfield>
      </fieldset>
    `;
  }

  _render() {
    if (!this._config) return;

    const entityField = this._hass
      ? `
        <ha-entity-picker
          label="Switch entity"
          data-field="entity"
          value="${this._escapeAttribute(this._config.entity || "")}"
        ></ha-entity-picker>
      `
      : `
        <ha-textfield
          label="Switch entity"
          helper="Example: switch.tv"
          data-field="entity"
          value="${this._escapeAttribute(this._config.entity || "")}"
        ></ha-textfield>
      `;

    this.innerHTML = `
      <div class="card-config">
        ${entityField}

        <ha-textfield
          label="Name"
          data-field="name"
          value="${this._escapeAttribute(this._config.name || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Title (compact)"
          data-field="title"
          value="${this._escapeAttribute(this._config.title || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Icon"
          helper="Example: mdi:radiator"
          data-field="icon"
          value="${this._escapeAttribute(this._config.icon || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Power entity (optional)"
          helper="Example: sensor.tv_power"
          data-field="power_entity"
          value="${this._escapeAttribute(this._config.power_entity || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Power value fallback"
          helper="Example: 120"
          data-field="power_value"
          value="${this._escapeAttribute(this._config.power_value || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Power unit"
          helper="Default: W"
          data-field="power_unit"
          value="${this._escapeAttribute(this._config.power_unit || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Button color override (optional)"
          helper="Example: #ff9800"
          data-field="button_color"
          value="${this._escapeAttribute(this._config.button_color || "")}"
        ></ha-textfield>

        <ha-textfield
          label="On label"
          data-field="on_label"
          value="${this._escapeAttribute(this._config.on_label || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Off label"
          data-field="off_label"
          value="${this._escapeAttribute(this._config.off_label || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Unavailable label"
          data-field="unavailable_label"
          value="${this._escapeAttribute(this._config.unavailable_label || "")}"
        ></ha-textfield>

        <ha-textfield
          label="State text when on"
          data-field="state_text_on"
          value="${this._escapeAttribute(this._config.state_text_on || "")}"
        ></ha-textfield>

        <ha-textfield
          label="State text when off"
          data-field="state_text_off"
          value="${this._escapeAttribute(this._config.state_text_off || "")}"
        ></ha-textfield>

        <ha-textfield
          label="State text when unavailable"
          data-field="state_text_unavailable"
          value="${this._escapeAttribute(this._config.state_text_unavailable || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Background start"
          data-field="background_start"
          value="${this._escapeAttribute(this._config.background_start || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Background end"
          data-field="background_end"
          value="${this._escapeAttribute(this._config.background_end || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Track color"
          data-field="track_color"
          value="${this._escapeAttribute(this._config.track_color || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Track inner color"
          data-field="track_inner_color"
          value="${this._escapeAttribute(this._config.track_inner_color || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Knob color"
          data-field="knob_color"
          value="${this._escapeAttribute(this._config.knob_color || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Chip active background"
          data-field="chip_active_background"
          value="${this._escapeAttribute(this._config.chip_active_background || "")}"
        ></ha-textfield>

        <ha-textfield
          label="Chip inactive background"
          data-field="chip_inactive_background"
          value="${this._escapeAttribute(this._config.chip_inactive_background || "")}"
        ></ha-textfield>

        <label class="orientation-field">
          <span>Layout variant</span>
          <select data-field="layout_variant">
            <option value="compact" ${this._config.layout_variant !== "large" ? "selected" : ""}>
              Compact (default)
            </option>
            <option value="large" ${this._config.layout_variant === "large" ? "selected" : ""}>
              Large (explicit)
            </option>
          </select>
        </label>

        <label class="toggle-field">
          <span>Show power below compact switch</span>
          <input
            type="checkbox"
            data-field="show_power_secondary"
            ${this._config.show_power_secondary ? "checked" : ""}
          />
        </label>

        <label class="orientation-field">
          <span>Power threshold color target</span>
          <select data-field="power_threshold_target">
            <option value="button" ${
  this._config.power_threshold_target !== "power_text" ? "selected" : ""
}>
              Entire button
            </option>
            <option value="power_text" ${
  this._config.power_threshold_target === "power_text" ? "selected" : ""
}>
              Watt display
            </option>
          </select>
        </label>

        <label class="toggle-field">
          <span>Show ON/OFF label</span>
          <input
            type="checkbox"
            data-field="show_on_off_label"
            ${this._config.show_on_off_label !== false ? "checked" : ""}
          />
        </label>

        <label class="orientation-field">
          <span>Name content</span>
          <select data-field="name_content">
            <option value="entity" ${this._config.name_content !== "power" ? "selected" : ""}>
              Entity name
            </option>
            <option value="power" ${this._config.name_content === "power" ? "selected" : ""}>
              Power text
            </option>
          </select>
        </label>

        <label class="orientation-field">
          <span>Slider orientation</span>
          <select data-field="slider_orientation">
            <option value="vertical" ${this._config.slider_orientation !== "horizontal" ? "selected" : ""}>
              Vertical
            </option>
            <option value="horizontal" ${this._config.slider_orientation === "horizontal" ? "selected" : ""}>
              Horizontal
            </option>
          </select>
        </label>

        <label class="toggle-field">
          <span>Reverse switch direction</span>
          <input
            type="checkbox"
            data-field="reverse_direction"
            ${this._config.reverse_direction ? "checked" : ""}
          />
        </label>

        ${this._renderActionFields("tap_action", "Tap action")}
        ${this._renderActionFields("hold_action", "Hold action")}
        ${this._renderActionFields("double_tap_action", "Double tap action")}

        <fieldset class="action-group">
          <legend>Power thresholds</legend>
          <p class="helper">Define dynamic button colors by power values.</p>
          ${(this._config.power_thresholds || [])
    .map(
      (entry, index) => `
                <div class="threshold-row" data-index="${index}">
                  <ha-textfield
                    label="Above"
                    type="number"
                    data-threshold-index="${index}"
                    data-threshold-key="above"
                    value="${this._escapeAttribute(entry.above ?? "")}"
                  ></ha-textfield>
                  <ha-textfield
                    label="Color"
                    data-threshold-index="${index}"
                    data-threshold-key="color"
                    value="${this._escapeAttribute(entry.color || "")}"
                  ></ha-textfield>
                  <button type="button" data-remove-threshold="${index}">Remove</button>
                </div>
              `
    )
    .join("")}
          <button type="button" class="add-threshold">Add threshold</button>
        </fieldset>
      </div>

      <style>
        .card-config {
          display: grid;
          gap: 12px;
          padding-bottom: 4px;
        }

        .orientation-field {
          display: grid;
          gap: 6px;
          font-size: 14px;
        }

        .toggle-field {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 14px;
        }

        .orientation-field select {
          background: transparent;
          color: inherit;
          border: 1px solid rgba(127, 127, 127, 0.5);
          border-radius: 4px;
          padding: 8px;
          font: inherit;
        }

        .action-group {
          display: grid;
          gap: 8px;
          border: 1px solid rgba(127, 127, 127, 0.5);
          border-radius: 6px;
          padding: 10px;
          margin: 0;
        }

        .action-group legend {
          padding: 0 4px;
        }

        .threshold-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 8px;
          align-items: center;
        }

        .helper {
          margin: 0;
          font-size: 12px;
          opacity: 0.8;
        }

        button {
          border: 1px solid rgba(127, 127, 127, 0.5);
          border-radius: 6px;
          background: transparent;
          color: inherit;
          padding: 8px 12px;
          cursor: pointer;
        }
      </style>
    `;

    this.querySelectorAll("ha-textfield[data-field]").forEach((input) => {
      input.addEventListener("change", (event) => this._valueChanged(event));
    });

    this.querySelectorAll("ha-textfield[data-action-field]").forEach((input) => {
      input.addEventListener("change", (event) => this._actionChanged(event));
    });

    this.querySelectorAll("select[data-action-field]").forEach((input) => {
      input.addEventListener("change", (event) => this._actionChanged(event));
    });

    this.querySelectorAll("ha-textfield[data-threshold-index]").forEach((input) => {
      const index = Number(input.dataset.thresholdIndex);
      const key = input.dataset.thresholdKey;

      input.addEventListener("change", (event) => {
        const value = event.detail?.value !== undefined ? event.detail.value : event.target.value;
        this._thresholdChanged(index, key, value);
      });
    });

    const entityPicker = this.querySelector('ha-entity-picker[data-field="entity"]');
    if (entityPicker) {
      entityPicker.hass = this._hass;
      entityPicker.includeDomains = ["switch"];
      entityPicker.addEventListener("value-changed", (event) => this._valueChanged(event));
    }

    this.querySelectorAll('input[type="checkbox"][data-field]').forEach((input) => {
      input.addEventListener("change", (event) => this._valueChanged(event));
    });

    this.querySelectorAll(
      'select[data-field="slider_orientation"], select[data-field="name_content"], select[data-field="layout_variant"], select[data-field="power_threshold_target"]'
    ).forEach((input) => {
      input.addEventListener("change", (event) => this._valueChanged(event));
    });

    const addThresholdButton = this.querySelector("button.add-threshold");
    if (addThresholdButton) {
      addThresholdButton.addEventListener("click", () => this._addThreshold());
    }

    this.querySelectorAll("button[data-remove-threshold]").forEach((button) => {
      const index = Number(button.dataset.removeThreshold);
      button.addEventListener("click", () => this._removeThreshold(index));
    });

    this._restoreScrollState();
    this._restoreFocusState();
  }
}
