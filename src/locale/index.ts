import { LocaleProps } from '@/types/locale';
import enUSLocal from './en-US';
import zhCNLocal from './zh-CN';
import zhHKLocal from './zh-HK';
export type Locale = 'zh-CN' | 'en-US' | 'zh-HK';

const locales = {
  'en-US': enUSLocal,
  'zh-CN': zhCNLocal,
  'zh-HK': zhHKLocal,
  en: enUSLocal,
};

export const gLocaleObject = (gLocale: Locale): LocaleProps => {
  return locales[gLocale as 'zh-CN'] || locales['zh-CN'];
};
