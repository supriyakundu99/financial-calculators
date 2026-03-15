import type { ReactNode } from "react";

interface CalculatorLayoutProps {
  title: string;
  inputsTitle?: string;
  resultsTitle?: string;
  inputs: ReactNode;
  results: ReactNode;
  children?: ReactNode;
}

const cardClass = "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6";

export default function CalculatorLayout({
  title,
  inputsTitle = "Investment Details",
  resultsTitle = "Results",
  inputs,
  results,
  children,
}: CalculatorLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
        {title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={cardClass}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {inputsTitle}
          </h3>
          <div className="space-y-6">{inputs}</div>
        </div>

        <div className={cardClass}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {resultsTitle}
          </h3>
          {results}
        </div>
      </div>

      {children}
    </div>
  );
}
