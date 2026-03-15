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
import type { WithdrawalResult, YearlyRow } from "../types/calculator";

export default function SWPCalculator() {
  const { t } = useTranslation();
  const [initialInvestment, setInitialInvestment] = useState("1000000");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("8000");
  const [annualReturn, setAnnualReturn] = useState("10");
  const [timePeriod, setTimePeriod] = useState("15");
  const [result, setResult] = useState<WithdrawalResult | null>(null);
  const [yearlyData, setYearlyData] = useState<YearlyRow[]>([]);

  useEffect(() => {
    const P = parseFloat(initialInvestment);
    const W = parseFloat(monthlyWithdrawal);
    const r = parseFloat(annualReturn) / 100 / 12;
    const years = parseInt(timePeriod);

    if (P > 0 && W > 0 && r > 0 && years > 0) {
      let balance = P;
      let totalWithdrawn = 0;
      const yearly: YearlyRow[] = [];

      for (let year = 1; year <= years; year++) {
        const startBalance = balance;
        let yearWithdrawn = 0;
        for (let month = 0; month < 12; month++) {
          if (balance <= 0) break;
          balance = balance * (1 + r) - W;
          totalWithdrawn += W;
          yearWithdrawn += W;
        }
        yearly.push({
          year,
          startBalance: Math.round(startBalance),
          withdrawn: Math.round(yearWithdrawn),
          endBalance: Math.round(Math.max(0, balance)),
        });
        if (balance <= 0) break;
      }

      const remaining = Math.max(0, balance);
      setResult({ totalWithdrawn: Math.round(totalWithdrawn), remainingAmount: Math.round(remaining) });
      setYearlyData(yearly);
    } else {
      setResult(null);
      setYearlyData([]);
    }
  }, [initialInvestment, monthlyWithdrawal, annualReturn, timePeriod]);

  return (
    <CalculatorLayout
      title={t("nav.swp")}
      inputsTitle={t("calculator.withdrawalDetails")}
      inputs={
        <>
          <CurrencyInput value={initialInvestment} onChange={setInitialInvestment} label={t("fields.initialInvestment")} min="100000" max="10000000" step="50000" />
          <CurrencyInput value={monthlyWithdrawal} onChange={setMonthlyWithdrawal} label={t("fields.monthlyWithdrawal")} min="1000" max="50000" step="500" />
          <SliderInput label={t("fields.annualReturn")} value={annualReturn} onChange={setAnnualReturn} min="1" max="25" step="0.5" unit="%" />
          <SliderInput label={t("fields.withdrawalPeriod")} value={timePeriod} onChange={setTimePeriod} min="1" max="80" unit=" years" />
        </>
      }
      results={
        result ? (
          <>
            <div className="space-y-3 mb-6">
              <ResultCard label={t("results.totalWithdrawn")} value={result.totalWithdrawn} colorClass="red" />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {numberToWords(result.totalWithdrawn)} {t("calculator.rupees")}
              </div>
              <ResultCard label={t("results.remainingAmount")} value={result.remainingAmount} colorClass="green" />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {numberToWords(result.remainingAmount)} {t("calculator.rupees")}
              </div>
            </div>
            <InflationAdjustedValue value={result.remainingAmount} years={parseFloat(timePeriod)} />
            {result.remainingAmount <= 0 ? (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded text-red-700 dark:text-red-300 text-center">
                {t("calculator.fundsExhausted")}
              </div>
            ) : (
              <PieChart labels={[t("chart.withdrawn"), t("chart.remaining")]} values={[result.totalWithdrawn, result.remainingAmount]} colors={["#ef4444", "#10b981"]} />
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            {t("calculator.emptyWithdrawal")}
          </div>
        )
      }
    >
      {yearlyData.length > 0 && (
        <DataGrid
          columns={[
            { key: "year", title: t("grid.year"), type: "number" },
            { key: "startBalance", title: t("grid.startBalance"), type: "currency" },
            { key: "withdrawn", title: t("grid.withdrawn"), type: "currency" },
            { key: "endBalance", title: t("grid.endBalance"), type: "currency" },
          ]}
          data={yearlyData}
        />
      )}
    </CalculatorLayout>
  );
}
