import ru from './ru.json';
import en from './en.json';
import sr from './sr.json';

/** All shipped locales. `ru` is the default and is served at "/". */
export const languages = /** @type {const} */ (['ru', 'en', 'sr']);
export const defaultLang = 'ru';

/** Human labels for the language switcher. */
export const langLabels = { ru: 'RU', sr: 'SR', en: 'EN' };

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

/** The home path for a locale: "/" for the default, "/{lang}/" otherwise. */
export function localizedPath(lang) {
  return lang === defaultLang ? '/' : `/${lang}/`;
}
