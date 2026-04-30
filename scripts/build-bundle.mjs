import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const localeFiles = [
  "i18n/locales/en.js",
  "i18n/locales/ar.js",
  "i18n/locales/bn.js",
  "i18n/locales/cs.js",
  "i18n/locales/de.js",
  "i18n/locales/es.js",
  "i18n/locales/fa.js",
  "i18n/locales/fr.js",
  "i18n/locales/hi.js",
  "i18n/locales/id.js",
  "i18n/locales/it.js",
  "i18n/locales/ja.js",
  "i18n/locales/ko.js",
  "i18n/locales/mr.js",
  "i18n/locales/nl.js",
  "i18n/locales/pl.js",
  "i18n/locales/pt.js",
  "i18n/locales/ru.js",
  "i18n/locales/sw.js",
  "i18n/locales/ta.js",
  "i18n/locales/te.js",
  "i18n/locales/th.js",
  "i18n/locales/ur.js",
  "i18n/locales/vi.js",
  "i18n/locales/zh.js"
];

const sourceFiles = [
  ...localeFiles,
  "i18n/index.js",
  "cards/heating-control-card/config.js",
  "cards/heating-control-card/i18n.js",
  "cards/heating-control-card/services.js",
  "cards/heating-control-card/styles.js",
  "cards/heating-control-card/component.js",
  "cards/heating-control-card/editor.js",
  "cards/button-switch-card/config.js",
  "cards/button-switch-card/services.js",
  "cards/button-switch-card/component.js",
  "cards/button-switch-card/editor.js",
  "cards/markdown-title-card/config.js",
  "cards/markdown-title-card/component.js",
  "cards/markdown-title-card/editor.js",
  "cards/ha-slider-design-card/index.js"
];

const importLinePattern = /^import\s+[\s\S]*?from\s+["'][^"']+["'];\n?/gm;
const sideEffectImportLinePattern = /^import\s+["'][^"']+["'];\n?/gm;
const exportNamedBlockPattern = /^export\s+\{[\s\S]*?\};\n?/gm;
const exportDefaultPattern = /^export\s+default\s+[A-Za-z_$][\w$]*;\n?/gm;
const heatingEditorDynamicImportPattern =
  /  static async getConfigElement\(\) \{\n    if \(!customElements\.get\("heating-control-card-editor"\)\) \{\n      const \{ HeatingControlCardEditor \} = await import\("\.\/editor\.js"\);\n      customElements\.define\("heating-control-card-editor", HeatingControlCardEditor\);\n    \}\n\n    return document\.createElement\("heating-control-card-editor"\);\n  \}/;

function readSource(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function stripModuleSyntax(source, path) {
  let code = source
    .replace(importLinePattern, "")
    .replace(sideEffectImportLinePattern, "")
    .replace(exportNamedBlockPattern, "")
    .replace(exportDefaultPattern, "")
    .replace(/\bexport\s+(?=(?:class|const|function|let|var|async\s+function)\b)/g, "");

  if (path === "cards/heating-control-card/component.js") {
    if (!heatingEditorDynamicImportPattern.test(code)) {
      throw new Error("Could not inline heating-control-card editor loader.");
    }

    code = code.replace(
      heatingEditorDynamicImportPattern,
      `  static getConfigElement() {
    if (!customElements.get("heating-control-card-editor")) {
      customElements.define("heating-control-card-editor", HeatingControlCardEditor);
    }

    return document.createElement("heating-control-card-editor");
  }`
    );
  }

  return code.trim();
}

const sections = sourceFiles.map((path) => {
  const code = stripModuleSyntax(readSource(path), path);
  return `// ${path}\n${code}`;
});

const registration = `// registration
function registerCustomCard(cardDefinition) {
  window.customCards = window.customCards || [];

  const compatibleTypes = [
    cardDefinition.type,
    cardDefinition.type.startsWith("custom:") ? cardDefinition.type.slice(7) : \`custom:\${cardDefinition.type}\`
  ];

  if (window.customCards.some((card) => compatibleTypes.includes(card.type))) {
    return;
  }

  window.customCards.push(cardDefinition);
}

if (!customElements.get("heating-control-card")) {
  customElements.define("heating-control-card", HeatingControlCard);
}

if (!customElements.get("button-switch-card")) {
  customElements.define("button-switch-card", ButtonSwitchCard);
}

if (!customElements.get("button-switch-card-editor")) {
  customElements.define("button-switch-card-editor", ButtonSwitchCardEditor);
}

if (!customElements.get(cardName)) {
  customElements.define(cardName, HaMarkdownTitleDesignCard);
}

if (!customElements.get(\`\${cardName}-editor\`)) {
  customElements.define(\`\${cardName}-editor\`, HaMarkdownTitleDesignEditor);
}

registerCustomCard({
  type: "heating-control-card",
  name: "Heating Control Card",
  description: "A custom orange heating dashboard card with a thermostat slider and 24h history drawer.",
  preview: true
});

registerCustomCard({
  type: "button-switch-card",
  name: "Button Switch Card",
  description: "Switch on/off controller card with a visual editor and preview support.",
  preview: true,
  documentationURL: "https://github.com/404GamerNotFound/ha-button-design"
});

registerCustomCard({
  type: cardName,
  name: "HA Markdown Title Design",
  preview: true,
  description: "Stylish title/subtitle card that can replace markdown cards in Home Assistant dashboards.",
  documentationURL: "https://github.com/404GamerNotFound/ha-markdown-title-design"
});

registerCustomCard({
  type: "ha-slider-design",
  name: "HA Slider Design",
  preview: true,
  description: "Compact slider-style Home Assistant card for dimmable lights with color and power chips.",
  documentationURL: "https://github.com/404GamerNotFound/ha-slider-design"
});

const HA_HEAT_DESIGN_DEBUG_FLAG = "__HA_GREAT_DESIGN_LOADED__";

if (!window[HA_HEAT_DESIGN_DEBUG_FLAG]) {
  window[HA_HEAT_DESIGN_DEBUG_FLAG] = true;

  const registeredCards = [
    "heating-control-card",
    "button-switch-card",
    "ha-markdown-title-design",
    "ha-slider-design"
  ];

  const registrationState = registeredCards.reduce((state, cardTag) => {
    state[cardTag] = Boolean(customElements.get(cardTag));
    return state;
  }, {});

  console.info(
    "%cHA Great Design bundle loaded",
    "color: #ff9800; font-weight: bold;",
    {
      version: "dev",
      cards: registeredCards,
      registrationState
    }
  );
}`;

const banner = `// HA Great Design bundled Lovelace cards.
// Generated by scripts/build-bundle.mjs. Do not edit this file directly.
// Source files live in cards/ and i18n/.
`;

writeFileSync(
  resolve(root, "ha-great-design.js"),
  `${banner}\n(() => {\n"use strict";\n\n${sections.join("\n\n")}\n\n${registration}\n})();\n`
);
