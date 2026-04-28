export function getTranslationOverrides(sectionKey) {
  if (typeof window === "undefined") {
    return null;
  }

  const overrides = window.haHeatDesignTranslations?.[sectionKey];
  if (!overrides || typeof overrides !== "object") {
    return null;
  }

  return overrides;
}

export function mergeTranslationMaps(baseTranslations, overrideTranslations) {
  if (!overrideTranslations) {
    return baseTranslations;
  }

  const mergedTranslations = { ...baseTranslations };

  Object.entries(overrideTranslations).forEach(([languageCode, overrideValues]) => {
    if (!overrideValues || typeof overrideValues !== "object") {
      return;
    }

    mergedTranslations[languageCode] = {
      ...(baseTranslations[languageCode] || {}),
      ...overrideValues
    };
  });

  return mergedTranslations;
}
