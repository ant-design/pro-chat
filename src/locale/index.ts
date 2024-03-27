import { LocaleProps } from '@/types/locale';
import enUSLocal from './en-US';
import zhCNLocal from './zh-CN';
export type Locale = 'zh-CN' | 'en-US';

const locales = {
  'en-US': enUSLocal,
  'zh-CN': zhCNLocal,
  en: enUSLocal,
};

export const gLocaleObject = (glocale: Locale): LocaleProps => {
  return locales[glocale as 'zh-CN'] || locales['zh-CN'];
};
