import { Locale, gLocaleObject } from '@/locale';
import { useMemo } from 'react';
import { useStore } from '../store';

const useProChatLocale = () => {
  const locale = useStore((s) => s.locale);

  const localeObject = useMemo(() => {
    return gLocaleObject(locale as Locale);
  }, [locale]);

  return {
    locale,
    localeObject,
  };
};

export default useProChatLocale;
