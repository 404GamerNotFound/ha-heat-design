import ar from "./locales/ar.js";
import bn from "./locales/bn.js";
import cs from "./locales/cs.js";
import de from "./locales/de.js";
import en from "./locales/en.js";
import es from "./locales/es.js";
import fa from "./locales/fa.js";
import fr from "./locales/fr.js";
import hi from "./locales/hi.js";
import id from "./locales/id.js";
import it from "./locales/it.js";
import ja from "./locales/ja.js";
import ko from "./locales/ko.js";
import mr from "./locales/mr.js";
import nl from "./locales/nl.js";
import pl from "./locales/pl.js";
import pt from "./locales/pt.js";
import ru from "./locales/ru.js";
import sw from "./locales/sw.js";
import ta from "./locales/ta.js";
import te from "./locales/te.js";
import th from "./locales/th.js";
import ur from "./locales/ur.js";
import vi from "./locales/vi.js";
import zh from "./locales/zh.js";

export const localeDictionaries = {
  en,
  zh,
  hi,
  es,
  fr,
  ar,
  bn,
  pt,
  ru,
  ur,
  id,
  de,
  ja,
  sw,
  mr,
  te,
  ta,
  vi,
  ko,
  fa,
  th,
  it,
  pl,
  cs,
  nl
};

export function getSectionTranslations(sectionKey) {
  const sectionTranslations = {};

  Object.entries(localeDictionaries).forEach(([locale, dictionary]) => {
    sectionTranslations[locale] = dictionary[sectionKey] || {};
  });

  return sectionTranslations;
}
