import { useInputChange } from "../hooks/useInputChange";

interface SliderInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: string;
  max: string;
  step?: string;
  unit?: string;
  numberStep?: string;
}

const inputClass =
  "w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent";

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = "1",
  unit = "",
  numberStep,
}: SliderInputProps) {
  const handleChange = useInputChange(onChange);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}: {value}
        {unit}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
      />
      <input
        type="number"
        step={numberStep ?? step}
        value={value}
        onChange={handleChange}
        className={inputClass}
      />
    </div>
  );
}
