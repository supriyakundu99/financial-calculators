import enUS from "../i18n/en-US.json";
import hiIN from "../i18n/hi-IN.json";
import bnBD from "../i18n/bn-BD.json";
import { useLocale } from "../contexts/LocaleContext";

const translations: Record<string, typeof enUS> = {
  "en-US": enUS,
  "hi-IN": hiIN as typeof enUS,
  "bn-BD": bnBD as typeof enUS,
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
