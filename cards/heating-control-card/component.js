import { ensureClimateEntity, heatingControlDefaultConfig, normalizeHeatingControlConfig } from "./config.js";
import { getCardSectionTranslations } from "./i18n.js";
import { setClimateHvacMode, setClimateTemperature } from "./services.js";
import { heatingControlCardStyles } from "./styles.js";

export class HeatingControlCard extends HTMLElement {
  static get TRANSLATIONS() {
    return getCardSectionTranslations("heatingControlCard");
  }

  static async getConfigElement() {
    if (!customElements.get("heating-control-card-editor")) {
      const { HeatingControlCardEditor } = await import("./editor.js");
      customElements.define("heating-control-card-editor", HeatingControlCardEditor);
    }

    return document.createElement("heating-control-card-editor");
  }

  static getStubConfig() {
    return { ...heatingControlDefaultConfig };
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
    ensureClimateEntity(config);

    const previousConfig = this._config;

    this._config = normalizeHeatingControlConfig(config);

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
      this._updateOptionalInfoRows(null, false, [this._t("entityFixHint")]);
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
    this._updateOptionalInfoRows(hass.states);

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
          <div id="optional-info" class="optional-info"></div>
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
    style.textContent = heatingControlCardStyles;


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
    this._optionalInfoEl = this.querySelector("#optional-info");
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
        await setClimateTemperature(this._hass, this._config.entity, value);
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
    const hvacModes = climateState.attributes?.hvac_modes || [];
    const configuredModes = this._getConfiguredHeatingModes();

    for (const configuredMode of configuredModes) {
      if (hvacModes.includes(configuredMode)) {
        return configuredMode;
      }
    }

    const preferredModes = ["heat", "auto", "heat_cool", "cool", "dry", "fan_only"];
    for (const preferredMode of preferredModes) {
      if (hvacModes.includes(preferredMode)) {
        return preferredMode;
      }
    }

    return hvacModes.find((mode) => mode !== "off") || "heat";
  }

  _getConfiguredHeatingModes() {
    const configuredValue = this._config?.heating_on_mode;

    if (Array.isArray(configuredValue)) {
      return configuredValue.map((mode) => String(mode).toLowerCase()).filter(Boolean);
    }

    return String(configuredValue || "heat")
      .split(/[,\s;|]+/)
      .map((mode) => mode.trim().toLowerCase())
      .filter(Boolean);
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
    this._updateOptionalInfoRows(null, true);
  }

  _updateOptionalInfoRows(states, preview = false, hints = []) {
    if (!this._optionalInfoEl) {
      return;
    }

    const rows = this._buildOptionalInfoRows(states, preview);
    const hintMarkup = hints.length
      ? `
        <div class="optional-info-hints">
          ${hints.map((hint) => `<div class="optional-info-hint">${hint}</div>`).join("")}
        </div>
      `
      : "";

    this._optionalInfoEl.innerHTML = `
      ${hintMarkup}
      ${rows
        .map(
          (row) => `
            <div class="optional-info-row">
              <span class="optional-info-label">${row.label}</span>
              <span class="optional-info-value">${row.value}</span>
            </div>
          `
        )
        .join("")}
    `;
  }

  _buildOptionalInfoRows(states, preview = false) {
    if (preview) {
      return [
        { label: this._t("outdoorTemperature"), value: "9.6°C" },
        { label: this._t("windowContact"), value: this._t("stateClosed") },
        { label: this._t("co2"), value: "740 ppm" },
        { label: this._t("heatingActiveFor"), value: `32 ${this._t("minutesShort")}` },
        { label: this._t("battery"), value: "84%" }
      ];
    }

    const metrics = [
      {
        configKey: "outdoor_temp_entity",
        label: this._t("outdoorTemperature"),
        formatter: (entityState) => this._formatTemperatureWithUnit(entityState?.state, entityState?.attributes?.unit_of_measurement)
      },
      {
        configKey: "window_contact_entity",
        label: this._t("windowContact"),
        formatter: (entityState) => this._formatContactState(entityState?.state)
      },
      {
        configKey: "co2_entity",
        label: this._t("co2"),
        formatter: (entityState) => this._formatCo2(entityState?.state, entityState?.attributes?.unit_of_measurement)
      },
      {
        configKey: "heating_active_since_entity",
        label: this._t("heatingActiveFor"),
        formatter: (entityState) => this._formatHeatingActiveSince(entityState?.state)
      },
      {
        configKey: "battery_entity",
        label: this._t("battery"),
        formatter: (entityState) => this._formatBattery(entityState?.state, entityState?.attributes?.unit_of_measurement)
      }
    ];

    return metrics
      .map((metric) => {
        const entityId = this._config?.[metric.configKey];
        if (!entityId) {
          return null;
        }

        const entityState = states?.[entityId];
        if (!entityState || this._isUnavailableEntityState(entityState.state)) {
          return null;
        }

        const value = metric.formatter(entityState);
        if (this._isEmptyOptionalMetricValue(value)) {
          return null;
        }

        return {
          label: metric.label,
          value
        };
      })
      .filter(Boolean);
  }

  _isUnavailableEntityState(value) {
    const normalized = String(value ?? "").trim().toLowerCase();
    return !normalized || ["unknown", "unavailable", "none", "null"].includes(normalized);
  }

  _isEmptyOptionalMetricValue(value) {
    const normalized = String(value ?? "").trim();
    return !normalized || normalized === "--";
  }

  _formatTemperatureWithUnit(value, unit = "°C") {
    if (!Number.isFinite(Number(value))) {
      return "--";
    }
    return `${Number(value).toFixed(1)}${unit || "°C"}`;
  }

  _formatContactState(value) {
    const normalized = String(value || "").toLowerCase();
    if (["on", "open", "opened", "true"].includes(normalized)) {
      return this._t("stateOpen");
    }
    if (["off", "closed", "false"].includes(normalized)) {
      return this._t("stateClosed");
    }
    return normalized ? normalized.toUpperCase() : "--";
  }

  _formatCo2(value, unit = "ppm") {
    if (!Number.isFinite(Number(value))) {
      return "--";
    }
    return `${Number(value).toFixed(0)} ${unit || "ppm"}`;
  }

  _formatHeatingActiveSince(value) {
    if (Number.isFinite(Number(value))) {
      return `${Number(value).toFixed(0)} ${this._t("minutesShort")}`;
    }

    const timestamp = new Date(value).getTime();
    if (!Number.isFinite(timestamp)) {
      return "--";
    }

    const minutes = Math.max(Math.round((Date.now() - timestamp) / 60000), 0);
    return `${minutes} ${this._t("minutesShort")}`;
  }

  _formatBattery(value, unit = "%") {
    if (!Number.isFinite(Number(value))) {
      return "--";
    }
    return `${Number(value).toFixed(0)}${unit || "%"}`;
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
        this._drawChartMessage(`${this._t("noHistoryData")}\n${this._t("historyFixHint")}`);
        return;
      }

      this._setChartHeader(chartType, points.length);
      this._drawSeries(chartType, points);
    } catch (error) {
      if (requestToken !== this._chartRequestToken || this._activeChart !== chartType) {
        return;
      }

      this._setChartHeader(chartType, 0);
      this._drawChartMessage(`${this._t("historyUnavailable")}\n${this._t("historyFixHint")}`);
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

