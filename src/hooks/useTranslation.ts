import en from "../i18n/en-US.json";

type Translations = typeof en;

/** Resolve a dot-notation key like "calculator.results" from the translations object. */
function resolve(obj: any, key: string): string {
  return key.split(".").reduce((acc, k) => acc?.[k], obj) ?? key;
}

/** Replace {{var}} placeholders with values from params. */
function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => String(params[k] ?? `{{${k}}}`));
}

export function useTranslation() {
  const t = (key: string, params?: Record<string, string | number>): string =>
    interpolate(resolve(en, key), params);

  return { t };
}

// Type-safe key helper (optional, for IDE autocomplete)
export type TKey = string;
export { en };
export type { Translations };
