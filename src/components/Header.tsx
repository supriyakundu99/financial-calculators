import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-gray-100"
          >
            <img
              src="/logo.svg"
              alt="FinCalc Logo"
              className="h-8 w-8 shrink-0 dark:brightness-110"
            />
            <span className="hidden sm:block">Financial Calculators</span>
            <span className="sm:hidden block">FinCalc</span>
          </Link>

          <nav className="flex items-center space-x-2 sm:space-x-6">
            <Link
              to="/sip"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
              SIP Calculator
            </Link>
            <Link
              to="/swp"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
              SWP Calculator
            </Link>
            <Link
              to="/lumpsum"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Lumpsum Calculator
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
