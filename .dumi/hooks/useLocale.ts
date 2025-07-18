import { useIntl } from 'dumi';

export interface LocaleMap<
  K extends PropertyKey = PropertyKey,
  V extends string | ((...params: any[]) => string) = string,
> {
  cn: Record<K, V>;
  en: Record<K, V>;
}

const useLocale = <
  K extends PropertyKey = PropertyKey,
  V extends string | ((...params: any[]) => string) = string,
>(
  localeMap?: LocaleMap<K, V>,
): [Record<K, V>, 'cn' | 'en'] => {
  const { locale } = useIntl();
  const localeType = locale === 'zh-CN' ? 'cn' : 'en';
  return [localeMap?.[localeType]!, localeType] as const;
};

export default useLocale;
