import { LocaleProps } from '@/types/locale';
import enUSLocal from './en-US';
import zhCNLocal from './zh-CN';
export type Locale = 'zh-CN' | 'en-US';

const locales = {
  'en-US': enUSLocal,
  'zh-CN': zhCNLocal,
};

export const gLocaleObject = (locale: Locale): LocaleProps => {
  return locales[locale as 'zh-CN'] || locales['zh-CN'];
};
