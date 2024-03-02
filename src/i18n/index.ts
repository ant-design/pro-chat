import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 加载语言资源文件
import translationEN from './locales/en-US.json';
import translationZH from './locales/zh-CN.json';

const resources = {
  en: {
    translation: translationEN,
  },
  'zh-CN': {
    translation: translationZH,
  },
  // 更多语言...
};

i18n
  .use(initReactI18next) // 将i18n实例适配给react-i18next
  .init({
    resources,
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 备选语言
    keySeparator: false, // 如果资源文件中不使用层级key则可关闭
    interpolation: {
      escapeValue: false, // 不转义HTML实体
    },
  });

export default i18n;
