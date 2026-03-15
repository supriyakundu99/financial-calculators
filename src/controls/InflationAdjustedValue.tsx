import { useState } from "react";
import { numberToWords } from "../utils/numberUtils";

interface InflationAdjustedValueProps {
  value: number;
  years: number;
}

export default function InflationAdjustedValue({
  value,
  years,
}: InflationAdjustedValueProps) {
  const [inflationRate, setInflationRate] = useState("6");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const cleanValue = val.replace(/^0+/, "") || "0";
    setInflationRate(cleanValue);
  };

  const rate = parseFloat(inflationRate) / 100;
  let adjustedValue = value;

  if (rate && rate > 0 && years > 0) {
    adjustedValue = value / Math.pow(1 + rate, years);
  }

  const roundedAdjusted = Math.round(adjustedValue);

  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Inflation Adjusted Value
          </span>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 dark:text-gray-400">
              Rate (%):
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="20"
              value={inflationRate}
              onChange={handleInputChange}
              className="w-16 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Purchasing power after {years} years
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-blue-600 dark:text-blue-400">
              ₹{roundedAdjusted.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
          {numberToWords(roundedAdjusted)} Rupees
        </div>
      </div>
    </div>
  );
}
