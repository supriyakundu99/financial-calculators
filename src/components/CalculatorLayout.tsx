import type { ReactNode } from "react";
import { useTranslation } from "../hooks/useTranslation";

interface CalculatorLayoutProps {
  title: string;
  inputsTitle?: string;
  resultsTitle?: string;
  inputs: ReactNode;
  results: ReactNode;
  children?: ReactNode;
  gradient?: string;
}

export default function CalculatorLayout({
  title,
  inputsTitle,
  resultsTitle,
  inputs,
  results,
  children,
  gradient = "from-indigo-500 to-violet-600",
}: CalculatorLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Page title */}
      <div className="text-center mb-10 animate-fade-up">
        <h2
          className={`inline-block text-3xl sm:text-4xl font-extrabold tracking-tight
            bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-gradient`}
        >
          {title}
        </h2>
        <div className={`mt-3 mx-auto h-1 w-20 rounded-full bg-gradient-to-r ${gradient} opacity-80`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs card */}
        <div className="animate-fade-up-1 relative rounded-2xl
          bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-white/25
          shadow-xl shadow-black/30 hover:shadow-2xl
          transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="rounded-2xl p-6 h-full">
            <h3 className="text-lg font-semibold text-white/90 mb-6 flex items-center gap-2">
              <span className={`inline-block w-2 h-6 rounded-full bg-gradient-to-b ${gradient}`} />
              {inputsTitle ?? t("calculator.investmentDetails")}
            </h3>
            <div className="space-y-6">{inputs}</div>
          </div>
        </div>

        {/* Results card */}
        <div className="animate-fade-up-2 relative rounded-2xl
          bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-white/25
          shadow-xl shadow-black/30 hover:shadow-2xl
          transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="rounded-2xl p-6 h-full">
            <h3 className="text-lg font-semibold text-white/90 mb-6 flex items-center gap-2">
              <span className={`inline-block w-2 h-6 rounded-full bg-gradient-to-b ${gradient}`} />
              {resultsTitle ?? t("calculator.results")}
            </h3>
            {results}
          </div>
        </div>
      </div>

      {children && (
        <div className="animate-fade-up-3 mt-8">{children}</div>
      )}
    </div>
  );
}
