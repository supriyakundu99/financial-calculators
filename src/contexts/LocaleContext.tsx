import { createContext, useContext, useState } from "react";

export const LOCALES = {
  "en-US": "English",
  "bn-IN": "বাংলা",
  "gu-IN": "ગુજરાતી",
  "hi-IN": "हिन्दी",
  "mr-IN": "मराठी",
  "pa-IN": "ਪੰਜਾਬੀ",
  "ta-IN": "தமிழ்",
  "te-IN": "తెలుగు",
} as const;

export type Locale = keyof typeof LOCALES;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(
    () => (localStorage.getItem("locale") as Locale) || "en-US",
  );

  const handleSetLocale = (l: Locale) => {
    localStorage.setItem("locale", l);
    setLocale(l);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
