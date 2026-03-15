import { useState, useEffect } from "react";
import CurrencyInput from "../controls/CurrencyInput";
import SliderInput from "../controls/SliderInput";
import ResultCard from "../controls/ResultCard";
import PieChart from "../controls/PieChart";
import DataGrid from "../controls/DataGrid";
import InflationAdjustedValue from "../controls/InflationAdjustedValue";
import CalculatorLayout from "./CalculatorLayout";
import { numberToWords } from "../utils/numberUtils";
import { useTranslation } from "../hooks/useTranslation";
import type { InvestmentResult, YearlyRow } from "../types/calculator";

export default function LumpsumCalculator() {
  const { t } = useTranslation();
  const [totalInvestment, setTotalInvestment] = useState("100000");
  const [annualReturn, setAnnualReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [result, setResult] = useState<InvestmentResult | null>(null);
  const [yearlyData, setYearlyData] = useState<YearlyRow[]>([]);

  useEffect(() => {
    const P = parseFloat(totalInvestment);
    const r = parseFloat(annualReturn) / 100;
    const n = parseFloat(timePeriod);

    if (P > 0 && r > 0 && n > 0) {
      const maturityAmount = P * Math.pow(1 + r, n);
      setResult({
        maturityAmount: Math.round(maturityAmount),
        totalInvestment: Math.round(P),
        totalGains: Math.round(maturityAmount - P),
      });
      setYearlyData(
        Array.from({ length: n }, (_, i) => {
          const yearlyMaturity = P * Math.pow(1 + r, i + 1);
          return {
            year: i + 1,
            investment: Math.round(P),
            gains: Math.round(yearlyMaturity - P),
            total: Math.round(yearlyMaturity),
          };
        })
      );
    } else {
      setResult(null);
      setYearlyData([]);
    }
  }, [totalInvestment, annualReturn, timePeriod]);

  return (
    <CalculatorLayout
      title={t("nav.lumpsum")}
      inputs={
        <>
          <CurrencyInput value={totalInvestment} onChange={setTotalInvestment} label={t("fields.totalInvestment")} min="500" max="10000000" step="500" />
          <SliderInput label={t("fields.annualReturn")} value={annualReturn} onChange={setAnnualReturn} min="1" max="30" step="0.5" unit="%" />
          <SliderInput label={t("fields.timePeriod")} value={timePeriod} onChange={setTimePeriod} min="1" max="50" unit=" years" />
        </>
      }
      results={
        result ? (
          <>
            <div className="space-y-3 mb-6">
              <ResultCard label={t("results.totalInvestment")} value={result.totalInvestment} colorClass="blue" />
              <ResultCard label={t("results.totalGains")} value={result.totalGains} colorClass="green" />
              <ResultCard label={t("results.maturityAmount")} value={result.maturityAmount} colorClass="purple" large />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {numberToWords(result.maturityAmount)} {t("calculator.rupees")}
              </div>
            </div>
            <InflationAdjustedValue value={result.maturityAmount} years={parseFloat(timePeriod)} />
            <PieChart labels={[t("chart.investment"), t("chart.gains")]} values={[result.totalInvestment, result.totalGains]} colors={["#3b82f6", "#10b981"]} />
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            {t("calculator.emptyInvestment")}
          </div>
        )
      }
    >
      {yearlyData.length > 0 && (
        <DataGrid
          columns={[
            { key: "year", title: t("grid.year"), type: "number" },
            { key: "investment", title: t("grid.totalInvestment"), type: "currency" },
            { key: "gains", title: t("grid.totalGains"), type: "currency" },
            { key: "total", title: t("grid.maturityAmount"), type: "currency" },
          ]}
          data={yearlyData}
        />
      )}
    </CalculatorLayout>
  );
}
