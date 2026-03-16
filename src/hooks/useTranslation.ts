import enUS from "../i18n/en-US.json";
import hiIN from "../i18n/hi-IN.json";
import bnIN from "../i18n/bn-IN.json";
import taIN from "../i18n/ta-IN.json";
import teIN from "../i18n/te-IN.json";
import { useLocale } from "../contexts/LocaleContext";

const translations: Record<string, typeof enUS> = {
  "en-US": enUS,
  "hi-IN": hiIN as typeof enUS,
  "bn-IN": bnIN as typeof enUS,
  "ta-IN": taIN as typeof enUS,
  "te-IN": teIN as typeof enUS,
};

function resolve(obj: any, key: string): string {
  return key.split(".").reduce((acc, k) => acc?.[k], obj) ?? key;
}

function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => String(params[k] ?? `{{${k}}}`));
}

export function useTranslation() {
  const { locale } = useLocale();
  const dict = translations[locale] ?? enUS;
  const t = (key: string, params?: Record<string, string | number>): string =>
    interpolate(resolve(dict, key), params);
  return { t };
}
