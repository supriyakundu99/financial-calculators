import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "../hooks/useTranslation";
import { useLocale, LOCALES, type Locale } from "../contexts/LocaleContext";

export default function Header() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100"
          >
            <img
              src="/logo.svg"
              alt={t("app.logoAlt")}
              className="h-8 w-8 shrink-0 dark:brightness-110"
            />
            <span className="hidden sm:block">{t("app.name")}</span>
            <span className="sm:hidden block">{t("app.nameShort")}</span>
          </Link>

          <nav className="flex items-center space-x-2 sm:space-x-6">
            <Link to="/sip" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              {t("nav.sip")}
            </Link>
            <Link to="/swp" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              {t("nav.swp")}
            </Link>
            <Link to="/lumpsum" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              {t("nav.lumpsum")}
            </Link>

            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {(Object.entries(LOCALES) as [Locale, string][]).map(([code, label]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
