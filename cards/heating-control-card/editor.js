import { HeatingControlCard } from "./component.js";
import { getTranslationOverrides, mergeTranslationMaps } from "./i18n.js";

export class HeatingControlCardEditor extends HTMLElement {
  static get EDITOR_TRANSLATIONS() {
    const baseTranslations = {
      en: {
        climateEntity: "Climate entity",
        humidityEntity: "Humidity entity",
        outdoorTemperatureEntity: "Outdoor temperature entity",
        windowContactEntity: "Window contact entity",
        co2Entity: "CO₂ entity",
        heatingActiveEntity: "Heating active entity",
        batteryEntity: "Battery entity",
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
        outdoorTemperatureEntity: "Außentemperatur-Entität",
        windowContactEntity: "Fensterkontakt-Entität",
        co2Entity: "CO₂-Entität",
        heatingActiveEntity: "Heizung-aktiv-Entität",
        batteryEntity: "Batterie-Entität",
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
      },
      pt: {
        climateEntity: "Entidade climate",
        humidityEntity: "Entidade de humidade",
        outdoorTemperatureEntity: "Entidade da temperatura exterior",
        windowContactEntity: "Entidade de contacto de janela",
        co2Entity: "Entidade CO₂",
        heatingActiveEntity: "Entidade de aquecimento ativo",
        batteryEntity: "Entidade da bateria",
        cardName: "Nome do cartão",
        minimumTemperature: "Temperatura mínima",
        maximumTemperature: "Temperatura máxima",
        temperatureStep: "Passo da temperatura",
        backgroundStart: "Início do fundo",
        backgroundEnd: "Fim do fundo",
        sliderOrientation: "Orientação do slider",
        mobileOrientation: "Orientação móvel",
        desktopOrientation: "Orientação desktop",
        desktopLayout: "Layout desktop",
        heatingOnMode: "Modo ao ligar aquecimento",
        historyRange: "Intervalo do histórico",
        previewMode: "Modo de pré-visualização",
        useDefault: "Usar predefinição"
      }
    };

    return mergeTranslationMaps(baseTranslations, getTranslationOverrides("heatingControlCardEditor"));
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

