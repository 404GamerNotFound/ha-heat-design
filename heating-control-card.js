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
      this._currentTemperatureEl.textContent = "--";
      this._humidityEl.textContent = "--";
      this._targetTemperatureEl.textContent = "--";
      this._statusEl.textContent = "Entity not found";
      return;
    }

    const currentTemp = climateState.attributes.current_temperature;
    const targetTemp = climateState.attributes.temperature;
    const humidity = humidityState?.state;

    this._currentTemperatureEl.textContent = this._formatTemperature(currentTemp);
    this._targetTemperatureEl.textContent = this._formatTemperature(targetTemp);
    this._humidityEl.textContent = humidity ? `${humidity}%` : "--";
    this._statusEl.textContent = climateState.state.toUpperCase();

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

          <div class="middle-slider-wrap">
            <input id="temp-slider" class="temp-slider-vertical" type="range" />
          </div>

          <div class="bottom-row">
            <div id="status" class="status">--</div>
            <div class="name">${this._config.name || "Heater"}</div>
          </div>
        </div>
      </ha-card>
    `;

    const style = document.createElement("style");
    style.textContent = `
      ha-card {
        --ha-card-background: #ffa20f;
        border-radius: 30px;
        overflow: hidden;
        background: #ffa20f;
        color: #fff;
        font-family: var(--primary-font-family, "Roboto", sans-serif);
      }

      .wrapper {
        position: relative;
        padding: 20px;
        min-height: 420px;
        box-sizing: border-box;
        background: linear-gradient(180deg, #ffa20f 0%, #ff9800 100%);
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
        font-size: 56px;
        font-weight: 500;
        line-height: 1;
        margin-bottom: 14px;
      }

      .main-temperature .unit {
        font-size: 24px;
        margin-left: 4px;
      }

      .middle-slider-wrap {
        width: 150px;
        height: 300px;
        margin: 12px auto 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 36px;
        background: rgba(255, 255, 255, 0.18);
      }

      #temp-slider.temp-slider-vertical {
        appearance: none;
        -webkit-appearance: slider-vertical;
        width: 120px;
        height: 18px;
        transform: rotate(-90deg);
        border-radius: 999px;
        background: linear-gradient(90deg, #f4f4f4 var(--fill, 50%), rgba(255, 255, 255, 0.45) var(--fill, 50%));
        outline: none;
      }

      #temp-slider.temp-slider-vertical::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid #ffa20f;
        background: #fff;
        cursor: pointer;
      }

      #temp-slider.temp-slider-vertical::-moz-range-thumb {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid #ffa20f;
        background: #fff;
        cursor: pointer;
      }

      .bottom-row {
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .status {
        font-size: 12px;
        opacity: 0.9;
        padding: 6px 10px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.12);
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.95;
      }
    `;

    this.appendChild(style);

    this.content = this.querySelector(".wrapper");
    this._slider = this.querySelector("#temp-slider");
    this._targetTemperatureEl = this.querySelector("#target-temperature");
    this._currentTemperatureEl = this.querySelector("#current-temperature");
    this._humidityEl = this.querySelector("#humidity");
    this._statusEl = this.querySelector("#status");

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
}

customElements.define("heating-control-card", HeatingControlCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "heating-control-card",
  name: "Heating Control Card",
  description: "A custom orange heating dashboard card with a thermostat slider."
});
