import Header from "./Header";
import Footer from "./Footer";
import { useLocale, RTL_LOCALES } from "../contexts/LocaleContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { locale } = useLocale();
  const dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";

  return (
    <div dir={dir} className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
