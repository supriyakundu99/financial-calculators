import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <>
      <SEO 
        title="Financial Calculators - Free SIP & SWP Calculator Online"
        description="Free online financial calculators for investment planning. Calculate SIP returns, SWP withdrawals with interactive charts and detailed analysis. Start your financial planning today."
        keywords="financial calculator, SIP calculator, SWP calculator, investment planning, mutual fund calculator, retirement planning"
      />
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Financial Calculators
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Plan your investments with our free online calculators
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 mb-8">
            Calculate SIP returns, plan SWP withdrawals with interactive charts and yearly breakdowns
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              to="/sip"
              className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-colors shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">SIP Calculator</h2>
              <p className="text-blue-100">Calculate Systematic Investment Plan returns</p>
            </Link>
            <Link
              to="/swp"
              className="block bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-8 rounded-lg transition-colors shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">SWP Calculator</h2>
              <p className="text-green-100">Plan Systematic Withdrawal Plan</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
