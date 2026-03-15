import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useTranslation } from "../hooks/useTranslation";

const cards = [
  {
    key: "sip",
    to: "/sip",
    icon: "📈",
    gradient: "from-blue-500 to-indigo-600",
    glow: "group-hover:shadow-blue-500/30 dark:group-hover:shadow-blue-400/20",
    border: "hover:border-blue-400/50 dark:hover:border-blue-500/50",
    delay: "animate-fade-up-2",
  },
  {
    key: "swp",
    to: "/swp",
    icon: "💸",
    gradient: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-emerald-500/30 dark:group-hover:shadow-emerald-400/20",
    border: "hover:border-emerald-400/50 dark:hover:border-emerald-500/50",
    delay: "animate-fade-up-3",
  },
  {
    key: "lumpsum",
    to: "/lumpsum",
    icon: "🏦",
    gradient: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-violet-500/30 dark:group-hover:shadow-violet-400/20",
    border: "hover:border-violet-400/50 dark:hover:border-violet-500/50",
    delay: "animate-fade-up-4",
  },
] as const;

const stats = [
  {
    labelKey: "home.stats.calculators",
    descKey: "home.stats.calculatorsDesc",
    icon: "🧮",
  },
  {
    labelKey: "home.stats.charts",
    descKey: "home.stats.chartsDesc",
    icon: "📊",
  },
  {
    labelKey: "home.stats.inflation",
    descKey: "home.stats.inflationDesc",
    icon: "📉",
  },
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

      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="animate-float absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl" />
        <div className="animate-float-slow absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-violet-400/20 dark:bg-violet-600/10 blur-3xl" />
        <div className="animate-float absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-emerald-400/15 dark:bg-emerald-600/10 blur-3xl" />
      </div>

      <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center px-4 py-12">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-sm font-medium
            bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300
            border border-indigo-200 dark:border-indigo-800"
          >
            <span className="animate-pulse-ring inline-block w-2 h-2 rounded-full bg-indigo-500" />
            Free · No signup required
          </div>

          <h1
            className="animate-fade-up-1 text-5xl sm:text-6xl font-extrabold tracking-tight mb-6
            bg-gradient-to-br from-gray-900 via-indigo-800 to-gray-900
            dark:from-white dark:via-indigo-200 dark:to-gray-300
            bg-clip-text text-transparent animate-gradient"
          >
            {t("home.title")}
          </h1>

          <p className="animate-fade-up-2 text-xl text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
            {t("home.subtitle")}
          </p>
          <p className="animate-fade-up-2 text-base text-gray-500 dark:text-gray-500 mb-10">
            {t("home.description")}
          </p>

          <div className="animate-fade-up-3 flex flex-wrap justify-center gap-4">
            <Link
              to="/sip"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700
                shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {t("home.cta")} →
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="animate-fade-up-3 w-full max-w-2xl mx-auto mb-16">
          <div className="grid grid-cols-3 gap-3">
            {stats.map(({ labelKey, descKey, icon }) => (
              <div
                key={labelKey}
                className="flex flex-col items-center gap-1 p-4 rounded-2xl text-center
                  bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm
                  border border-gray-200/80 dark:border-gray-700/60
                  shadow-sm"
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {t(labelKey)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t(descKey)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator cards */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ key, to, icon, gradient, glow, border, delay }) => (
            <Link
              key={key}
              to={to}
              className={`group relative flex flex-col p-6 rounded-2xl overflow-hidden
                bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm
                border border-gray-200/80 dark:border-gray-700/60 ${border}
                shadow-md hover:shadow-xl ${glow}
                transition-all duration-300 hover:-translate-y-1
                ${delay}`}
            >
              {/* Gradient top bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
              />

              {/* Icon */}
              <div
                className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center text-2xl
                bg-gradient-to-br ${gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {icon}
              </div>

              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                {t(`home.${key}.title`)}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-1">
                {t(`home.${key}.description`)}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {t(`home.${key}.detail`)}
              </p>

              <div
                className={`mt-4 inline-flex items-center gap-1 text-sm font-medium
                bg-gradient-to-r ${gradient} bg-clip-text text-transparent
                group-hover:gap-2 transition-all duration-200`}
              >
                Open calculator <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
