import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../hooks/useTranslation";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const icons: Record<string, string> = {
    system: "💻",
    light: "☀️",
    dark: "🌙",
  };

  return (
    <div className="relative">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as "light" | "dark" | "system")}
        className="appearance-none pl-8 pr-7 py-1.5 text-sm rounded-lg
          bg-white/10 hover:bg-white/15 text-white border border-white/20
          hover:border-violet-400/60 focus:border-violet-400 focus:outline-none
          transition-all duration-200 cursor-pointer"
      >
        <option value="system" className="bg-gray-900 text-white">{t("theme.system")}</option>
        <option value="light"  className="bg-gray-900 text-white">{t("theme.light")}</option>
        <option value="dark"   className="bg-gray-900 text-white">{t("theme.dark")}</option>
      </select>
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm leading-none">
        {icons[theme]}
      </span>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
    </div>
  );
}
