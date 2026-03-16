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
    <div
      dir={dir}
      className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-[#0d1526] to-[#0a1a1f]"
    >
      {/* Organic wavy morphing blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blob 1 — blue, top-left */}
        <div
          className="animate-morph-slow animate-wave-drift absolute -top-32 -left-32 w-[520px] h-[480px]
            bg-gradient-to-br from-blue-700/25 via-blue-600/15 to-sky-700/10
            blur-[90px] opacity-75"
        />
        {/* Blob 2 — teal/cyan, bottom-right */}
        <div
          className="animate-morph animate-wave-drift absolute -bottom-20 -right-20 w-[480px] h-[440px]
            bg-gradient-to-tl from-teal-600/20 via-cyan-700/15 to-sky-800/10
            blur-[80px] opacity-65"
          style={{ animationDelay: "-4s, -2s" }}
        />
        {/* Blob 3 — warm amber accent, top-right */}
        <div
          className="animate-morph absolute top-8 right-8 w-[220px] h-[240px]
            bg-gradient-to-br from-amber-600/12 via-orange-700/8 to-yellow-800/6
            blur-[60px] opacity-60"
          style={{ animationDelay: "-2s" }}
        />
        {/* Blob 4 — slate-blue, centre */}
        <div
          className="animate-morph-slow absolute top-1/2 left-1/3 w-[340px] h-[300px]
            bg-gradient-to-bl from-sky-800/15 via-slate-700/10 to-blue-900/8
            blur-[70px] opacity-55"
          style={{ animationDelay: "-6s" }}
        />
        {/* Mixed radial centre glow — blue + teal */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[700px] h-[350px] opacity-20 blur-[110px]"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 25% 50%, rgba(37,99,235,0.30) 0%, transparent 65%), " +
              "radial-gradient(ellipse 45% 55% at 75% 50%, rgba(13,148,136,0.20) 0%, transparent 65%), " +
              "radial-gradient(ellipse 35% 40% at 50% 20%, rgba(251,191,36,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
