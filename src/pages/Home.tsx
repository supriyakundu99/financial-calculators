import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useTranslation } from "../hooks/useTranslation";

const cards = [
  {
    key: "sip",
    to: "/sip",
    icon: "📈",
    gradient: "from-blue-500 via-indigo-500 to-indigo-600",
    glowColor: "blue",
    delay: "animate-fade-up-2",
  },
  {
    key: "swp",
    to: "/swp",
    icon: "💸",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    glowColor: "emerald",
    delay: "animate-fade-up-3",
  },
  {
    key: "lumpsum",
    to: "/lumpsum",
    icon: "🏦",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    glowColor: "violet",
    delay: "animate-fade-up-4",
  },
] as const;

const stats = [
  { labelKey: "home.stats.calculators",   descKey: "home.stats.calculatorsDesc",   icon: "🧮", color: "from-blue-500 to-indigo-600" },
  { labelKey: "home.stats.charts",         descKey: "home.stats.chartsDesc",         icon: "📊", color: "from-violet-500 to-purple-600" },
  { labelKey: "home.stats.inflation",      descKey: "home.stats.inflationDesc",      icon: "📉", color: "from-emerald-500 to-teal-600" },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        keywords={t("seo.home.keywords")}
      />

      <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center px-4 py-16">

        {/* ── Hero ─────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full text-sm font-medium
            bg-indigo-500/10 border border-indigo-500/30 text-indigo-300
            shadow-lg shadow-indigo-500/10 backdrop-blur-sm"
          >
            <span className="animate-pulse-ring inline-block w-2 h-2 rounded-full bg-indigo-400" />
            Free · No signup required
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-up-1 text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-none
              bg-gradient-to-br from-white via-indigo-200 to-violet-400
              bg-clip-text text-transparent animate-gradient"
          >
            {t("home.title")}
          </h1>

          {/* Decorative line */}
          <div className="animate-fade-up-1 mx-auto mb-6 flex items-center justify-center gap-2">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-indigo-500/60" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500" />
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-violet-500/60" />
          </div>

          <p className="animate-fade-up-2 text-xl text-gray-300 mb-3 leading-relaxed">
            {t("home.subtitle")}
          </p>
          <p className="animate-fade-up-2 text-base text-gray-500 mb-10 max-w-xl mx-auto">
            {t("home.description")}
          </p>

          {/* CTA */}
          <div className="animate-fade-up-3 flex flex-wrap justify-center gap-4">
            <Link
              to="/sip"
              className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white text-base
                bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 animate-gradient
                shadow-xl shadow-indigo-500/40
                hover:shadow-indigo-500/60 hover:-translate-y-0.5
                active:translate-y-0 active:shadow-indigo-500/30
                transition-all duration-200 overflow-hidden group"
            >
              {t("home.cta")} →
            </Link>
          </div>
        </div>

        {/* ── Stats strip ──────────────────────────── */}
        <div className="animate-fade-up-3 w-full max-w-2xl mx-auto mb-16">
          <div className="grid grid-cols-3 gap-3">
            {stats.map(({ labelKey, descKey, icon, color }) => (
              <div
                key={labelKey}
                className="group relative flex flex-col items-center gap-1 p-4 rounded-2xl text-center
                  bg-white/5 hover:bg-white/8 backdrop-blur-sm
                  border border-white/10 hover:border-white/20
                  shadow-lg hover:shadow-xl shadow-black/20
                  transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-1
                  bg-gradient-to-br ${color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {icon}
                </span>
                <span className="text-sm font-semibold text-white/90">{t(labelKey)}</span>
                <span className="text-xs text-gray-500">{t(descKey)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Calculator cards ──────────────────────── */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ key, to, icon, gradient, delay }) => (
            <Link
              key={key}
              to={to}
              className={`group relative flex flex-col p-6 rounded-2xl overflow-hidden
                bg-white/5 hover:bg-white/8 backdrop-blur-sm
                border border-white/10 hover:border-white/25
                shadow-lg hover:shadow-2xl shadow-black/25
                transition-all duration-400 hover:-translate-y-1.5
                ${delay}`}
            >
              {/* Gradient accent top bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient}`} />

              {/* Glow spot behind icon */}
              <div className={`absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br ${gradient} opacity-0
                group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

              {/* Icon */}
              <div
                className={`relative w-12 h-12 mb-5 rounded-xl flex items-center justify-center text-2xl
                  bg-gradient-to-br ${gradient} shadow-lg
                  group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
              >
                {icon}
              </div>

              <h2 className="text-base font-bold text-white/90 mb-1.5">
                {t(`home.${key}.title`)}
              </h2>
              <p className="text-sm text-gray-400 mb-3 flex-1 leading-relaxed">
                {t(`home.${key}.description`)}
              </p>
              <p className="text-xs text-gray-600">{t(`home.${key}.detail`)}</p>

              {/* Arrow link */}
              <div
                className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold
                  bg-gradient-to-r ${gradient} bg-clip-text text-transparent
                  group-hover:gap-3 transition-all duration-300`}
              >
                Open calculator <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>


            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
