import { cardName, configsEqual, normalizeConfig } from "./config.js";

export class HaMarkdownTitleDesignCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("ha-markdown-title-design-editor");
  }

  static getStubConfig() {
    return {
      type: `custom:${cardName}`,
      title: "Living Room",
      subtitle: "Lights and media",
      text: "Optional description text",
    };
  }

  constructor() {
    super();
    this._hass = null;
    this.config = null;
    this._rootReady = false;
    this._refs = {};
    this._updateScheduled = false;
  }

  setConfig(config) {
    if (!config || typeof config !== "object") {
      throw new Error("Invalid configuration.");
    }

    const normalized = normalizeConfig(config);
    if (this.config && configsEqual(this.config, normalized)) return;

    this.config = normalized;
    this._ensureRoot();
    this._scheduleUpdate();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.config) return;
    this._ensureRoot();
    this._scheduleUpdate();
  }

  getCardSize() {
    const hasText = Boolean(String(this.config?.text || "").trim());
    return hasText ? 2 : 1;
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
        }

        ha-card {
          overflow: hidden;
          border-radius: var(--card-radius, 28px);
          background: transparent;
        }

        .card {
          box-sizing: border-box;
          min-height: var(--card-min-height, 130px);
          border-radius: var(--card-radius, 28px);
          padding:
            var(--card-padding-top, 28px)
            var(--card-padding-right, 24px)
            var(--card-padding-bottom, 24px)
            var(--card-padding-left, 24px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: var(--content-align, center);
          text-align: var(--text-align, center);
          background: linear-gradient(
            var(--gradient-direction, 180deg),
            var(--bg-start),
            var(--bg-end)
          );
          box-shadow: var(--card-shadow, 0 9px 24px rgba(0, 0, 0, 0.2));
          transition: box-shadow 120ms ease, transform 120ms ease;
        }

        .content {
          width: 100%;
          max-width: var(--content-max-width, 100%);
        }

        .title,
        .subtitle,
        .divider,
        .text {
          box-sizing: border-box;
        }

        .title {
          color: var(--title-color, #fff);
          font-size: var(--title-size, 42px);
          font-weight: var(--title-weight, 800);
          line-height: var(--title-line-height, 1.12);
          letter-spacing: calc(var(--title-letter-spacing, 0.01) * 1em);
          margin: 0;
          word-break: break-word;
        }

        .subtitle {
          margin-top: var(--subtitle-spacing, 10px);
          color: var(--subtitle-color, rgba(255,255,255,0.88));
          font-size: var(--subtitle-size, 22px);
          font-weight: var(--subtitle-weight, 600);
          line-height: var(--subtitle-line-height, 1.2);
          letter-spacing: calc(var(--subtitle-letter-spacing, 0) * 1em);
          word-break: break-word;
        }

        .divider {
          margin-top: var(--divider-spacing, 14px);
          width: var(--divider-width, 96px);
          height: var(--divider-height, 2px);
          border-radius: 999px;
          background: var(--divider-color, rgba(255,255,255,0.34));
        }

        .text {
          margin-top: var(--text-spacing, 14px);
          color: var(--text-color, rgba(255,255,255,0.92));
          font-size: var(--text-size, 16px);
          font-weight: var(--text-weight, 500);
          line-height: var(--text-line-height, 1.35);
          letter-spacing: calc(var(--text-letter-spacing, 0) * 1em);
          width: 100%;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .hidden {
          display: none !important;
        }
      </style>

      <ha-card>
        <div class="card" id="card">
          <div class="content" id="content">
            <div class="title" id="title"></div>
            <div class="subtitle" id="subtitle"></div>
            <div class="divider" id="divider"></div>
            <div class="text" id="text"></div>
          </div>
        </div>
      </ha-card>
    `;

    this._refs = {
      card: this.shadowRoot.getElementById("card"),
      content: this.shadowRoot.getElementById("content"),
      title: this.shadowRoot.getElementById("title"),
      subtitle: this.shadowRoot.getElementById("subtitle"),
      divider: this.shadowRoot.getElementById("divider"),
      text: this.shadowRoot.getElementById("text"),
    };

    this._rootReady = true;
  }

  _scheduleUpdate() {
    if (this._updateScheduled) return;
    this._updateScheduled = true;

    requestAnimationFrame(() => {
      this._updateScheduled = false;
      this._updateCard();
    });
  }

  _updateCard() {
    if (!this._rootReady || !this.config) return;

    const cfg = this.config;
    const title = String(cfg.title || "").trim();
    const subtitle = String(cfg.subtitle || "").trim();
    const bodyText = String(cfg.text || "").trim();

    const cssAlign =
      cfg.align === "left" ? "flex-start" :
      cfg.align === "right" ? "flex-end" :
      "center";

    const shadow = cfg.enable_shadow
      ? `0 9px ${cfg.shadow_blur}px rgba(0, 0, 0, ${cfg.shadow_opacity})`
      : "none";

    this._refs.card.style.setProperty("--bg-start", cfg.background_start);
    this._refs.card.style.setProperty("--bg-end", cfg.background_end);
    this._refs.card.style.setProperty("--gradient-direction", `${cfg.gradient_direction}deg`);

    this._refs.card.style.setProperty("--title-color", cfg.title_color);
    this._refs.card.style.setProperty("--subtitle-color", cfg.subtitle_color);
    this._refs.card.style.setProperty("--text-color", cfg.text_color);

    this._refs.card.style.setProperty("--title-size", `${cfg.title_size}px`);
    this._refs.card.style.setProperty("--subtitle-size", `${cfg.subtitle_size}px`);
    this._refs.card.style.setProperty("--text-size", `${cfg.text_size}px`);

    this._refs.card.style.setProperty("--title-weight", `${cfg.title_weight}`);
    this._refs.card.style.setProperty("--subtitle-weight", `${cfg.subtitle_weight}`);
    this._refs.card.style.setProperty("--text-weight", `${cfg.text_weight}`);

    this._refs.card.style.setProperty("--title-line-height", `${cfg.title_line_height}`);
    this._refs.card.style.setProperty("--subtitle-line-height", `${cfg.subtitle_line_height}`);
    this._refs.card.style.setProperty("--text-line-height", `${cfg.text_line_height}`);

    this._refs.card.style.setProperty("--title-letter-spacing", `${cfg.title_letter_spacing}`);
    this._refs.card.style.setProperty("--subtitle-letter-spacing", `${cfg.subtitle_letter_spacing}`);
    this._refs.card.style.setProperty("--text-letter-spacing", `${cfg.text_letter_spacing}`);

    this._refs.card.style.setProperty("--card-padding-top", `${cfg.padding_top}px`);
    this._refs.card.style.setProperty("--card-padding-right", `${cfg.padding_right}px`);
    this._refs.card.style.setProperty("--card-padding-bottom", `${cfg.padding_bottom}px`);
    this._refs.card.style.setProperty("--card-padding-left", `${cfg.padding_left}px`);

    this._refs.card.style.setProperty("--card-radius", `${cfg.border_radius}px`);
    this._refs.card.style.setProperty("--card-min-height", `${cfg.min_height}px`);
    this._refs.card.style.setProperty("--content-max-width", `${cfg.max_content_width}%`);

    this._refs.card.style.setProperty("--subtitle-spacing", `${cfg.subtitle_spacing}px`);
    this._refs.card.style.setProperty("--divider-spacing", `${cfg.divider_spacing}px`);
    this._refs.card.style.setProperty("--text-spacing", `${cfg.text_spacing}px`);

    this._refs.card.style.setProperty("--divider-color", cfg.divider_color);
    this._refs.card.style.setProperty("--divider-width", `${cfg.divider_width}px`);
    this._refs.card.style.setProperty("--divider-height", `${cfg.divider_height}px`);

    this._refs.card.style.setProperty("--content-align", cssAlign);
    this._refs.card.style.setProperty("--text-align", cfg.align);
    this._refs.card.style.setProperty("--card-shadow", shadow);

    this._refs.title.textContent = cfg.uppercase_title ? title.toUpperCase() : title;
    this._refs.subtitle.textContent = subtitle;
    this._refs.text.textContent = bodyText;

    this._refs.title.classList.toggle("hidden", !title);
    this._refs.subtitle.classList.toggle("hidden", !subtitle);
    this._refs.text.classList.toggle("hidden", !bodyText);

    const hasVisibleTitleBlock = !!title || !!subtitle;
    this._refs.divider.classList.toggle("hidden", !(cfg.show_divider && hasVisibleTitleBlock));
  }
}

