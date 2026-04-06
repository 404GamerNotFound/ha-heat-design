class HeatingControlCard extends HTMLElement {
  static getStubConfig() {
    return {
      type: "custom:heating-control-card",
      entity: "climate.living_room",
      humidity_entity: "sensor.living_room_humidity",
      name: "Heating"
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define a climate entity");
    }

    this._config = {
      min_temp: 16,
      max_temp: 28,
      step: 0.5,
      background_start: "#ffa20f",
      background_end: "#ff9800",
      slider_orientation: "vertical",
      slider_orientation_mobile: null,
      slider_orientation_desktop: null,
      desktop_layout: "standard",
      heating_on_mode: "heat",
      ...config
    };

    if (!this.content) {
      this._buildCard();
    }
  }

  set hass(hass) {
    this._hass = hass;

    if (!this.content || !this._config) {
      return;
    }

    const climateState = hass.states[this._config.entity];
    const humidityState = this._config.humidity_entity ? hass.states[this._config.humidity_entity] : null;

    if (!climateState) {
      if (this._isInPreviewMode()) {
        this._setPreviewState();
        return;
      }

      this._currentTemperatureEl.textContent = "--";
      this._humidityEl.textContent = "--";
      this._targetTemperatureEl.textContent = "--";
      this._statusEl.textContent = "Entity not found";
      this._updateHeatingToggle(null);
      return;
    }

    const currentTemp = climateState.attributes.current_temperature;
    const targetTemp = climateState.attributes.temperature;
    const humidity = humidityState?.state;

    this._currentTemperatureEl.textContent = this._formatTemperature(currentTemp);
    this._targetTemperatureEl.textContent = this._formatTemperature(targetTemp);
    this._humidityEl.textContent = humidity ? `${humidity}%` : "--";
    this._statusEl.textContent = climateState.state.toUpperCase();
    this._updateHeatingToggle(climateState);

    if (!this._isSliding) {
      this._slider.value = targetTemp ?? this._config.min_temp;
      this._updateSliderFill();
    }
  }

  getCardSize() {
    return 5;
  }

  _buildCard() {
    this.innerHTML = `
      <ha-card>
        <div class="wrapper">
          <div class="top-row">
            <div>
              <div class="label">CURRENT</div>
              <div id="current-temperature" class="small-value">--</div>
            </div>
            <div class="right-block">
              <div class="label">HUMIDITY</div>
              <div id="humidity" class="small-value">--</div>
            </div>
          </div>

          <div class="main-temperature">
            <span id="target-temperature">--</span>
            <span class="unit">°C</span>
          </div>

          <div class="hud-slider-wrap">
            <div class="slider-shell"></div>
            <input id="temp-slider" class="temp-slider-hud" type="range" />
          </div>

          <div class="bottom-row">
            <div id="status" class="status">--</div>
            <button id="heating-toggle" class="heating-toggle" type="button">--</button>
            <div class="name">${this._config.name || "Heater"}</div>
          </div>
        </div>
      </ha-card>
    `;

    const style = document.createElement("style");
    style.textContent = `
      ha-card {
        --ha-card-background: var(--card-bg-start, #ffa20f);
        border-radius: 30px;
        overflow: hidden;
        background: var(--card-bg-start, #ffa20f);
        color: #fff;
        font-family: var(--primary-font-family, "Roboto", sans-serif);
      }

      .wrapper {
        position: relative;
        padding: 20px;
        min-height: 420px;
        box-sizing: border-box;
        background: linear-gradient(180deg, var(--card-bg-start, #ffa20f) 0%, var(--card-bg-end, #ff9800) 100%);
      }

      .wrapper.desktop-compact {
        padding: 14px;
        min-height: 320px;
      }

      .top-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 14px;
        letter-spacing: 0.8px;
      }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        opacity: 0.78;
      }

      .small-value {
        margin-top: 4px;
        font-size: 18px;
        font-weight: 500;
      }

      .main-temperature {
        text-align: center;
        font-size: 52px;
        font-weight: 500;
        line-height: 1;
        margin: 8px 0 12px;
      }

      .wrapper.desktop-compact .main-temperature {
        font-size: 42px;
        margin: 4px 0 8px;
      }

      .main-temperature .unit {
        font-size: 23px;
        margin-left: 4px;
      }

      .wrapper.desktop-compact .main-temperature .unit {
        font-size: 20px;
      }

      .hud-slider-wrap {
        width: 220px;
        height: 310px;
        margin: 0 auto 20px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .wrapper.desktop-compact .hud-slider-wrap {
        width: 180px;
        height: 230px;
        margin: 0 auto 12px;
      }

      .slider-shell {
        position: absolute;
        width: 140px;
        height: 280px;
        border-radius: 42px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.18) 100%);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
      }

      .wrapper.desktop-compact .slider-shell {
        width: 106px;
        height: 210px;
      }

      #temp-slider.temp-slider-hud {
        position: relative;
        appearance: none;
        -webkit-appearance: none;
        width: 260px;
        height: 26px;
        transform: rotate(-90deg);
        border-radius: 999px;
        background: transparent;
        outline: none;
      }

      .wrapper.desktop-compact #temp-slider.temp-slider-hud {
        width: 200px;
      }

      .hud-slider-wrap.horizontal {
        width: 320px;
        height: 150px;
      }

      .wrapper.desktop-compact .hud-slider-wrap.horizontal {
        width: 250px;
        height: 120px;
      }

      .hud-slider-wrap.horizontal .slider-shell {
        width: 290px;
        height: 90px;
      }

      .wrapper.desktop-compact .hud-slider-wrap.horizontal .slider-shell {
        width: 220px;
        height: 70px;
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud {
        width: 270px;
        transform: none;
      }

      .wrapper.desktop-compact .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud {
        width: 210px;
      }

      #temp-slider.temp-slider-hud::-webkit-slider-runnable-track {
        height: 16px;
        border-radius: 999px;
        background: linear-gradient(90deg, #f4f4f4 var(--fill, 50%), rgba(255, 255, 255, 0.4) var(--fill, 50%));
      }

      #temp-slider.temp-slider-hud::-moz-range-track {
        height: 16px;
        border-radius: 999px;
        background: linear-gradient(90deg, #f4f4f4 var(--fill, 50%), rgba(255, 255, 255, 0.4) var(--fill, 50%));
      }

      #temp-slider.temp-slider-hud::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 112px;
        height: 108px;
        margin-top: -46px;
        border-radius: 30px;
        border: 1px solid rgba(255, 255, 255, 0.55);
        background: #f2f2f2;
        cursor: pointer;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
      }

      .wrapper.desktop-compact #temp-slider.temp-slider-hud::-webkit-slider-thumb {
        width: 80px;
        height: 78px;
        margin-top: -30px;
        border-radius: 20px;
      }

      #temp-slider.temp-slider-hud::-moz-range-thumb {
        width: 112px;
        height: 108px;
        border-radius: 30px;
        border: 1px solid rgba(255, 255, 255, 0.55);
        background: #f2f2f2;
        cursor: pointer;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
      }

      .wrapper.desktop-compact #temp-slider.temp-slider-hud::-moz-range-thumb {
        width: 80px;
        height: 78px;
        border-radius: 20px;
      }

      .bottom-row {
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }

      .wrapper.desktop-compact .bottom-row {
        margin-top: 8px;
      }

      .status {
        font-size: 12px;
        opacity: 0.9;
        padding: 6px 10px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.12);
      }

      .heating-toggle {
        border: 1px solid rgba(255, 255, 255, 0.45);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.4px;
        padding: 6px 10px;
        cursor: pointer;
      }

      .heating-toggle.off {
        background: rgba(0, 0, 0, 0.18);
      }

      .heating-toggle:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.95;
        margin-left: auto;
      }
    `;

    this.appendChild(style);

    this.content = this.querySelector(".wrapper");
    this._slider = this.querySelector("#temp-slider");
    this._targetTemperatureEl = this.querySelector("#target-temperature");
    this._currentTemperatureEl = this.querySelector("#current-temperature");
    this._humidityEl = this.querySelector("#humidity");
    this._statusEl = this.querySelector("#status");
    this._sliderWrapEl = this.querySelector(".hud-slider-wrap");
    this._heatingToggleEl = this.querySelector("#heating-toggle");

    this._setupViewportListener();
    this._applyAppearance();

    this._slider.min = this._config.min_temp;
    this._slider.max = this._config.max_temp;
    this._slider.step = this._config.step;

    this._slider.addEventListener("input", () => {
      this._isSliding = true;
      const value = Number(this._slider.value);
      this._targetTemperatureEl.textContent = this._formatTemperature(value);
      this._updateSliderFill();
    });

    this._slider.addEventListener("change", async () => {
      if (!this._hass) {
        return;
      }

      const value = Number(this._slider.value);
      await this._hass.callService("climate", "set_temperature", {
        entity_id: this._config.entity,
        temperature: value
      });
      this._isSliding = false;
    });

    this._heatingToggleEl.addEventListener("click", async () => {
      await this._toggleHeating();
    });
  }

  _formatTemperature(value) {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return "--";
    }

    return Number(value).toFixed(1);
  }

  _updateSliderFill() {
    const min = Number(this._slider.min);
    const max = Number(this._slider.max);
    const current = Number(this._slider.value);
    const percentage = ((current - min) * 100) / (max - min);
    this._slider.style.setProperty("--fill", `${percentage}%`);
  }

  _updateHeatingToggle(climateState) {
    if (!this._heatingToggleEl) {
      return;
    }

    if (!climateState) {
      this._heatingToggleEl.textContent = "--";
      this._heatingToggleEl.disabled = true;
      this._heatingToggleEl.classList.remove("off");
      return;
    }

    const isHeatingEnabled = climateState.state !== "off";
    this._heatingToggleEl.textContent = isHeatingEnabled ? "HEATING ON" : "HEATING OFF";
    this._heatingToggleEl.disabled = false;
    this._heatingToggleEl.classList.toggle("off", !isHeatingEnabled);
  }

  async _toggleHeating() {
    const climateState = this._hass?.states?.[this._config.entity];

    if (!this._hass || !climateState || this._isInPreviewMode()) {
      return;
    }

    const isHeatingEnabled = climateState.state !== "off";

    if (isHeatingEnabled) {
      await this._hass.callService("climate", "set_hvac_mode", {
        entity_id: this._config.entity,
        hvac_mode: "off"
      });
      return;
    }

    const onMode = this._resolveHeatingOnMode(climateState);
    await this._hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: onMode
    });
  }

  _resolveHeatingOnMode(climateState) {
    const configuredMode = String(this._config.heating_on_mode || "heat").toLowerCase();
    const hvacModes = climateState.attributes?.hvac_modes || [];

    if (hvacModes.includes(configuredMode)) {
      return configuredMode;
    }

    if (hvacModes.includes("heat")) {
      return "heat";
    }

    return hvacModes.find((mode) => mode !== "off") || "heat";
  }

  _applyAppearance() {
    const orientation = this._resolveSliderOrientation();
    const isDesktopCompact = this._isDesktopLayoutCompact();
    this._sliderWrapEl.classList.toggle("horizontal", orientation === "horizontal");
    this._sliderWrapEl.classList.toggle("vertical", orientation === "vertical");
    this.content.classList.toggle("desktop-compact", isDesktopCompact);

    const backgroundStart = this._config.background_start || this._config.background_color || "#ffa20f";
    const backgroundEnd = this._config.background_end || backgroundStart;

    this.style.setProperty("--card-bg-start", backgroundStart);
    this.style.setProperty("--card-bg-end", backgroundEnd);
  }

  _resolveSliderOrientation() {
    const isMobile = this._isMobileViewport();
    const orientation = isMobile ? this._config.slider_orientation_mobile : this._config.slider_orientation_desktop;
    const fallbackOrientation = this._config.slider_orientation;
    const effectiveOrientation = orientation ?? fallbackOrientation;
    return String(effectiveOrientation).toLowerCase() === "horizontal" ? "horizontal" : "vertical";
  }

  _isDesktopLayoutCompact() {
    if (this._isMobileViewport()) {
      return false;
    }

    return String(this._config.desktop_layout || "standard").toLowerCase() === "compact";
  }

  _isMobileViewport() {
    return window.matchMedia("(max-width: 767px)").matches;
  }

  _setupViewportListener() {
    if (this._mediaQuery) {
      return;
    }

    this._mediaQuery = window.matchMedia("(max-width: 767px)");
    this._onViewportChange = () => {
      if (this._sliderWrapEl && this.content) {
        this._applyAppearance();
      }
    };
    this._mediaQuery.addEventListener("change", this._onViewportChange);
  }

  _setPreviewState() {
    const previewCurrent = 21.3;
    const previewTarget = 22.0;
    const previewHumidity = 46;

    this._currentTemperatureEl.textContent = this._formatTemperature(previewCurrent);
    this._targetTemperatureEl.textContent = this._formatTemperature(previewTarget);
    this._humidityEl.textContent = `${previewHumidity}%`;
    this._statusEl.textContent = "PREVIEW";
    this._slider.value = previewTarget;
    this._updateSliderFill();
    this._heatingToggleEl.textContent = "HEATING ON";
    this._heatingToggleEl.disabled = true;
    this._heatingToggleEl.classList.remove("off");
  }

  _isInPreviewMode() {
    if (this._config?.preview === true) {
      return true;
    }

    let node = this;
    while (node) {
      if (node.localName === "hui-card-preview") {
        return true;
      }

      node = node.parentNode || node.host;
    }

    return false;
  }

  disconnectedCallback() {
    if (this._mediaQuery && this._onViewportChange) {
      this._mediaQuery.removeEventListener("change", this._onViewportChange);
    }
  }
}

customElements.define("heating-control-card", HeatingControlCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "heating-control-card",
  name: "Heating Control Card",
  description: "A custom orange heating dashboard card with a thermostat slider.",
  preview: true
});
