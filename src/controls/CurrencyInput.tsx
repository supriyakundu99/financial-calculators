import { useState, useEffect } from "react";
import { numberToWords } from "../utils/numberUtils";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  min?: string;
  max?: string;
  step?: string;
}

const MAX = 9990000000;

function formatShort(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}

export default function CurrencyInput({
  value,
  onChange,
  label,
  min = "0",
  max = String(MAX),
  step = "1000",
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [wordsValue, setWordsValue] = useState("");

  const handleChange = (newValue: string) => {
    if (parseInt(newValue || "0") <= MAX) onChange(newValue);
  };

  useEffect(() => {
    const num = parseInt(value || "0");
    setDisplayValue(formatShort(num));
    setWordsValue(numberToWords(num));
  }, [value]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}: ₹{parseInt(value || "0").toLocaleString()} ({displayValue})
      </label>
      <input
        type="range"
        min={min}
        max={Math.min(parseInt(max), MAX).toString()}
        step={step}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
      />
      <input
        type="number"
        value={value}
        max={MAX}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {wordsValue} Rupees
      </p>
    </div>
  );
}
