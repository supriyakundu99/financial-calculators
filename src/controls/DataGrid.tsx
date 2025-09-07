interface Column {
  key: string;
  title: string;
  type: "string" | "number" | "currency";
}

interface DataGridProps {
  columns: Column[];
  data: Record<string, any>[];
}

export default function DataGrid({ columns, data }: DataGridProps) {
  const formatValue = (value: any, type: string) => {
    switch (type) {
      case "currency":
        return `₹${Number(value).toLocaleString()}`;
      case "number":
        return Number(value).toLocaleString();
      default:
        return value;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Yearly Breakdown
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-3 px-4 text-gray-900 dark:text-gray-100"
                  >
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
