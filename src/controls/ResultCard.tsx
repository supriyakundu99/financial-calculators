interface ResultCardProps {
  label: string;
  value: number;
  colorClass: string; // e.g. "blue" | "green" | "purple" | "red"
  large?: boolean;
}

const bgMap: Record<string, string> = {
  blue: "bg-blue-50 dark:bg-blue-900/20",
  green: "bg-green-50 dark:bg-green-900/20",
  purple: "bg-purple-50 dark:bg-purple-900/20",
  red: "bg-red-50 dark:bg-red-900/20",
};

const textMap: Record<string, string> = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  purple: "text-purple-600 dark:text-purple-400",
  red: "text-red-600 dark:text-red-400",
};

export default function ResultCard({
  label,
  value,
  colorClass,
  large,
}: ResultCardProps) {
  return (
    <div
      className={`flex justify-between items-center p-3 ${bgMap[colorClass]} rounded`}
    >
      <span className="text-gray-700 dark:text-gray-300">{label}:</span>
      <span
        className={`font-bold ${large ? "text-lg" : ""} ${textMap[colorClass]}`}
      >
        ₹{value.toLocaleString()}
      </span>
    </div>
  );
}
