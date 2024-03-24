import { LocaleProps } from '@/types/locale';
import enUSLocal from './en-US';
import zhCNLocal from './zh-CN';

export type ProChatLocale = 'zh-CN' | 'en-US';

const locales = {
  'en-US': enUSLocal,
  'zh-CN': zhCNLocal,
};

export const gLocaleObject = (locale: ProChatLocale): LocaleProps => {
  return locales[locale as 'zh-CN'] || locales['zh-CN'];
};
