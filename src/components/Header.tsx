import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "../hooks/useTranslation";
import { useLocale, LOCALES, type Locale } from "../contexts/LocaleContext";

export default function Header() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  return (
    <header className="relative z-50">
      {/* Dark charcoal backdrop */}
      <div className="absolute inset-0 bg-slate-950/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-slate-900/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/logo.svg"
                  alt={t("app.logoAlt")}
                  className="h-5 w-5 shrink-0 brightness-200"
                />
              </div>
            </div>
            <span className="hidden sm:block text-lg font-bold bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent tracking-tight">
              {t("app.name")}
            </span>
            <span className="sm:hidden block text-lg font-bold text-white">
              {t("app.nameShort")}
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {[
              { to: "/sip",     key: "nav.sip" },
              { to: "/swp",     key: "nav.swp" },
              { to: "/lumpsum", key: "nav.lumpsum" },
            ].map(({ to, key }) => (
              <Link
                key={to}
                to={to}
                className="relative px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 rounded-lg group"
              >
                <span className="relative z-10">{t(key)}</span>
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-all duration-200" />
              </Link>
            ))}

            {/* Locale selector */}
            <div className="relative ml-1">
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                className="appearance-none pl-3 pr-7 py-1.5 text-sm rounded-lg
                  bg-white/10 hover:bg-white/15 text-white border border-white/20
                  hover:border-indigo-400/60 focus:border-indigo-400 focus:outline-none
                  transition-all duration-200 cursor-pointer"
              >
                {(Object.entries(LOCALES) as [Locale, string][]).map(([code, label]) => (
                  <option key={code} value={code} className="bg-gray-900 text-white">
                    {label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
            </div>

            <div className="ml-1">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
