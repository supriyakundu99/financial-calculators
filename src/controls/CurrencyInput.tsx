import { useState, useEffect } from "react";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  min?: string;
  max?: string;
  step?: string;
}

export default function CurrencyInput({
  value,
  onChange,
  label,
  min = "0",
  max = "9990000000",
  step = "1000",
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [wordsValue, setWordsValue] = useState("");

  const handleChange = (newValue: string) => {
    const numValue = parseInt(newValue || "0");
    if (numValue <= 9990000000) {
      // 999 crores
      onChange(newValue);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}L`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const numberToWords = (num: number): string => {
    if (num === 0) return "Zero";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertHundreds = (n: number): string => {
      let result = "";
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + " Hundred ";
        n %= 100;
      }
      if (n >= 20) {
        result += tens[Math.floor(n / 10)] + " ";
        n %= 10;
      } else if (n >= 10) {
        result += teens[n - 10] + " ";
        return result;
      }
      if (n > 0) {
        result += ones[n] + " ";
      }
      return result;
    };

    let result = "";
    if (num >= 10000000) {
      result += convertHundreds(Math.floor(num / 10000000)) + "Crore ";
      num %= 10000000;
    }
    if (num >= 100000) {
      result += convertHundreds(Math.floor(num / 100000)) + "Lakh ";
      num %= 100000;
    }
    if (num >= 1000) {
      result += convertHundreds(Math.floor(num / 1000)) + "Thousand ";
      num %= 1000;
    }
    if (num > 0) {
      result += convertHundreds(num);
    }

    return result.trim();
  };

  useEffect(() => {
    const numValue = parseInt(value || "0");
    setDisplayValue(formatNumber(numValue));
    setWordsValue(numberToWords(numValue));
  }, [value]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}: ₹{parseInt(value || "0").toLocaleString()} ({displayValue})
      </label>
      <input
        type="range"
        min={min}
        max={Math.min(parseInt(max), 9990000000).toString()}
        step={step}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
      />
      <input
        type="number"
        value={value}
        max="9990000000"
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {wordsValue} Rupees
      </p>
    </div>
  );
}
