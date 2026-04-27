class HeatingControlCard extends HTMLElement {
  static get TRANSLATIONS() {
    return {
      en: {
        current: "CURRENT",
        humidity: "HUMIDITY",
        showTemperatureChart: "Show temperature history",
        showHumidityChart: "Show humidity history",
        temperature: "Temperature",
        closeChart: "Close chart",
        entityNotFound: "Entity not found",
        heatingOn: "HEATING ON",
        heatingOff: "HEATING OFF",
        preview: "PREVIEW",
        temperatureTrend: "Temperature history",
        humidityTrend: "Humidity history",
        chartSubtitleWithCount: (rangeLabel, count) => `${rangeLabel} history · ${count} points`,
        nowValue: (value, unit) => `Now: ${value}${unit}`,
        loadingHistory: "Loading history…",
        noHistoryData: "No history data available for the selected period.",
        historyUnavailable: "History could not be loaded. Check Recorder / History settings."
      },
      de: {
        current: "AKTUELL",
        humidity: "LUFTFEUCHTIGKEIT",
        showTemperatureChart: "24h-Temperaturverlauf anzeigen",
        showHumidityChart: "24h-Luftfeuchtigkeitsverlauf anzeigen",
        temperature: "Temperatur",
        closeChart: "Diagramm schließen",
        entityNotFound: "Entität nicht gefunden",
        heatingOn: "HEIZUNG AN",
        heatingOff: "HEIZUNG AUS",
        preview: "VORSCHAU",
        temperatureTrend: "Temperaturverlauf",
        humidityTrend: "Luftfeuchtigkeitsverlauf",
        chartSubtitleWithCount: (rangeLabel, count) => `${rangeLabel}-Verlauf · ${count} Punkte`,
        nowValue: (value, unit) => `Jetzt: ${value}${unit}`,
        loadingHistory: "Historie wird geladen…",
        noHistoryData: "Für den ausgewählten Zeitraum sind keine Verlaufsdaten vorhanden.",
        historyUnavailable: "Historie konnte nicht geladen werden. Recorder-/Historie-Einstellungen prüfen."
      },
      fr: {
        current: "ACTUELLE",
        humidity: "HUMIDITÉ",
        showTemperatureChart: "Afficher l'historique de température sur 24 h",
        showHumidityChart: "Afficher l'historique d'humidité sur 24 h",
        temperature: "Température",
        closeChart: "Fermer le graphique",
        entityNotFound: "Entité introuvable",
        heatingOn: "CHAUFFAGE ACTIVÉ",
        heatingOff: "CHAUFFAGE DÉSACTIVÉ",
        preview: "APERÇU",
        temperatureTrend: "Historique de température",
        humidityTrend: "Historique d'humidité",
        chartSubtitleWithCount: (rangeLabel, count) => `Historique ${rangeLabel} · ${count} points`,
        nowValue: (value, unit) => `Maintenant : ${value}${unit}`,
        loadingHistory: "Chargement de l'historique…",
        noHistoryData: "Aucune donnée d'historique disponible pour la période sélectionnée.",
        historyUnavailable: "Impossible de charger l'historique. Vérifiez Recorder / Historique."
      },
      es: {
        current: "ACTUAL",
        humidity: "HUMEDAD",
        showTemperatureChart: "Mostrar historial de temperatura de 24 h",
        showHumidityChart: "Mostrar historial de humedad de 24 h",
        temperature: "Temperatura",
        closeChart: "Cerrar gráfico",
        entityNotFound: "Entidad no encontrada",
        heatingOn: "CALEFACCIÓN ENCENDIDA",
        heatingOff: "CALEFACCIÓN APAGADA",
        preview: "VISTA PREVIA",
        temperatureTrend: "Historial de temperatura",
        humidityTrend: "Historial de humedad",
        chartSubtitleWithCount: (rangeLabel, count) => `Historial de ${rangeLabel} · ${count} puntos`,
        nowValue: (value, unit) => `Ahora: ${value}${unit}`,
        loadingHistory: "Cargando historial…",
        noHistoryData: "No hay datos de historial para el período seleccionado.",
        historyUnavailable: "No se pudo cargar el historial. Revisa Recorder / Historial."
      },
      it: {
        current: "ATTUALE",
        humidity: "UMIDITÀ",
        showTemperatureChart: "Mostra storico temperatura 24 h",
        showHumidityChart: "Mostra storico umidità 24 h",
        temperature: "Temperatura",
        closeChart: "Chiudi grafico",
        entityNotFound: "Entità non trovata",
        heatingOn: "RISCALDAMENTO ATTIVO",
        heatingOff: "RISCALDAMENTO DISATTIVO",
        preview: "ANTEPRIMA",
        temperatureTrend: "Storico temperatura",
        humidityTrend: "Storico umidità",
        chartSubtitleWithCount: (rangeLabel, count) => `Storico ${rangeLabel} · ${count} punti`,
        nowValue: (value, unit) => `Ora: ${value}${unit}`,
        loadingHistory: "Caricamento storico…",
        noHistoryData: "Nessun dato storico disponibile per il periodo selezionato.",
        historyUnavailable: "Impossibile caricare lo storico. Controlla Recorder / History."
      },
      pl: {
        current: "AKTUALNA",
        humidity: "WILGOTNOŚĆ",
        showTemperatureChart: "Pokaż historię temperatury z 24 h",
        showHumidityChart: "Pokaż historię wilgotności z 24 h",
        temperature: "Temperatura",
        closeChart: "Zamknij wykres",
        entityNotFound: "Nie znaleziono encji",
        heatingOn: "OGRZEWANIE WŁĄCZONE",
        heatingOff: "OGRZEWANIE WYŁĄCZONE",
        preview: "PODGLĄD",
        temperatureTrend: "Historia temperatury",
        humidityTrend: "Historia wilgotności",
        chartSubtitleWithCount: (rangeLabel, count) => `Historia ${rangeLabel} · ${count} punktów`,
        nowValue: (value, unit) => `Teraz: ${value}${unit}`,
        loadingHistory: "Ładowanie historii…",
        noHistoryData: "Brak danych historycznych dla wybranego okresu.",
        historyUnavailable: "Nie udało się wczytać historii. Sprawdź Recorder / History."
      },
      nl: {
        current: "HUIDIG",
        humidity: "VOCHTIGHEID",
        showTemperatureChart: "24u-temperatuurgeschiedenis tonen",
        showHumidityChart: "24u-vochtigheidsgeschiedenis tonen",
        temperature: "Temperatuur",
        closeChart: "Grafiek sluiten",
        entityNotFound: "Entiteit niet gevonden",
        heatingOn: "VERWARMING AAN",
        heatingOff: "VERWARMING UIT",
        preview: "VOORBEELD",
        temperatureTrend: "Temperatuurgeschiedenis",
        humidityTrend: "Vochtigheidsgeschiedenis",
        chartSubtitleWithCount: (rangeLabel, count) => `${rangeLabel}-geschiedenis · ${count} punten`,
        nowValue: (value, unit) => `Nu: ${value}${unit}`,
        loadingHistory: "Geschiedenis laden…",
        noHistoryData: "Geen historische gegevens beschikbaar voor de geselecteerde periode.",
        historyUnavailable: "Geschiedenis kon niet worden geladen. Controleer Recorder / Geschiedenis."
      },
      cs: {
        current: "AKTUÁLNÍ",
        humidity: "VLHKOST",
        showTemperatureChart: "Zobrazit 24h historii teploty",
        showHumidityChart: "Zobrazit 24h historii vlhkosti",
        temperature: "Teplota",
        closeChart: "Zavřít graf",
        entityNotFound: "Entita nebyla nalezena",
        heatingOn: "TOPENÍ ZAPNUTO",
        heatingOff: "TOPENÍ VYPNUTO",
        preview: "NÁHLED",
        temperatureTrend: "Historie teploty",
        humidityTrend: "Historie vlhkosti",
        chartSubtitleWithCount: (rangeLabel, count) => `Historie ${rangeLabel} · ${count} bodů`,
        nowValue: (value, unit) => `Nyní: ${value}${unit}`,
        loadingHistory: "Načítá se historie…",
        noHistoryData: "Pro vybrané období nejsou k dispozici žádná historická data.",
        historyUnavailable: "Historii se nepodařilo načíst. Zkontrolujte Recorder / Historii."
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
      history_range: "24h",
      preview: false
    };
  }

  constructor() {
    super();
    this._config = null;
    this._hass = null;
    this._language = "en";
    this._isSliding = false;
    this._activeChart = "temperature";
    this._historyCache = {
      temperature: null,
      humidity: null
    };
    this._chartRequestToken = 0;
    this._resizeObserver = null;
  }

  setConfig(config) {
    if (!config?.entity) {
      throw new Error("You need to define a climate entity");
    }

    const previousConfig = this._config;

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
      history_range: "24h",
      ...config
    };

    if (!this.content) {
      this._buildCard();
    }

    const entityChanged =
      previousConfig?.entity !== this._config.entity ||
      previousConfig?.humidity_entity !== this._config.humidity_entity ||
      previousConfig?.history_range !== this._config.history_range ||
      previousConfig?.preview !== this._config.preview;

    if (entityChanged) {
      this._invalidateHistoryCache();
    }

    this._applyConfig();

    if (this._hass) {
      this.hass = this._hass;
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

    this._currentTemperatureEl.textContent = this._formatTemperature(currentTemp);
    this._targetTemperatureEl.textContent = this._formatTemperature(targetTemp);
    this._humidityEl.textContent = this._formatHumidity(humidity);
    this._statusEl.textContent = String(climateState.state || "--").toUpperCase();
    this._updateHeatingToggle(climateState);

    if (!this._isSliding) {
      this._slider.value = Number.isFinite(Number(targetTemp)) ? Number(targetTemp) : this._config.min_temp;
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
            <div id="card-name" class="name">Heater</div>
          </div>
        </div>
        <div id="chart-drawer-overlay" class="chart-drawer-overlay hidden"></div>
        <aside id="chart-drawer" class="chart-drawer hidden" aria-hidden="true">
          <div class="chart-drawer-header">
            <div>
              <div id="chart-title" class="chart-title">Temperature</div>
              <div id="chart-subtitle" class="chart-subtitle">History</div>
            </div>
            <button id="chart-close" class="chart-close" type="button">✕</button>
          </div>
          <canvas id="chart-canvas" class="chart-canvas"></canvas>
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

      .metric-trigger.disabled {
        cursor: default;
        opacity: 0.7;
      }

      .metric-trigger.disabled:hover,
      .metric-trigger.disabled:focus-visible {
        background: transparent;
        transform: none;
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
        display: block;
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
    this._nameEl = this.querySelector("#card-name");
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
    this._language = this._resolveLanguageCode(this._hass);

    this._setupViewportListener();
    this._setupResizeObserver();

    this._slider.addEventListener("input", () => {
      this._isSliding = true;
      const value = Number(this._slider.value);
      this._targetTemperatureEl.textContent = this._formatTemperature(value);
      this._updateSliderFill();
    });

    this._slider.addEventListener("change", async () => {
      if (!this._hass || this._isInPreviewMode()) {
        this._isSliding = false;
        return;
      }

      const value = Number(this._slider.value);
      const currentTarget = Number(this._hass.states?.[this._config.entity]?.attributes?.temperature);

      if (Number.isFinite(currentTarget) && Math.abs(currentTarget - value) < 0.001) {
        this._isSliding = false;
        return;
      }

      try {
        await this._hass.callService("climate", "set_temperature", {
          entity_id: this._config.entity,
          temperature: value
        });
      } catch (error) {
        console.error("[heating-control-card] Failed to set temperature", error);
      } finally {
        this._isSliding = false;
      }
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

  _applyConfig() {
    if (!this.content) {
      return;
    }

    this._nameEl.textContent = this._config.name || "Heater";
    this._slider.min = this._config.min_temp;
    this._slider.max = this._config.max_temp;
    this._slider.step = this._config.step;
    this._applyAppearance();
    this._updateSliderFill();
    this._updateHumidityTriggerState();
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
    this._updateHumidityTriggerState();
  }

  _updateHumidityTriggerState() {
    if (!this._humidityTriggerEl) {
      return;
    }

    const hasHumidityEntity = Boolean(this._config?.humidity_entity);
    this._humidityTriggerEl.classList.toggle("disabled", !hasHumidityEntity);
    this._humidityTriggerEl.setAttribute("aria-disabled", String(!hasHumidityEntity));
  }

  _formatTemperature(value) {
    if (!Number.isFinite(Number(value))) {
      return "--";
    }

    return Number(value).toFixed(1);
  }

  _formatHumidity(value) {
    if (!Number.isFinite(Number(value))) {
      return "--";
    }

    return `${Number(value).toFixed(0)}%`;
  }

  _updateSliderFill() {
    if (!this._slider) {
      return;
    }

    const min = Number(this._slider.min);
    const max = Number(this._slider.max);
    const current = Number(this._slider.value);
    const range = max - min;
    const percentage = range <= 0 ? 0 : ((current - min) * 100) / range;
    this._slider.style.setProperty("--fill", `${Math.min(Math.max(percentage, 0), 100)}%`);
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

    try {
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
    } catch (error) {
      console.error("[heating-control-card] Failed to toggle heating", error);
    }
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

    if (this._chartDrawerEl?.classList.contains("visible")) {
      this._renderActiveChartFromCache();
    }
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

    if (typeof this._mediaQuery.addEventListener === "function") {
      this._mediaQuery.addEventListener("change", this._onViewportChange);
    } else if (typeof this._mediaQuery.addListener === "function") {
      this._mediaQuery.addListener(this._onViewportChange);
    }
  }

  _setupResizeObserver() {
    if (this._resizeObserver || typeof ResizeObserver === "undefined" || !this._chartCanvasEl) {
      return;
    }

    this._resizeObserver = new ResizeObserver(() => {
      if (this._chartDrawerEl?.classList.contains("visible")) {
        this._renderActiveChartFromCache();
      }
    });

    this._resizeObserver.observe(this._chartCanvasEl);
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
  }

  _onMetricTriggerKeydown(event, chartType) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._openChartDrawer(chartType);
    }
  }

  _openChartDrawer(chartType) {
    if (chartType === "humidity" && !this._config?.humidity_entity && !this._isInPreviewMode()) {
      return;
    }

    this._activeChart = chartType;
    this._chartDrawerEl.classList.remove("hidden");
    this._chartDrawerOverlayEl.classList.remove("hidden");
    this._chartDrawerEl.classList.add("visible");
    this._chartDrawerOverlayEl.classList.add("visible");
    this._chartDrawerEl.setAttribute("aria-hidden", "false");

    this._setChartHeader(chartType, null);
    this._drawChartMessage(this._t("loadingHistory"));

    requestAnimationFrame(() => {
      this._loadAndRenderChart(chartType);
    });
  }

  _closeChartDrawer() {
    this._chartRequestToken += 1;
    this._chartDrawerEl.classList.remove("visible");
    this._chartDrawerOverlayEl.classList.remove("visible");
    this._chartDrawerEl.classList.add("hidden");
    this._chartDrawerOverlayEl.classList.add("hidden");
    this._chartDrawerEl.setAttribute("aria-hidden", "true");
  }

  _setChartHeader(chartType, pointCount) {
    const isTemperature = chartType === "temperature";
    const rangeLabel = this._getHistoryRangeLabel();
    this._chartTitleEl.textContent = isTemperature ? this._t("temperatureTrend") : this._t("humidityTrend");
    this._chartSubtitleEl.textContent =
      typeof pointCount === "number" ? this._t("chartSubtitleWithCount")(rangeLabel, pointCount) : this._t("loadingHistory");
  }

  async _loadAndRenderChart(chartType) {
    const requestToken = ++this._chartRequestToken;

    try {
      const points = await this._getChartPoints(chartType);

      if (requestToken !== this._chartRequestToken || this._activeChart !== chartType) {
        return;
      }

      if (!points.length) {
        this._setChartHeader(chartType, 0);
        this._drawChartMessage(this._t("noHistoryData"));
        return;
      }

      this._setChartHeader(chartType, points.length);
      this._drawSeries(chartType, points);
    } catch (error) {
      if (requestToken !== this._chartRequestToken || this._activeChart !== chartType) {
        return;
      }

      this._setChartHeader(chartType, 0);
      this._drawChartMessage(this._t("historyUnavailable"));
      console.error("[heating-control-card] Failed to load chart history", error);
    }
  }

  async _getChartPoints(chartType) {
    if (this._isInPreviewMode()) {
      const points = this._buildPreviewHistory(chartType);
      this._historyCache[chartType] = {
        entityId: chartType,
        historyRange: this._getHistoryRangeSetting(),
        fetchedAt: Date.now(),
        points
      };
      return points;
    }

    const entityId = chartType === "temperature" ? this._config.entity : this._config.humidity_entity;
    if (!entityId) {
      return [];
    }

    const cachedEntry = this._historyCache[chartType];
    const historyRange = this._getHistoryRangeSetting();
    const cacheIsValid =
      cachedEntry &&
      cachedEntry.entityId === entityId &&
      cachedEntry.historyRange === historyRange &&
      Date.now() - cachedEntry.fetchedAt < 5 * 60 * 1000;

    if (cacheIsValid) {
      return cachedEntry.points;
    }

    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - this._getHistoryRangeDurationMs());

    const query = new URLSearchParams({
      filter_entity_id: entityId,
      end_time: endTime.toISOString(),
      significant_changes_only: "0"
    });

    const historyResponse = await this._hass.callApi(
      "GET",
      `history/period/${startTime.toISOString()}?${query.toString()}`
    );

    const rawStates = Array.isArray(historyResponse?.[0]) ? historyResponse[0] : [];
    const mappedPoints = rawStates
      .map((entry) => {
        const timestamp = new Date(entry.last_changed || entry.last_updated).getTime();
        const value =
          chartType === "temperature"
            ? Number(entry.attributes?.current_temperature)
            : Number(entry.state);

        if (!Number.isFinite(timestamp) || !Number.isFinite(value)) {
          return null;
        }

        return { timestamp, value };
      })
      .filter(Boolean);

    const pointsWithCurrent = this._appendCurrentPoint(chartType, mappedPoints, endTime.getTime());
    const normalizedPoints = this._downsamplePoints(this._dedupePoints(pointsWithCurrent), this._getHistoryMaxPoints());

    this._historyCache[chartType] = {
      entityId,
      historyRange,
      fetchedAt: Date.now(),
      points: normalizedPoints
    };

    return normalizedPoints;
  }

  _appendCurrentPoint(chartType, points, timestamp) {
    const liveValue =
      chartType === "temperature"
        ? Number(this._hass?.states?.[this._config.entity]?.attributes?.current_temperature)
        : Number(this._hass?.states?.[this._config.humidity_entity]?.state);

    if (!Number.isFinite(liveValue)) {
      return points;
    }

    const updated = [...points];
    const lastPoint = updated[updated.length - 1];
    if (!lastPoint || Math.abs(lastPoint.timestamp - timestamp) > 60 * 1000 || Math.abs(lastPoint.value - liveValue) > 0.01) {
      updated.push({ timestamp, value: liveValue });
    }

    return updated;
  }

  _dedupePoints(points) {
    const map = new Map();
    points.forEach((point) => {
      map.set(point.timestamp, point);
    });
    return [...map.values()].sort((a, b) => a.timestamp - b.timestamp);
  }

  _downsamplePoints(points, maxPoints) {
    if (points.length <= maxPoints) {
      return points;
    }

    const result = [];
    const step = (points.length - 1) / (maxPoints - 1);

    for (let index = 0; index < maxPoints; index += 1) {
      const sourceIndex = Math.round(index * step);
      result.push(points[sourceIndex]);
    }

    return this._dedupePoints(result);
  }

  _buildPreviewHistory(chartType) {
    const endTime = Date.now();
    const durationMs = this._getHistoryRangeDurationMs();
    const startTime = endTime - durationMs;
    const targetPoints = this._getHistoryPreviewPointCount();
    const points = [];

    for (let index = 0; index <= targetPoints; index += 1) {
      const ratio = index / targetPoints;
      const timestamp = startTime + ratio * (endTime - startTime);
      const baseValue = chartType === "temperature" ? 21.5 : 46;
      const amplitude = chartType === "temperature" ? 1.6 : 8;
      const wave = Math.sin(ratio * Math.PI * 2.1) * amplitude;
      const detail = Math.cos(ratio * Math.PI * 5.3) * amplitude * 0.18;
      points.push({
        timestamp,
        value: Number((baseValue + wave + detail).toFixed(1))
      });
    }

    return points;
  }

  _renderActiveChartFromCache() {
    const cachedEntry = this._historyCache[this._activeChart];

    if (!cachedEntry?.points?.length) {
      this._drawChartMessage(this._t("loadingHistory"));
      return;
    }

    this._setChartHeader(this._activeChart, cachedEntry.points.length);
    this._drawSeries(this._activeChart, cachedEntry.points);
  }

  _getCanvasContext() {
    const canvas = this._chartCanvasEl;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();
    const cssWidth = Math.round(rect.width) || 320;
    const cssHeight = Math.round(rect.height) || 220;
    const dpr = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(cssWidth * dpr);
    const pixelHeight = Math.round(cssHeight * dpr);

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    return { canvas, ctx, width: cssWidth, height: cssHeight };
  }

  _drawChartMessage(message) {
    const canvasContext = this._getCanvasContext();
    if (!canvasContext) {
      return;
    }

    const { ctx, width, height } = canvasContext;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(23, 33, 47, 0.7)";
    ctx.font = "600 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lines = String(message).split("\n");
    lines.forEach((line, index) => {
      const offset = (index - (lines.length - 1) / 2) * 20;
      ctx.fillText(line, width / 2, height / 2 + offset);
    });

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  }

  _drawSeries(chartType, points) {
    const canvasContext = this._getCanvasContext();
    if (!canvasContext) {
      return;
    }

    const { ctx, width, height } = canvasContext;
    const padding = { top: 18, right: 16, bottom: 34, left: 16 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    const chartColor = chartType === "temperature" ? "#f97921" : "#2f8df5";
    const unit = chartType === "temperature" ? "°C" : "%";
    const endTime = Date.now();
    const startTime = endTime - this._getHistoryRangeDurationMs();
    const values = points.map((point) => point.value);
    const rawMinValue = Math.min(...values);
    const rawMaxValue = Math.max(...values);
    const flatPadding = rawMaxValue === rawMinValue ? Math.max(Math.abs(rawMaxValue) * 0.08, 1) : 0;
    const minValue = rawMinValue - flatPadding;
    const maxValue = rawMaxValue + flatPadding;
    const range = Math.max(maxValue - minValue, 0.01);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(23, 33, 47, 0.1)";
    ctx.lineWidth = 1;
    for (let index = 0; index < 4; index += 1) {
      const y = padding.top + (plotHeight * index) / 3;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    const projectX = (timestamp) => padding.left + ((timestamp - startTime) * plotWidth) / (endTime - startTime);
    const projectY = (value) => padding.top + ((maxValue - value) * plotHeight) / range;

    ctx.beginPath();
    points.forEach((point, index) => {
      const x = projectX(point.timestamp);
      const y = projectY(point.value);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineWidth = 3;
    ctx.strokeStyle = chartColor;
    ctx.stroke();

    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.lineTo(projectX(points[points.length - 1].timestamp), height - padding.bottom);
    ctx.lineTo(projectX(points[0].timestamp), height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = chartColor;
    ctx.fill();
    ctx.restore();

    const lastPoint = points[points.length - 1];
    const lastX = projectX(lastPoint.timestamp);
    const lastY = projectY(lastPoint.value);
    ctx.fillStyle = chartColor;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
    ctx.fill();

    const timeFormatter = new Intl.DateTimeFormat(this._language, {
      hour: "2-digit",
      minute: "2-digit"
    });

    ctx.fillStyle = "rgba(23, 33, 47, 0.74)";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(timeFormatter.format(new Date(startTime)), padding.left, height - 10);
    ctx.textAlign = "right";
    ctx.fillText(timeFormatter.format(new Date(endTime)), width - padding.right, height - 10);

    ctx.textAlign = "right";
    ctx.font = "600 11px sans-serif";
    ctx.fillStyle = "rgba(23, 33, 47, 0.68)";
    ctx.fillText(this._formatChartValue(maxValue, unit), width - padding.right, padding.top - 4);
    ctx.fillText(this._formatChartValue(minValue, unit), width - padding.right, height - padding.bottom + 14);

    ctx.textAlign = "left";
    ctx.font = "600 13px sans-serif";
    ctx.fillStyle = "rgba(23, 33, 47, 0.82)";
    ctx.fillText(this._t("nowValue")(this._formatCompactNumber(lastPoint.value), unit), padding.left, 14);
  }

  _formatChartValue(value, unit) {
    return `${this._formatCompactNumber(value)}${unit}`;
  }

  _formatCompactNumber(value) {
    if (!Number.isFinite(Number(value))) {
      return "--";
    }

    return Math.abs(Number(value)) >= 100 ? Number(value).toFixed(0) : Number(value).toFixed(1);
  }

  _getHistoryRangeSetting() {
    const configuredRange = String(this._config?.history_range || "24h").toLowerCase();
    return ["24h", "7d", "30d"].includes(configuredRange) ? configuredRange : "24h";
  }

  _getHistoryRangeDurationMs() {
    const historyRange = this._getHistoryRangeSetting();
    if (historyRange === "7d") {
      return 7 * 24 * 60 * 60 * 1000;
    }
    if (historyRange === "30d") {
      return 30 * 24 * 60 * 60 * 1000;
    }
    return 24 * 60 * 60 * 1000;
  }

  _getHistoryRangeLabel() {
    const historyRange = this._getHistoryRangeSetting();
    if (historyRange === "24h") {
      return "24h";
    }
    return historyRange;
  }

  _getHistoryMaxPoints() {
    const historyRange = this._getHistoryRangeSetting();
    if (historyRange === "7d") {
      return 336;
    }
    if (historyRange === "30d") {
      return 360;
    }
    return 240;
  }

  _getHistoryPreviewPointCount() {
    const historyRange = this._getHistoryRangeSetting();
    if (historyRange === "7d") {
      return 42;
    }
    if (historyRange === "30d") {
      return 60;
    }
    return 24;
  }

  _invalidateHistoryCache() {
    this._historyCache = {
      temperature: null,
      humidity: null
    };
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
      if (typeof this._mediaQuery.removeEventListener === "function") {
        this._mediaQuery.removeEventListener("change", this._onViewportChange);
      } else if (typeof this._mediaQuery.removeListener === "function") {
        this._mediaQuery.removeListener(this._onViewportChange);
      }
    }

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }
}

if (!customElements.get("heating-control-card")) {
  customElements.define("heating-control-card", HeatingControlCard);
}

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
        historyRange: "History range",
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
        historyRange: "Historien-Zeitraum",
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
        historyRange: "Plage d'historique",
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
        historyRange: "Rango del historial",
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
        historyRange: "Intervallo storico",
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
        historyRange: "Zakres historii",
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
        historyRange: "Geschiedenisbereik",
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
        historyRange: "Rozsah historie",
        previewMode: "Režim náhledu",
        useDefault: "Použít výchozí"
      }
    };
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

if (!customElements.get("heating-control-card-editor")) {
  customElements.define("heating-control-card-editor", HeatingControlCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "heating-control-card")) {
  window.customCards.push({
    type: "heating-control-card",
    name: "Heating Control Card",
    description: "A custom orange heating dashboard card with a thermostat slider and 24h history drawer.",
    preview: true
  });
}
