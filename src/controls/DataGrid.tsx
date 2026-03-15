import { useTranslation } from "../hooks/useTranslation";

interface Column {
  key: string;
  title: string;
  type: "string" | "number" | "currency";
}

interface DataGridProps {
  columns: Column[];
  data: Record<string, any>[];
}

function formatValue(value: any, type: string) {
  if (type === "currency") return `₹${Number(value).toLocaleString()}`;
  if (type === "number") return Number(value).toLocaleString();
  return value;
}

export default function DataGrid({ columns, data }: DataGridProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {t("calculator.yearlyBreakdown")}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((col) => (
                <th key={col.key} className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4 text-gray-900 dark:text-gray-100">
                    {formatValue(row[col.key], col.type)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
