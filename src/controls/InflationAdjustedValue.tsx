import { useState } from "react";
import { numberToWords } from "../utils/numberUtils";
import { useTranslation } from "../hooks/useTranslation";
import { useInputChange } from "../hooks/useInputChange";

interface InflationAdjustedValueProps {
  value: number;
  years: number;
}

export default function InflationAdjustedValue({ value, years }: InflationAdjustedValueProps) {
  const { t } = useTranslation();
  const [inflationRate, setInflationRate] = useState("6");
  const handleChange = useInputChange(setInflationRate);

  const rate = parseFloat(inflationRate) / 100;
  const adjustedValue = rate > 0 && years > 0 ? value / Math.pow(1 + rate, years) : value;
  const rounded = Math.round(adjustedValue);

  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("inflation.title")}
          </span>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 dark:text-gray-400">
              {t("inflation.rateLabel")}
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="20"
              value={inflationRate}
              onChange={handleChange}
              className="w-16 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {t("inflation.purchasingPower", { years })}
          </div>
          <div className="font-bold text-lg text-blue-600 dark:text-blue-400">
            ₹{rounded.toLocaleString()}
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
          {numberToWords(rounded)} {t("calculator.rupees")}
        </div>
      </div>
    </div>
  );
}
