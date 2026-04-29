import { localeDictionaries } from "../i18n/index.js";

function getLeafKeys(input, prefix = "") {
  return Object.entries(input || {}).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    const isObject = value && typeof value === "object";

    if (!isObject) {
      return [path];
    }

    return getLeafKeys(value, path);
  });
}

const baseLocale = "en";
const baseDictionary = localeDictionaries[baseLocale];

if (!baseDictionary) {
  console.error(`Missing base locale dictionary: ${baseLocale}`);
  process.exit(1);
}

const baselineKeys = new Set(getLeafKeys(baseDictionary));
const errors = [];

Object.entries(localeDictionaries).forEach(([locale, dictionary]) => {
  if (locale === baseLocale) {
    return;
  }

  const localeKeys = new Set(getLeafKeys(dictionary));

  baselineKeys.forEach((requiredKey) => {
    if (!localeKeys.has(requiredKey)) {
      errors.push(`${locale}: missing key '${requiredKey}'`);
    }
  });
});

if (errors.length > 0) {
  console.error("Translation lint failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Translation lint passed for ${Object.keys(localeDictionaries).length} locales.`);
