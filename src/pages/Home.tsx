import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Financial Calculators
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Welcome to your financial planning toolkit
        </p>
        <div className="space-x-4">
          <Link
            to="/sip"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            SIP Calculator
          </Link>
          <Link
            to="/swp"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            SWP Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
