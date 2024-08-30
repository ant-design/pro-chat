import { LocaleProps } from '@/types/locale';
import enUSLocal from './en-US';
import zhCNLocal from './zh-CN';
import zhHKLocal from './zh-HK';
import csCZLocal from './cs-CZ';
import deLocal from './de-DE';
import huLocal from './hu-HU';
import plLocal from './pl-PL';
import skLocal from './sk-SK';
export type Locale = 'zh-CN' | 'en-US' | 'zh-HK' | 'cs-CZ' | 'de-DE' | 'hu-HU' | 'pl-PL' | 'sk-SK';

const locales = {
  'en-US': enUSLocal,
  'zh-CN': zhCNLocal,
  'zh-HK': zhHKLocal,
  'cs-CZ': csCZLocal,
  'de-DE': deLocal,
  'hu-HU': huLocal,
  'pl-PL': plLocal,
  'sk-SK': skLocal,
  en: enUSLocal,
};

export const gLocaleObject = (gLocale: Locale): LocaleProps => {
  return locales[gLocale as 'zh-CN'] || locales['zh-CN'];
};
