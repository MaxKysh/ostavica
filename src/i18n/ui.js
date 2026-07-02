import ru from './ru.json';
import en from './en.json';
import sr from './sr.json';

/** Shipped locales, in switcher/display order (SR · RU · EN). Serbian is default. */
export const languages = /** @type {const} */ (['sr', 'ru', 'en']);
export const defaultLang = 'sr';

/** Human labels for the language switcher. */
export const langLabels = { sr: 'SR', ru: 'RU', en: 'EN' };

const dictionaries = { ru, en, sr };

/**
 * Returns a translator bound to `lang`.
 * `t('hero.h1')` resolves a dot-path; arrays/objects are returned as-is
 * (e.g. `t('trust')`, `t('sizes.cards')`) so components can iterate them.
 */
export function useTranslations(lang) {
  const dict = dictionaries[lang] ?? dictionaries[defaultLang];
  return function t(key) {
    return key
      .split('.')
      .reduce((value, segment) => (value == null ? undefined : value[segment]), dict);
  };
}

/** URL segment per locale — Serbian (code "sr") lives at /rs/. */
const pathByLang = { ru: 'ru', en: 'en', sr: 'rs' };

/** The home path for a locale, e.g. "/ru/", "/en/", "/rs/". */
export function localizedPath(lang) {
  return `/${pathByLang[lang] ?? lang}/`;
}
