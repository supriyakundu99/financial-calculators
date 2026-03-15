import { useState, useEffect } from "react";
import CurrencyInput from "../controls/CurrencyInput";
import SliderInput from "../controls/SliderInput";
import ResultCard from "../controls/ResultCard";
import PieChart from "../controls/PieChart";
import DataGrid from "../controls/DataGrid";
import InflationAdjustedValue from "../controls/InflationAdjustedValue";
import CalculatorLayout from "./CalculatorLayout";
import { numberToWords } from "../utils/numberUtils";
import type { WithdrawalResult, YearlyRow } from "../types/calculator";

export default function SWPCalculator() {
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
      setResult({
        totalWithdrawn: Math.round(totalWithdrawn),
        remainingAmount: Math.round(remaining),
      });
      setYearlyData(yearly);
    } else {
      setResult(null);
      setYearlyData([]);
    }
  }, [initialInvestment, monthlyWithdrawal, annualReturn, timePeriod]);

  return (
    <CalculatorLayout
      title="SWP Calculator"
      inputsTitle="Withdrawal Details"
      inputs={
        <>
          <CurrencyInput
            value={initialInvestment}
            onChange={setInitialInvestment}
            label="Initial Investment"
            min="100000"
            max="10000000"
            step="50000"
          />
          <CurrencyInput
            value={monthlyWithdrawal}
            onChange={setMonthlyWithdrawal}
            label="Monthly Withdrawal"
            min="1000"
            max="50000"
            step="500"
          />
          <SliderInput
            label="Expected Annual Return"
            value={annualReturn}
            onChange={setAnnualReturn}
            min="1"
            max="25"
            step="0.5"
            unit="%"
          />
          <SliderInput
            label="Withdrawal Period"
            value={timePeriod}
            onChange={setTimePeriod}
            min="1"
            max="80"
            unit=" years"
          />
        </>
      }
      results={
        result ? (
          <>
            <div className="space-y-3 mb-6">
              <ResultCard
                label="Total Withdrawn"
                value={result.totalWithdrawn}
                colorClass="red"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {numberToWords(result.totalWithdrawn)} Rupees
              </div>
              <ResultCard
                label="Remaining Amount"
                value={result.remainingAmount}
                colorClass="green"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {numberToWords(result.remainingAmount)} Rupees
              </div>
            </div>
            <InflationAdjustedValue
              value={result.remainingAmount}
              years={parseFloat(timePeriod)}
            />
            {result.remainingAmount <= 0 ? (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded text-red-700 dark:text-red-300 text-center">
                ⚠️ Funds will be exhausted before the end of the period
              </div>
            ) : (
              <PieChart
                labels={["Withdrawn", "Remaining"]}
                values={[result.totalWithdrawn, result.remainingAmount]}
                colors={["#ef4444", "#10b981"]}
              />
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            Enter valid withdrawal details to see results
          </div>
        )
      }
    >
      {yearlyData.length > 0 && (
        <DataGrid
          columns={[
            { key: "year", title: "Year", type: "number" },
            { key: "startBalance", title: "Start Balance", type: "currency" },
            { key: "withdrawn", title: "Withdrawn", type: "currency" },
            { key: "endBalance", title: "End Balance", type: "currency" },
          ]}
          data={yearlyData}
        />
      )}
    </CalculatorLayout>
  );
}
