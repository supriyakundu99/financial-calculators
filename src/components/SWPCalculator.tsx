import { useState, useEffect } from 'react';

export default function SWPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [result, setResult] = useState<{ finalValue: number; totalWithdrawn: number; remainingAmount: number } | null>(null);

  useEffect(() => {
    const P = parseFloat(initialInvestment);
    const W = parseFloat(monthlyWithdrawal);
    const r = parseFloat(annualReturn) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;

    if (P && W && r && n && P > 0 && W > 0 && r > 0 && n > 0) {
      let balance = P;
      let totalWithdrawn = 0;

      for (let i = 0; i < n; i++) {
        balance = balance * (1 + r) - W;
        totalWithdrawn += W;
        if (balance <= 0) break;
      }

      const remainingAmount = Math.max(0, balance);
      
      setResult({
        finalValue: Math.round(remainingAmount),
        totalWithdrawn: Math.round(totalWithdrawn),
        remainingAmount: Math.round(remainingAmount)
      });
    } else {
      setResult(null);
    }
  }, [initialInvestment, monthlyWithdrawal, annualReturn, timePeriod]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">SWP Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Initial Investment (₹)
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Monthly Withdrawal (₹)
          </label>
          <input
            type="number"
            value={monthlyWithdrawal}
            onChange={(e) => setMonthlyWithdrawal(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="8000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Expected Annual Return (%)
          </label>
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Withdrawal Period (Years)
          </label>
          <input
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="15"
          />
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Results</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Withdrawn:</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">₹{result.totalWithdrawn.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600 dark:text-gray-400">Remaining Amount:</span>
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100">₹{result.remainingAmount.toLocaleString()}</span>
            </div>
          </div>
          {result.remainingAmount <= 0 && (
            <div className="mt-2 p-2 bg-red-100 dark:bg-red-900 rounded text-red-700 dark:text-red-300 text-sm">
              ⚠️ Funds will be exhausted before the end of the period
            </div>
          )}
        </div>
      )}
    </div>
  );
}
