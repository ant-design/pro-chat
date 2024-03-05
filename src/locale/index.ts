import enUSLocal from './en-US';
import zhCNLocal from './zh-CN';
export type Locale = 'zh-CN' | 'en-US';

const locales = {
  'en-US': enUSLocal,
  'zh-CN': zhCNLocal,
};

export const gLocaleObject = (glocale: Locale): Record<string, string> => {
  return locales[glocale as 'zh-CN'] || locales['zh-CN'];
};
