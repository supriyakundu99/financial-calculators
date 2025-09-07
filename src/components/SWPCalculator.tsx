import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import DataGrid from '../controls/DataGrid';
import CurrencyInput from '../controls/CurrencyInput';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SWPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('1000000');
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState('8000');
  const [annualReturn, setAnnualReturn] = useState('10');
  const [timePeriod, setTimePeriod] = useState('15');
  const [result, setResult] = useState<{ finalValue: number; totalWithdrawn: number; remainingAmount: number } | null>(null);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/^0+/, '') || '0';
    setter(cleanValue);
  };

  useEffect(() => {
    const P = parseFloat(initialInvestment);
    const W = parseFloat(monthlyWithdrawal);
    const r = parseFloat(annualReturn) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;

    if (P && W && r && n && P > 0 && W > 0 && r > 0 && n > 0) {
      let balance = P;
      let totalWithdrawn = 0;
      const yearly = [];

      for (let year = 1; year <= parseInt(timePeriod); year++) {
        let yearStartBalance = balance;
        let yearWithdrawn = 0;
        
        for (let month = 1; month <= 12; month++) {
          if (balance <= 0) break;
          balance = balance * (1 + r) - W;
          totalWithdrawn += W;
          yearWithdrawn += W;
        }
        
        yearly.push({
          year,
          startBalance: Math.round(yearStartBalance),
          withdrawn: Math.round(yearWithdrawn),
          endBalance: Math.round(Math.max(0, balance))
        });
        
        if (balance <= 0) break;
      }

      const remainingAmount = Math.max(0, balance);
      
      setResult({
        finalValue: Math.round(remainingAmount),
        totalWithdrawn: Math.round(totalWithdrawn),
        remainingAmount: Math.round(remainingAmount)
      });
      
      setYearlyData(yearly);
    } else {
      setResult(null);
      setYearlyData([]);
    }
  }, [initialInvestment, monthlyWithdrawal, annualReturn, timePeriod]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">SWP Calculator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Inputs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Withdrawal Details</h3>
          
          <div className="space-y-6">
            <CurrencyInput
              value={initialInvestment}
              onChange={setInitialInvestment}
              label="Initial Investment"
              min="100000"
              max="10000000"
              step="50000"
            />

            <CurrencyInput
              value={monthlyWithdrawal}
              onChange={setMonthlyWithdrawal}
              label="Monthly Withdrawal"
              min="1000"
              max="50000"
              step="500"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Annual Return: {annualReturn}%
              </label>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <input
                type="number"
                step="0.5"
                value={annualReturn}
                onChange={handleInputChange(setAnnualReturn)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Withdrawal Period: {timePeriod} years
              </label>
              <input
                type="range"
                min="1"
                max="80"
                step="1"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <input
                type="number"
                value={timePeriod}
                onChange={handleInputChange(setTimePeriod)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Results with Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Results</h3>
          
          {result ? (
            <>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Total Withdrawn:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">₹{result.totalWithdrawn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Remaining Amount:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">₹{result.remainingAmount.toLocaleString()}</span>
                </div>
              </div>

              {result.remainingAmount <= 0 ? (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded text-red-700 dark:text-red-300 text-center">
                  ⚠️ Funds will be exhausted before the end of the period
                </div>
              ) : (
                <div className="h-64">
                  <Pie 
                    data={{
                      labels: ['Withdrawn', 'Remaining'],
                      datasets: [{
                        data: [result.totalWithdrawn, result.remainingAmount],
                        backgroundColor: ['#ef4444', '#10b981'],
                        borderWidth: 2,
                        borderColor: '#ffffff',
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { 
                          position: 'bottom',
                          labels: {
                            padding: 20,
                            usePointStyle: true,
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: (context: any) => `${context.label}: ₹${context.parsed.toLocaleString()}`
                          }
                        }
                      }
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              Enter valid withdrawal details to see results
            </div>
          )}
        </div>
      </div>

      {yearlyData.length > 0 && (
        <DataGrid
          columns={[
            { key: 'year', title: 'Year', type: 'number' },
            { key: 'startBalance', title: 'Start Balance', type: 'currency' },
            { key: 'withdrawn', title: 'Withdrawn', type: 'currency' },
            { key: 'endBalance', title: 'End Balance', type: 'currency' }
          ]}
          data={yearlyData}
        />
      )}
    </div>
  );
}
