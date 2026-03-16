import { useTranslation } from "../hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative mt-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-violet-600/5 to-cyan-600/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col items-center gap-2">
          {/* Animated gradient divider dot */}
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500/60" />
          </div>
          <p className="text-center text-sm text-gray-400">
            {t("app.footer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
