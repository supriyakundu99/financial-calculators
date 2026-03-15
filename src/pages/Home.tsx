import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useTranslation } from "../hooks/useTranslation";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        keywords={t("seo.home.keywords")}
      />
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {t("home.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {t("home.subtitle")}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 mb-8">
            {t("home.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link to="/sip" className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-colors shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{t("home.sip.title")}</h2>
              <p className="text-blue-100">{t("home.sip.description")}</p>
            </Link>
            <Link to="/swp" className="block bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-8 rounded-lg transition-colors shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{t("home.swp.title")}</h2>
              <p className="text-green-100">{t("home.swp.description")}</p>
            </Link>
            <Link to="/lumpsum" className="block bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-8 rounded-lg transition-colors shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{t("home.lumpsum.title")}</h2>
              <p className="text-purple-100">{t("home.lumpsum.description")}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
