class HeatingControlCard extends HTMLElement {
  static get TRANSLATIONS() {
    return {
      en: {
        current: "CURRENT",
        humidity: "HUMIDITY",
        showTemperatureChart: "Show temperature chart",
        showHumidityChart: "Show humidity chart",
        temperature: "Temperature",
        chartSessionSubtitle: "Last values from this session",
        closeChart: "Close chart",
        entityNotFound: "Entity not found",
        heatingOn: "HEATING ON",
        heatingOff: "HEATING OFF",
        preview: "PREVIEW",
        temperatureTrend: "Temperature trend",
        humidityTrend: "Humidity trend",
        chartSubtitleWithCount: (count) => `Last ${count} values from this session`,
        nowValue: (value, unit) => `Now: ${value}${unit}`
      },
      de: {
        current: "AKTUELL",
        humidity: "LUFTFEUCHTIGKEIT",
        showTemperatureChart: "Temperaturverlauf anzeigen",
        showHumidityChart: "Luftfeuchtigkeitsverlauf anzeigen",
        temperature: "Temperatur",
        chartSessionSubtitle: "Letzte Werte aus dieser Sitzung",
        closeChart: "Diagramm schließen",
        entityNotFound: "Entität nicht gefunden",
        heatingOn: "HEIZUNG AN",
        heatingOff: "HEIZUNG AUS",
        preview: "VORSCHAU",
        temperatureTrend: "Temperaturverlauf",
        humidityTrend: "Luftfeuchtigkeitsverlauf",
        chartSubtitleWithCount: (count) => `Letzte ${count} Werte aus dieser Sitzung`,
        nowValue: (value, unit) => `Jetzt: ${value}${unit}`
      },
      fr: {
        current: "ACTUELLE",
        humidity: "HUMIDITÉ",
        showTemperatureChart: "Afficher le graphique de température",
        showHumidityChart: "Afficher le graphique d'humidité",
        temperature: "Température",
        chartSessionSubtitle: "Dernières valeurs de cette session",
        closeChart: "Fermer le graphique",
        entityNotFound: "Entité introuvable",
        heatingOn: "CHAUFFAGE ACTIVÉ",
        heatingOff: "CHAUFFAGE DÉSACTIVÉ",
        preview: "APERÇU",
        temperatureTrend: "Tendance de température",
        humidityTrend: "Tendance d'humidité",
        chartSubtitleWithCount: (count) => `${count} dernières valeurs de cette session`,
        nowValue: (value, unit) => `Maintenant : ${value}${unit}`
      },
      es: {
        current: "ACTUAL",
        humidity: "HUMEDAD",
        showTemperatureChart: "Mostrar gráfico de temperatura",
        showHumidityChart: "Mostrar gráfico de humedad",
        temperature: "Temperatura",
        chartSessionSubtitle: "Últimos valores de esta sesión",
        closeChart: "Cerrar gráfico",
        entityNotFound: "Entidad no encontrada",
        heatingOn: "CALEFACCIÓN ENCENDIDA",
        heatingOff: "CALEFACCIÓN APAGADA",
        preview: "VISTA PREVIA",
        temperatureTrend: "Tendencia de temperatura",
        humidityTrend: "Tendencia de humedad",
        chartSubtitleWithCount: (count) => `Últimos ${count} valores de esta sesión`,
        nowValue: (value, unit) => `Ahora: ${value}${unit}`
      },
      it: {
        current: "ATTUALE",
        humidity: "UMIDITÀ",
        showTemperatureChart: "Mostra grafico temperatura",
        showHumidityChart: "Mostra grafico umidità",
        temperature: "Temperatura",
        chartSessionSubtitle: "Ultimi valori di questa sessione",
        closeChart: "Chiudi grafico",
        entityNotFound: "Entità non trovata",
        heatingOn: "RISCALDAMENTO ATTIVO",
        heatingOff: "RISCALDAMENTO DISATTIVO",
        preview: "ANTEPRIMA",
        temperatureTrend: "Andamento temperatura",
        humidityTrend: "Andamento umidità",
        chartSubtitleWithCount: (count) => `Ultimi ${count} valori di questa sessione`,
        nowValue: (value, unit) => `Ora: ${value}${unit}`
      },
      pl: {
        current: "AKTUALNA",
        humidity: "WILGOTNOŚĆ",
        showTemperatureChart: "Pokaż wykres temperatury",
        showHumidityChart: "Pokaż wykres wilgotności",
        temperature: "Temperatura",
        chartSessionSubtitle: "Ostatnie wartości z tej sesji",
        closeChart: "Zamknij wykres",
        entityNotFound: "Nie znaleziono encji",
        heatingOn: "OGRZEWANIE WŁĄCZONE",
        heatingOff: "OGRZEWANIE WYŁĄCZONE",
        preview: "PODGLĄD",
        temperatureTrend: "Trend temperatury",
        humidityTrend: "Trend wilgotności",
        chartSubtitleWithCount: (count) => `Ostatnie ${count} wartości z tej sesji`,
        nowValue: (value, unit) => `Teraz: ${value}${unit}`
      },
      nl: {
        current: "HUIDIG",
        humidity: "VOCHTIGHEID",
        showTemperatureChart: "Temperatuurgrafiek tonen",
        showHumidityChart: "Vochtigheidsgrafiek tonen",
        temperature: "Temperatuur",
        chartSessionSubtitle: "Laatste waarden uit deze sessie",
        closeChart: "Grafiek sluiten",
        entityNotFound: "Entiteit niet gevonden",
        heatingOn: "VERWARMING AAN",
        heatingOff: "VERWARMING UIT",
        preview: "VOORBEELD",
        temperatureTrend: "Temperatuurtrend",
        humidityTrend: "Vochtigheidstrend",
        chartSubtitleWithCount: (count) => `Laatste ${count} waarden uit deze sessie`,
        nowValue: (value, unit) => `Nu: ${value}${unit}`
      },
      cs: {
        current: "AKTUÁLNÍ",
        humidity: "VLHKOST",
        showTemperatureChart: "Zobrazit graf teploty",
        showHumidityChart: "Zobrazit graf vlhkosti",
        temperature: "Teplota",
        chartSessionSubtitle: "Poslední hodnoty z této relace",
        closeChart: "Zavřít graf",
        entityNotFound: "Entita nebyla nalezena",
        heatingOn: "TOPENÍ ZAPNUTO",
        heatingOff: "TOPENÍ VYPNUTO",
        preview: "NÁHLED",
        temperatureTrend: "Trend teploty",
        humidityTrend: "Trend vlhkosti",
        chartSubtitleWithCount: (count) => `Posledních ${count} hodnot z této relace`,
        nowValue: (value, unit) => `Nyní: ${value}${unit}`
      }
    };
  }

  static async getConfigElement() {
    return document.createElement("heating-control-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:heating-control-card",
      entity: "climate.living_room",
      humidity_entity: "sensor.living_room_humidity",
      name: "Heating",
      min_temp: 16,
      max_temp: 28,
      step: 0.5,
      background_start: "#ffa20f",
      background_end: "#ff9800",
      slider_orientation: "vertical",
      slider_orientation_mobile: "vertical",
      slider_orientation_desktop: "vertical",
      desktop_layout: "standard",
      heating_on_mode: "heat",
      preview: false
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
    this._language = this._resolveLanguageCode(hass);

    if (!this.content || !this._config) {
      return;
    }

    this._updateStaticTexts();

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
      this._statusEl.textContent = this._t("entityNotFound");
      this._updateHeatingToggle(null);
      return;
    }

    const currentTemp = climateState.attributes.current_temperature;
    const targetTemp = climateState.attributes.temperature;
    const humidity = humidityState?.state;
    this._recordMetricValue(this._tempHistory, currentTemp);
    this._recordMetricValue(this._humidityHistory, humidity);

    this._currentTemperatureEl.textContent = this._formatTemperature(currentTemp);
    this._targetTemperatureEl.textContent = this._formatTemperature(targetTemp);
    this._humidityEl.textContent = humidity ? `${humidity}%` : "--";
    this._statusEl.textContent = climateState.state.toUpperCase();
    this._updateHeatingToggle(climateState);

    if (!this._isSliding) {
      this._slider.value = targetTemp ?? this._config.min_temp;
      this._updateSliderFill();
    }

    if (this._chartDrawerEl?.classList.contains("visible")) {
      this._drawActiveChart();
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
            <div id="current-temp-trigger" class="metric-trigger" role="button" tabindex="0">
              <div id="current-label" class="label">CURRENT</div>
              <div id="current-temperature" class="small-value">--</div>
            </div>
            <div id="humidity-trigger" class="right-block metric-trigger" role="button" tabindex="0">
              <div id="humidity-label" class="label">HUMIDITY</div>
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
        <div id="chart-drawer-overlay" class="chart-drawer-overlay hidden"></div>
        <aside id="chart-drawer" class="chart-drawer hidden" aria-hidden="true">
          <div class="chart-drawer-header">
            <div>
              <div id="chart-title" class="chart-title">Temperature</div>
              <div id="chart-subtitle" class="chart-subtitle">Last values from this session</div>
            </div>
            <button id="chart-close" class="chart-close" type="button">✕</button>
          </div>
          <canvas id="chart-canvas" class="chart-canvas" width="420" height="220"></canvas>
        </aside>
      </ha-card>
    `;

    const style = document.createElement("style");
    style.textContent = `
      ha-card {
        --ha-card-background: var(--card-bg-start, #ffa20f);
        position: relative;
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

      .metric-trigger {
        cursor: pointer;
        border-radius: 12px;
        padding: 2px 8px 4px;
        margin: -2px -8px -4px;
        transition: background 0.2s ease, transform 0.2s ease;
      }

      .metric-trigger:hover,
      .metric-trigger:focus-visible {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-1px);
        outline: none;
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
        --horizontal-slider-shell-height: var(--heating-horizontal-slider-shell-height, 90px);
        width: 320px;
        height: calc(var(--horizontal-slider-shell-height) + 60px);
      }

      .wrapper.desktop-compact .hud-slider-wrap.horizontal {
        width: 250px;
        height: calc(var(--horizontal-slider-shell-height) + 50px);
      }

      .hud-slider-wrap.horizontal .slider-shell {
        width: 290px;
        height: var(--horizontal-slider-shell-height);
      }

      .wrapper.desktop-compact .hud-slider-wrap.horizontal .slider-shell {
        width: 220px;
        height: var(--horizontal-slider-shell-height);
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

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud {
        --horizontal-slider-track-height: var(--heating-horizontal-slider-track-height, 12px);
        --horizontal-slider-thumb-size: var(--heating-horizontal-slider-thumb-size, 26px);
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud::-webkit-slider-runnable-track {
        height: var(--horizontal-slider-track-height);
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud::-moz-range-track {
        height: var(--horizontal-slider-track-height);
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud::-webkit-slider-thumb {
        width: var(--horizontal-slider-thumb-size);
        height: var(--horizontal-slider-thumb-size);
        margin-top: calc((var(--horizontal-slider-track-height) - var(--horizontal-slider-thumb-size)) / 2);
        border-radius: 50%;
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud::-moz-range-thumb {
        width: var(--horizontal-slider-thumb-size);
        height: var(--horizontal-slider-thumb-size);
        border-radius: 50%;
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

      .chart-drawer-overlay {
        position: absolute;
        inset: 0;
        background: rgba(5, 9, 16, 0.42);
        backdrop-filter: blur(2px);
        transition: opacity 0.25s ease;
      }

      .chart-drawer {
        position: absolute;
        top: 0;
        right: 0;
        width: min(86%, 360px);
        height: 100%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.93), rgba(245, 248, 255, 0.96));
        color: #17212f;
        border-top-left-radius: 28px;
        border-bottom-left-radius: 28px;
        box-shadow: -14px 0 38px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.28s ease;
        z-index: 5;
        padding: 18px 14px 12px;
        box-sizing: border-box;
      }

      .chart-drawer-overlay.hidden,
      .chart-drawer.hidden {
        pointer-events: none;
        opacity: 0;
      }

      .chart-drawer.visible {
        transform: translateX(0);
      }

      .chart-drawer-overlay.visible {
        opacity: 1;
        z-index: 4;
      }

      .chart-drawer-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 10px;
      }

      .chart-title {
        font-size: 17px;
        font-weight: 700;
      }

      .chart-subtitle {
        margin-top: 4px;
        font-size: 12px;
        color: rgba(23, 33, 47, 0.72);
      }

      .chart-close {
        border: none;
        background: rgba(23, 33, 47, 0.08);
        color: #17212f;
        border-radius: 999px;
        width: 30px;
        height: 30px;
        font-size: 15px;
        cursor: pointer;
      }

      .chart-canvas {
        width: 100%;
        height: 220px;
        border-radius: 16px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(238, 243, 251, 0.95));
      }
    `;

    this.appendChild(style);

    this.content = this.querySelector(".wrapper");
    this._slider = this.querySelector("#temp-slider");
    this._targetTemperatureEl = this.querySelector("#target-temperature");
    this._currentTemperatureEl = this.querySelector("#current-temperature");
    this._currentLabelEl = this.querySelector("#current-label");
    this._humidityLabelEl = this.querySelector("#humidity-label");
    this._humidityEl = this.querySelector("#humidity");
    this._statusEl = this.querySelector("#status");
    this._sliderWrapEl = this.querySelector(".hud-slider-wrap");
    this._heatingToggleEl = this.querySelector("#heating-toggle");
    this._tempTriggerEl = this.querySelector("#current-temp-trigger");
    this._humidityTriggerEl = this.querySelector("#humidity-trigger");
    this._chartDrawerEl = this.querySelector("#chart-drawer");
    this._chartDrawerOverlayEl = this.querySelector("#chart-drawer-overlay");
    this._chartTitleEl = this.querySelector("#chart-title");
    this._chartSubtitleEl = this.querySelector("#chart-subtitle");
    this._chartCanvasEl = this.querySelector("#chart-canvas");
    this._chartCloseEl = this.querySelector("#chart-close");
    this._tempHistory = [];
    this._humidityHistory = [];
    this._activeChart = "temperature";
    this._language = this._resolveLanguageCode(this._hass);

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

    this._tempTriggerEl.addEventListener("click", () => this._openChartDrawer("temperature"));
    this._humidityTriggerEl.addEventListener("click", () => this._openChartDrawer("humidity"));
    this._tempTriggerEl.addEventListener("keydown", (event) => this._onMetricTriggerKeydown(event, "temperature"));
    this._humidityTriggerEl.addEventListener("keydown", (event) => this._onMetricTriggerKeydown(event, "humidity"));
    this._chartCloseEl.addEventListener("click", () => this._closeChartDrawer());
    this._chartDrawerOverlayEl.addEventListener("click", () => this._closeChartDrawer());
    this._updateStaticTexts();
  }

  _resolveLanguageCode(hass) {
    const language =
      hass?.language ||
      hass?.locale?.language ||
      hass?.selectedLanguage ||
      (typeof navigator !== "undefined" ? navigator.language : "en");
    const shortCode = String(language || "en").toLowerCase().split("-")[0];
    return HeatingControlCard.TRANSLATIONS[shortCode] ? shortCode : "en";
  }

  _t(key) {
    return HeatingControlCard.TRANSLATIONS[this._language]?.[key] ?? HeatingControlCard.TRANSLATIONS.en[key] ?? key;
  }

  _updateStaticTexts() {
    if (!this._currentLabelEl || !this._humidityLabelEl) {
      return;
    }

    this._currentLabelEl.textContent = this._t("current");
    this._humidityLabelEl.textContent = this._t("humidity");
    this._tempTriggerEl?.setAttribute("aria-label", this._t("showTemperatureChart"));
    this._humidityTriggerEl?.setAttribute("aria-label", this._t("showHumidityChart"));
    this._chartCloseEl?.setAttribute("aria-label", this._t("closeChart"));
    if (!this._chartDrawerEl?.classList.contains("visible")) {
      this._chartTitleEl.textContent = this._t("temperature");
      this._chartSubtitleEl.textContent = this._t("chartSessionSubtitle");
    }
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
    this._heatingToggleEl.textContent = isHeatingEnabled ? this._t("heatingOn") : this._t("heatingOff");
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
    this._statusEl.textContent = this._t("preview");
    this._slider.value = previewTarget;
    this._updateSliderFill();
    this._heatingToggleEl.textContent = this._t("heatingOn");
    this._heatingToggleEl.disabled = true;
    this._heatingToggleEl.classList.remove("off");
    this._recordMetricValue(this._tempHistory, previewCurrent);
    this._recordMetricValue(this._humidityHistory, previewHumidity);
  }

  _onMetricTriggerKeydown(event, chartType) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._openChartDrawer(chartType);
    }
  }

  _openChartDrawer(chartType) {
    this._activeChart = chartType;
    this._chartDrawerEl.classList.remove("hidden");
    this._chartDrawerOverlayEl.classList.remove("hidden");
    this._chartDrawerEl.classList.add("visible");
    this._chartDrawerOverlayEl.classList.add("visible");
    this._chartDrawerEl.setAttribute("aria-hidden", "false");
    this._drawActiveChart();
  }

  _closeChartDrawer() {
    this._chartDrawerEl.classList.remove("visible");
    this._chartDrawerOverlayEl.classList.remove("visible");
    this._chartDrawerEl.classList.add("hidden");
    this._chartDrawerOverlayEl.classList.add("hidden");
    this._chartDrawerEl.setAttribute("aria-hidden", "true");
  }

  _recordMetricValue(history, value) {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
      return;
    }

    history.push(Number(value));
    if (history.length > 30) {
      history.shift();
    }
  }

  _drawActiveChart() {
    const showTemperature = this._activeChart === "temperature";
    const history = showTemperature ? this._tempHistory : this._humidityHistory;
    const chartColor = showTemperature ? "#f97921" : "#2f8df5";
    const unit = showTemperature ? "°C" : "%";

    this._chartTitleEl.textContent = showTemperature ? this._t("temperatureTrend") : this._t("humidityTrend");
    this._chartSubtitleEl.textContent = this._t("chartSubtitleWithCount")(Math.max(history.length, 1));

    const canvas = this._chartCanvasEl;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) {
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 24, right: 16, bottom: 32, left: 28 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    const values = history.length ? history : [0];
    const rawMinValue = Math.min(...values);
    const rawMaxValue = Math.max(...values);
    const paddingForFlatLine = rawMaxValue === rawMinValue ? Math.max(Math.abs(rawMaxValue) * 0.08, 1) : 0;
    const minValue = rawMinValue - paddingForFlatLine;
    const maxValue = rawMaxValue + paddingForFlatLine;
    const range = Math.max(maxValue - minValue, 0.01);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(23, 33, 47, 0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i += 1) {
      const y = padding.top + (plotHeight * i) / 3;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    ctx.strokeStyle = chartColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    values.forEach((value, index) => {
      const x =
        values.length === 1
          ? padding.left + plotWidth / 2
          : padding.left + (plotWidth * index) / (values.length - 1);
      const y = padding.top + ((maxValue - value) * plotHeight) / range;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    const lastValue = values[values.length - 1];
    const lastX = values.length === 1 ? padding.left + plotWidth / 2 : width - padding.right;
    const lastY = padding.top + ((maxValue - lastValue) * plotHeight) / range;
    ctx.fillStyle = chartColor;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(23, 33, 47, 0.8)";
    ctx.font = "600 13px sans-serif";
    ctx.fillText(this._t("nowValue")(Number(lastValue).toFixed(1), unit), padding.left, height - 10);
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

class HeatingControlCardEditor extends HTMLElement {
  static get EDITOR_TRANSLATIONS() {
    return {
      en: {
        climateEntity: "Climate entity",
        humidityEntity: "Humidity entity",
        cardName: "Card name",
        minimumTemperature: "Minimum temperature",
        maximumTemperature: "Maximum temperature",
        temperatureStep: "Temperature step",
        backgroundStart: "Background start",
        backgroundEnd: "Background end",
        sliderOrientation: "Slider orientation",
        mobileOrientation: "Mobile orientation",
        desktopOrientation: "Desktop orientation",
        desktopLayout: "Desktop layout",
        heatingOnMode: "Heating on mode",
        previewMode: "Preview mode",
        useDefault: "Use default"
      },
      de: {
        climateEntity: "Klima-Entität",
        humidityEntity: "Luftfeuchtigkeits-Entität",
        cardName: "Kartenname",
        minimumTemperature: "Mindesttemperatur",
        maximumTemperature: "Maximaltemperatur",
        temperatureStep: "Temperaturschritt",
        backgroundStart: "Hintergrund Start",
        backgroundEnd: "Hintergrund Ende",
        sliderOrientation: "Ausrichtung des Reglers",
        mobileOrientation: "Mobile Ausrichtung",
        desktopOrientation: "Desktop-Ausrichtung",
        desktopLayout: "Desktop-Layout",
        heatingOnMode: "Heizmodus beim Einschalten",
        previewMode: "Vorschaumodus",
        useDefault: "Standard verwenden"
      },
      fr: {
        climateEntity: "Entité climate",
        humidityEntity: "Entité d'humidité",
        cardName: "Nom de la carte",
        minimumTemperature: "Température minimale",
        maximumTemperature: "Température maximale",
        temperatureStep: "Pas de température",
        backgroundStart: "Début de fond",
        backgroundEnd: "Fin de fond",
        sliderOrientation: "Orientation du curseur",
        mobileOrientation: "Orientation mobile",
        desktopOrientation: "Orientation bureau",
        desktopLayout: "Disposition bureau",
        heatingOnMode: "Mode chauffage activé",
        previewMode: "Mode aperçu",
        useDefault: "Utiliser la valeur par défaut"
      },
      es: {
        climateEntity: "Entidad climate",
        humidityEntity: "Entidad de humedad",
        cardName: "Nombre de la tarjeta",
        minimumTemperature: "Temperatura mínima",
        maximumTemperature: "Temperatura máxima",
        temperatureStep: "Paso de temperatura",
        backgroundStart: "Inicio del fondo",
        backgroundEnd: "Fin del fondo",
        sliderOrientation: "Orientación del deslizador",
        mobileOrientation: "Orientación móvil",
        desktopOrientation: "Orientación de escritorio",
        desktopLayout: "Diseño de escritorio",
        heatingOnMode: "Modo al encender calefacción",
        previewMode: "Modo vista previa",
        useDefault: "Usar valor predeterminado"
      },
      it: {
        climateEntity: "Entità climate",
        humidityEntity: "Entità umidità",
        cardName: "Nome scheda",
        minimumTemperature: "Temperatura minima",
        maximumTemperature: "Temperatura massima",
        temperatureStep: "Passo temperatura",
        backgroundStart: "Inizio sfondo",
        backgroundEnd: "Fine sfondo",
        sliderOrientation: "Orientamento cursore",
        mobileOrientation: "Orientamento mobile",
        desktopOrientation: "Orientamento desktop",
        desktopLayout: "Layout desktop",
        heatingOnMode: "Modalità accensione riscaldamento",
        previewMode: "Modalità anteprima",
        useDefault: "Usa predefinito"
      },
      pl: {
        climateEntity: "Encja climate",
        humidityEntity: "Encja wilgotności",
        cardName: "Nazwa karty",
        minimumTemperature: "Temperatura minimalna",
        maximumTemperature: "Temperatura maksymalna",
        temperatureStep: "Krok temperatury",
        backgroundStart: "Początek tła",
        backgroundEnd: "Koniec tła",
        sliderOrientation: "Orientacja suwaka",
        mobileOrientation: "Orientacja mobilna",
        desktopOrientation: "Orientacja desktopowa",
        desktopLayout: "Układ desktopowy",
        heatingOnMode: "Tryb przy włączaniu ogrzewania",
        previewMode: "Tryb podglądu",
        useDefault: "Użyj domyślnej"
      },
      nl: {
        climateEntity: "Climate-entiteit",
        humidityEntity: "Vochtigheidsentiteit",
        cardName: "Kaartnaam",
        minimumTemperature: "Minimumtemperatuur",
        maximumTemperature: "Maximumtemperatuur",
        temperatureStep: "Temperatuurstap",
        backgroundStart: "Achtergrond begin",
        backgroundEnd: "Achtergrond einde",
        sliderOrientation: "Schuifrichting",
        mobileOrientation: "Mobiele oriëntatie",
        desktopOrientation: "Desktoporiëntatie",
        desktopLayout: "Desktopindeling",
        heatingOnMode: "Verwarmingsmodus bij inschakelen",
        previewMode: "Voorbeeldmodus",
        useDefault: "Standaard gebruiken"
      },
      cs: {
        climateEntity: "Entita climate",
        humidityEntity: "Entita vlhkosti",
        cardName: "Název karty",
        minimumTemperature: "Minimální teplota",
        maximumTemperature: "Maximální teplota",
        temperatureStep: "Krok teploty",
        backgroundStart: "Začátek pozadí",
        backgroundEnd: "Konec pozadí",
        sliderOrientation: "Orientace posuvníku",
        mobileOrientation: "Mobilní orientace",
        desktopOrientation: "Desktopová orientace",
        desktopLayout: "Rozložení desktopu",
        heatingOnMode: "Režim při zapnutí topení",
        previewMode: "Režim náhledu",
        useDefault: "Použít výchozí"
      }
    };
  }

  set hass(hass) {
    this._hass = hass;
    this._language = this._resolveLanguageCode(hass);
    this._render();
  }

  setConfig(config) {
    this._config = {
      ...HeatingControlCard.getStubConfig(),
      ...config
    };
    this._language = this._resolveLanguageCode(this._hass);
    this._render();
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
      </style>
      <div class="editor">
        ${this._textField("entity", this._te("climateEntity"), true)}
        ${this._textField("humidity_entity", this._te("humidityEntity"))}
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
        ${this._textField("heating_on_mode", this._te("heatingOnMode"))}
        <label class="full checkbox-row">
          <input type="checkbox" data-key="preview" ${this._config.preview ? "checked" : ""} />
          <span>${this._te("previewMode")}</span>
        </label>
      </div>
    `;

    this.querySelectorAll("[data-key]").forEach((input) => {
      input.addEventListener("change", (event) => this._handleValueChange(event));
      input.addEventListener("input", (event) => this._handleValueChange(event));
    });
  }

  _textField(key, label, required = false) {
    const value = this._config[key] ?? "";
    return `
      <label>
        <span>${label}</span>
        <input type="text" data-key="${key}" value="${value}" ${required ? "required" : ""} />
      </label>
    `;
  }

  _numberField(key, label, step = "0.5") {
    const value = this._config[key] ?? "";
    return `
      <label>
        <span>${label}</span>
        <input type="number" data-key="${key}" value="${value}" step="${step}" />
      </label>
    `;
  }

  _colorField(key, label) {
    const value = this._config[key] ?? "";
    return `
      <label>
        <span>${label}</span>
        <input type="text" data-key="${key}" value="${value}" placeholder="#ffa20f" />
      </label>
    `;
  }

  _selectField(key, label, options) {
    const value = this._config[key] ?? "";
    const optionsMarkup = options
      .map((option) => {
        const optionLabel = option === "" ? this._te("useDefault") : option;
        return `<option value="${option}" ${value === option ? "selected" : ""}>${optionLabel}</option>`;
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

customElements.define("heating-control-card-editor", HeatingControlCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "heating-control-card",
  name: "Heating Control Card",
  description: "A custom orange heating dashboard card with a thermostat slider.",
  preview: true
});
