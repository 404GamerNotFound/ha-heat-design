import { normalizeButtonSwitchConfig, buttonSwitchDefaultConfig, validateSwitchEntity } from "./config.js";
import { callHomeAssistantService } from "./services.js";

/*
 * Button Switch Card
 * A Home Assistant custom Lovelace card with an orange button-style layout.
 */

export class ButtonSwitchCard extends HTMLElement {
  static async getConfigElement() {
    await customElements.whenDefined("button-switch-card-editor");
    return document.createElement("button-switch-card-editor");
  }

  getConfigElement() {
    return this.constructor.getConfigElement();
  }

  static getStubConfig() {
    return { ...buttonSwitchDefaultConfig };
  }

  getStubConfig() {
    return this.constructor.getStubConfig();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
  }

  setConfig(config) {
    validateSwitchEntity(config);
    this._config = normalizeButtonSwitchConfig(config);
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  getCardSize() {
    const isCompactLayout = this._config?.layout_variant !== "large";
    return isCompactLayout ? 3 : 5;
  }

  getGridOptions() {
    const isCompactLayout = this._config?.layout_variant !== "large";

    return isCompactLayout
      ? { rows: 3, columns: 6, min_rows: 3, min_columns: 6 }
      : { rows: 5, columns: 12, min_rows: 5, min_columns: 12 };
  }

  _escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  _escapeAttribute(value) {
    return this._escapeHtml(value);
  }

  _isOn(stateObj) {
    return Boolean(stateObj && stateObj.state === "on");
  }

  _isUnavailable(stateObj) {
    return !stateObj || stateObj.state === "unavailable" || stateObj.state === "unknown";
  }

  _toggleSwitch() {
    if (!this._hass || !this._config) return;
    callHomeAssistantService(this._hass, "switch", "toggle", { entity_id: this._config.entity });
  }

  _fireAction(actionName) {
    if (!this._hass || !this._config) return;

    const stateObj = this._hass.states[this._config.entity];

    if (this._isUnavailable(stateObj)) {
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId: this._config.entity }
        })
      );
      return;
    }

    const action = this._config[actionName];

    if (!action || !action.action || action.action === "toggle") {
      this._toggleSwitch();
      return;
    }

    if (action.action === "none") {
      return;
    }

    if (action.action === "call-service" && action.service) {
      if (!action.service.includes(".")) return;

      const [domain, service] = action.service.split(".");
      if (!domain || !service) return;

      callHomeAssistantService(this._hass, domain, service, action.service_data || {});
      return;
    }

    if (action.action === "more-info") {
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId: this._config.entity }
        })
      );
    }
  }

  _formatPowerValue(rawValue) {
    const parsed = Number.parseFloat(rawValue);

    if (!Number.isFinite(parsed)) {
      return `${rawValue}`.trim();
    }

    if (Math.abs(parsed) >= 100) {
      return `${Math.round(parsed)}`;
    }

    return parsed.toFixed(1).replace(/\.0$/, "");
  }

  _getPowerText() {
    if (!this._config) return "";

    if (this._config.power_entity && this._hass) {
      const powerState = this._hass.states[this._config.power_entity];

      if (powerState) {
        const state = powerState.state;
        if (state === "unknown" || state === "unavailable") {
          return "";
        }

        const unit = powerState.attributes?.unit_of_measurement || this._config.power_unit || "W";
        const formattedValue = this._formatPowerValue(state);
        return `${formattedValue} ${unit}`.trim();
      }
    }

    if (this._config.power_value !== "" && this._config.power_value !== undefined) {
      const unit = this._config.power_unit || "W";
      const formattedValue = this._formatPowerValue(this._config.power_value);
      return `${formattedValue} ${unit}`.trim();
    }

    return "";
  }

  _getPowerNumericValue() {
    if (!this._config) return null;

    if (this._config.power_entity && this._hass) {
      const powerState = this._hass.states[this._config.power_entity];

      if (powerState) {
        const parsed = Number.parseFloat(powerState.state);
        return Number.isFinite(parsed) ? parsed : null;
      }
    }

    if (this._config.power_value !== "" && this._config.power_value !== undefined) {
      const parsed = Number.parseFloat(this._config.power_value);
      return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
  }

  _getPowerThresholds() {
    const rawThresholds = this._config?.power_thresholds;
    if (!rawThresholds) return [];

    let list = rawThresholds;

    if (typeof rawThresholds === "string") {
      try {
        list = JSON.parse(rawThresholds);
      } catch (_error) {
        return [];
      }
    }

    if (!Array.isArray(list)) return [];

    return list
      .map((entry) => {
        const threshold =
          entry?.above ?? entry?.threshold ?? entry?.value ?? entry?.watts ?? entry?.watt;
        const parsedThreshold = Number.parseFloat(threshold);

        if (!Number.isFinite(parsedThreshold) || !entry?.color) return null;

        return {
          threshold: parsedThreshold,
          color: entry.color
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.threshold - b.threshold);
  }

  _getMatchedPowerThresholdColor() {
    if (!this._config) return "";

    const numericPower = this._getPowerNumericValue();
    const thresholds = this._getPowerThresholds();

    if (numericPower !== null && thresholds.length) {
      const matched = thresholds.filter((entry) => numericPower >= entry.threshold).pop();
      if (matched) return matched.color;
    }

    return "";
  }

  _getActiveButtonColor() {
    if (!this._config) return "";

    if (this._config.power_threshold_target === "power_text") {
      return this._config.button_color || "";
    }

    const matchedColor = this._getMatchedPowerThresholdColor();
    if (matchedColor) return matchedColor;

    return this._config.button_color || "";
  }

  render() {
    if (!this.shadowRoot || !this._config) return;

    const stateObj = this._hass ? this._hass.states[this._config.entity] : null;
    const isUnavailable = this._isUnavailable(stateObj);
    const isOn = !isUnavailable && this._isOn(stateObj);

    const friendlyName =
      this._config.name || stateObj?.attributes?.friendly_name || this._config.entity;
    const title = this._config.title || friendlyName;
    const powerText = this._getPowerText();

    const isCompactLayout = this._config.layout_variant !== "large";
    const compactClass = isCompactLayout ? "compact" : "";
    const sliderOrientation =
      this._config.slider_orientation === "horizontal" ? "horizontal" : "vertical";
    const reverseDirection = Boolean(this._config.reverse_direction);

    const displayName =
      this._config.name_content === "power" && powerText ? powerText : friendlyName;

    const showSecondaryPower =
      !isUnavailable && Boolean(powerText) && this._config.show_power_secondary;
    const thresholdPowerColor =
      this._config.power_threshold_target === "power_text" && !isUnavailable
        ? this._getMatchedPowerThresholdColor()
        : "";

    const compactPrimaryText = isUnavailable
      ? this._config.unavailable_label
      : showSecondaryPower
        ? powerText
        : isOn
          ? "ON"
          : "OFF";

    const activeButtonColor = this._getActiveButtonColor();

    const cardBackground = activeButtonColor
      ? `linear-gradient(180deg, ${activeButtonColor}, ${activeButtonColor})`
      : `linear-gradient(180deg, ${this._config.background_start}, ${this._config.background_end})`;

    const regularKnobPositionClass = isUnavailable
      ? "unavailable"
      : sliderOrientation === "horizontal"
        ? isOn === reverseDirection
          ? "start"
          : "end"
        : isOn !== reverseDirection
          ? "start"
          : "end";

    const currentStateText = isUnavailable ? "N/A" : isOn ? "ON" : "OFF";
    const statusPillText = isUnavailable
      ? this._config.unavailable_label
      : isOn
        ? this._config.on_label
        : this._config.off_label;
    const stateText = isUnavailable
      ? this._config.state_text_unavailable
      : isOn
        ? this._config.state_text_on
        : this._config.state_text_off;

    const chipClass = isUnavailable ? "unavailable" : isOn ? "active" : "";

    const safeTitle = this._escapeHtml(title);
    const safeDisplayName = this._escapeHtml(displayName);
    const safeEntity = this._escapeHtml(this._config.entity);
    const safeCompactPrimaryText = this._escapeHtml(compactPrimaryText);
    const safeCurrentStateText = this._escapeHtml(currentStateText);
    const safeStatusPillText = this._escapeHtml(statusPillText);
    const safeStateText = this._escapeHtml(stateText);
    const safeAriaLabel = this._escapeAttribute(
      isUnavailable ? `${friendlyName} unavailable` : `Toggle ${friendlyName}`
    );
    const safeIcon = this._escapeAttribute(this._config.icon || "");
    const iconMarkup = safeIcon ? `<ha-icon icon="${safeIcon}"></ha-icon>` : "";
    const mainNameClass =
      thresholdPowerColor && this._config.name_content === "power" && powerText ? "power-color" : "";

    this.shadowRoot.innerHTML = `
      <ha-card>
        <div class="card ${compactClass}" role="button" tabindex="0" aria-label="${safeAriaLabel}">
          ${
  isCompactLayout
    ? `
          <div class="compact-title">${safeTitle}</div>
          <div class="compact-switch-wrap">
            <div class="compact-track ${sliderOrientation}">
              <div class="compact-track-line"></div>
              <div class="compact-knob ${regularKnobPositionClass}">
                ${iconMarkup}
              </div>
            </div>
          </div>
          <div class="compact-footer">
            <div class="compact-state ${isOn ? "active" : ""} ${showSecondaryPower ? "power" : ""} ${
  thresholdPowerColor && showSecondaryPower ? "threshold-power" : ""
}">${safeCompactPrimaryText}</div>
            ${
  showSecondaryPower && this._config.show_on_off_label !== false
    ? `<div class="compact-mode">${isOn ? "ON" : "OFF"}</div>`
    : ""
}
          </div>
          `
    : `
          <div class="top-row">
            <div class="label-block">
              <div class="label-title">CURRENT</div>
              <div class="label-value">${safeCurrentStateText}</div>
            </div>
            <div class="label-block right">
              <div class="label-title">ENTITY</div>
              <div class="label-value entity">${safeEntity}</div>
            </div>
          </div>

          <div class="main-name ${mainNameClass}">${safeDisplayName}</div>

          <div class="switch-wrap">
            <div class="track ${sliderOrientation}">
              <div class="track-line"></div>
              <div class="knob ${regularKnobPositionClass}">
                ${iconMarkup}
              </div>
            </div>
          </div>

          <div class="bottom-row">
            <div class="chip ${chipClass}">${safeCurrentStateText}</div>
            ${
  this._config.show_on_off_label !== false
    ? `<div class="status-pill">${safeStatusPillText}</div>`
    : ""
}
            <div class="state-text">${safeStateText}</div>
          </div>
          `
}
        </div>
      </ha-card>

      <style>
        :host {
          display: block;
          height: 100%;
        }

        ha-card {
          display: block;
          height: 100%;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: none;
        }

        .card {
          container-type: inline-size;
          --large-track-width: clamp(64px, 30cqw, 88px);
          --large-track-height: clamp(120px, 66cqw, 176px);
          --large-knob-size: clamp(48px, 24cqw, 64px);
          --large-track-padding: clamp(12px, 7cqw, 20px);

          min-height: clamp(210px, 30vw, 300px);
          height: 100%;
          background: ${cardBackground};
          color: #fff;
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          cursor: pointer;
          user-select: none;
          outline: none;
          gap: 10px;
        }

        .card.compact {
          --compact-track-line-inset: clamp(10px, 6cqw, 18px);
          --compact-track-line-size: clamp(5px, 3cqw, 8px);
          --compact-knob-offset: clamp(8px, 4cqw, 14px);

          min-height: clamp(140px, 18vw, 185px);
          height: 100%;
          padding: 12px;
          border-radius: 18px;
          gap: 10px;
        }

        .card:focus-visible {
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
          border-radius: 16px;
        }

        .compact-title {
          text-align: center;
          font-size: clamp(18px, 11cqw, 28px);
          font-weight: 700;
          letter-spacing: 0.3px;
          font-family: "Arial", sans-serif;
          line-height: 1.1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          flex: 0 0 auto;
          margin: 0;
        }

        .compact-switch-wrap {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70px;
        }

        .compact-track {
          width: 100%;
          height: min(62px, 100%);
          max-width: 100%;
          border-radius: 999px;
          background: ${this._config.track_color};
          position: relative;
          border: 2px solid rgba(255, 255, 255, 0.34);
          box-shadow: inset 0 8px 18px rgba(255, 255, 255, 0.08);
        }

        .compact-track-line {
          position: absolute;
          left: var(--compact-track-line-inset);
          right: var(--compact-track-line-inset);
          top: 50%;
          width: auto;
          height: var(--compact-track-line-size);
          transform: translateY(-50%);
          border-radius: 999px;
          background: ${this._config.track_inner_color};
        }

        .compact-track.horizontal {
          width: 100%;
          height: min(62px, 100%);
        }

        .compact-track:not(.horizontal) {
          width: min(74px, 58%);
          height: 100%;
          min-height: 90px;
          max-width: 74px;
        }

        .compact-track:not(.horizontal) .compact-track-line {
          left: 50%;
          right: auto;
          top: var(--compact-track-line-inset);
          bottom: var(--compact-track-line-inset);
          width: var(--compact-track-line-size);
          height: auto;
          transform: translateX(-50%);
        }

        .compact-track.horizontal .compact-track-line {
          left: var(--compact-track-line-inset);
          right: var(--compact-track-line-inset);
          top: 50%;
          bottom: auto;
          width: auto;
          height: var(--compact-track-line-size);
          transform: translateY(-50%);
        }

        .compact-knob {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40%;
          aspect-ratio: 1 / 1;
          border-radius: 24%;
          background: ${this._config.knob_color};
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          transition: left 0.25s ease, right 0.25s ease, top 0.25s ease, bottom 0.25s ease;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .compact-knob.start {
          left: var(--compact-knob-offset);
        }

        .compact-knob.end {
          left: auto;
          right: var(--compact-knob-offset);
        }

        .compact-track:not(.horizontal) .compact-knob {
          left: 50%;
          transform: translateX(-50%);
        }

        .compact-track:not(.horizontal) .compact-knob.start {
          top: var(--compact-knob-offset);
          left: 50%;
          right: auto;
        }

        .compact-track:not(.horizontal) .compact-knob.end {
          top: auto;
          bottom: var(--compact-knob-offset);
          left: 50%;
          right: auto;
        }

        .compact-track.horizontal .compact-knob {
          top: 50%;
          transform: translateY(-50%);
        }

        .compact-track.horizontal .compact-knob.start {
          left: var(--compact-knob-offset);
        }

        .compact-track.horizontal .compact-knob.end {
          left: auto;
          right: var(--compact-knob-offset);
        }

        .compact-knob.unavailable {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.6;
        }

        .compact-knob ha-icon {
          --mdc-icon-size: clamp(16px, 8.8cqw, 28px);
        }

        .compact-footer {
          display: grid;
          gap: 6px;
          justify-items: center;
          flex: 0 0 auto;
          margin-top: 0;
        }

        .compact-state {
          border-radius: clamp(20px, 10cqw, 34px);
          padding: 8px 16px;
          font-weight: 700;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          font-size: clamp(14px, 7.2cqw, 24px);
          border: 2px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.18);
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .compact-state.active {
          background: ${this._config.chip_active_background};
          border-color: transparent;
        }

        .compact-state.power {
          text-transform: none;
          letter-spacing: 0.2px;
          width: fit-content;
          max-width: 92%;
          padding: 8px 14px;
          font-size: clamp(12px, 5.8cqw, 21px);
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .compact-state.threshold-power {
          color: ${thresholdPowerColor || "inherit"};
        }

        .compact-mode {
          font-size: clamp(13px, 9cqw, 22px);
          font-weight: 700;
          font-family: "Arial", sans-serif;
          line-height: 1.1;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .top-row {
          display: flex;
          justify-content: space-between;
          gap: clamp(4px, 2cqw, 10px);
          font-family: "Arial", sans-serif;
        }

        .label-title {
          font-size: clamp(10px, 4.8cqw, 12px);
          letter-spacing: 2px;
          opacity: 0.85;
        }

        .label-value {
          margin-top: clamp(2px, 1.5cqw, 6px);
          font-size: clamp(9px, 3.8cqw, 11px);
          font-weight: 700;
        }

        .right {
          text-align: right;
        }

        .entity {
          font-size: clamp(10px, 4.2cqw, 12px);
          opacity: 0.9;
          word-break: break-word;
          max-width: 38cqw;
        }

        .main-name {
          font-size: clamp(18px, 9.2cqw, 28px);
          line-height: 1.05;
          font-weight: 700;
          margin: 6px 0;
          text-align: center;
          font-family: "Arial", sans-serif;
          overflow-wrap: anywhere;
        }

        .main-name.power-color {
          color: ${thresholdPowerColor || "inherit"};
        }

        .switch-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          min-height: 120px;
        }

        .track {
          width: var(--large-track-width);
          height: var(--large-track-height);
          border-radius: clamp(28px, 14cqw, 42px);
          background: ${this._config.track_color};
          position: relative;
          border: 2px solid rgba(255, 255, 255, 0.28);
          box-shadow: inset 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .track-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: var(--large-track-padding);
          bottom: var(--large-track-padding);
          width: clamp(7px, 3.8cqw, 10px);
          border-radius: 12px;
          background: ${this._config.track_inner_color};
        }

        .track.horizontal {
          width: var(--large-track-height);
          height: var(--large-track-width);
        }

        .track.horizontal .track-line {
          left: var(--large-track-padding);
          right: var(--large-track-padding);
          top: 50%;
          bottom: auto;
          width: auto;
          height: clamp(7px, 3.8cqw, 10px);
          transform: translateY(-50%);
        }

        .knob {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: var(--large-knob-size);
          height: var(--large-knob-size);
          border-radius: clamp(14px, 7cqw, 20px);
          background: ${this._config.knob_color};
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          transition: top 0.25s ease, bottom 0.25s ease, transform 0.25s ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        }

        .knob.start {
          top: calc(var(--large-track-padding) + clamp(1px, 0.8cqw, 4px));
        }

        .knob.end {
          bottom: calc(var(--large-track-padding) + clamp(1px, 0.8cqw, 4px));
        }

        .track.horizontal .knob {
          top: 50%;
          transform: translateY(-50%);
        }

        .track.horizontal .knob.start {
          left: calc(var(--large-track-padding) + clamp(1px, 0.8cqw, 4px));
        }

        .track.horizontal .knob.end {
          left: auto;
          right: calc(var(--large-track-padding) + clamp(1px, 0.8cqw, 4px));
        }

        .knob.unavailable {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.6;
        }

        .knob ha-icon {
          --mdc-icon-size: clamp(18px, 9.5cqw, 24px);
        }

        .bottom-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: clamp(4px, 2.2cqw, 8px);
          align-items: center;
          margin-top: 6px;
        }

        .chip,
        .status-pill {
          border-radius: 18px;
          padding: 5px 8px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: clamp(9px, 4.2cqw, 11px);
          border: 1px solid rgba(255, 255, 255, 0.45);
          background: ${this._config.chip_inactive_background};
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .chip.active {
          background: ${this._config.chip_active_background};
          border-color: transparent;
        }

        .chip.unavailable {
          opacity: 0.8;
        }

        .state-text {
          font-size: clamp(13px, 7.2cqw, 20px);
          font-weight: 700;
          text-align: right;
          font-family: "Arial", sans-serif;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .card.compact {
            min-height: 132px;
            padding: 10px;
            gap: 8px;
          }

          .compact-track.horizontal {
            height: 56px;
          }

          .compact-title {
            font-size: clamp(16px, 11cqw, 24px);
          }

          .compact-mode {
            font-size: clamp(12px, 9cqw, 21px);
          }
        }
      </style>
    `;

    const card = this.shadowRoot.querySelector(".card");
    if (!card) return;

    card.addEventListener("click", () => this._fireAction("tap_action"));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this._fireAction("tap_action");
      }
    });

    card.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this._fireAction("hold_action");
    });

    card.addEventListener("dblclick", (event) => {
      event.preventDefault();
      this._fireAction("double_tap_action");
    });
  }
}

