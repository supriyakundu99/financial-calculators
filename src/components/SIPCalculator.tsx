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

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
  const [annualReturn, setAnnualReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('10');
  const [result, setResult] = useState<{ maturityAmount: number; totalInvestment: number; totalGains: number } | null>(null);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/^0+/, '') || '0';
    setter(cleanValue);
  };

  useEffect(() => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturn) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;

    if (P && r && n && P > 0 && r > 0 && n > 0) {
      const maturityAmount = P * (((1 + r) ** n - 1) / r) * (1 + r);
      const totalInvestment = P * n;
      const totalGains = maturityAmount - totalInvestment;

      setResult({
        maturityAmount: Math.round(maturityAmount),
        totalInvestment: Math.round(totalInvestment),
        totalGains: Math.round(totalGains)
      });

      // Calculate yearly breakdown
      const yearly = [];
      let balance = 0;
      for (let year = 1; year <= parseInt(timePeriod); year++) {
        const monthsInYear = year * 12;
        const yearlyMaturity = P * (((1 + r) ** monthsInYear - 1) / r) * (1 + r);
        const yearlyInvestment = P * monthsInYear;
        const yearlyGains = yearlyMaturity - yearlyInvestment;
        
        yearly.push({
          year,
          investment: Math.round(yearlyInvestment),
          gains: Math.round(yearlyGains),
          total: Math.round(yearlyMaturity)
        });
      }
      setYearlyData(yearly);
    } else {
      setResult(null);
      setYearlyData([]);
    }
  }, [monthlyInvestment, annualReturn, timePeriod]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">SIP Calculator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Inputs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Investment Details</h3>
          
          <div className="space-y-6">
            <CurrencyInput
              value={monthlyInvestment}
              onChange={setMonthlyInvestment}
              label="Monthly Investment"
              min="500"
              max="100000"
              step="500"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Annual Return: {annualReturn}%
              </label>
              <input
                type="range"
                min="1"
                max="30"
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
                Time Period: {timePeriod} years
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
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Total Investment:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">₹{result.totalInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Total Gains:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">₹{result.totalGains.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Maturity Amount:</span>
                  <span className="font-bold text-lg text-purple-600 dark:text-purple-400">₹{result.maturityAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="h-64">
                <Pie 
                  data={{
                    labels: ['Investment', 'Gains'],
                    datasets: [{
                      data: [result.totalInvestment, result.totalGains],
                      backgroundColor: ['#3b82f6', '#10b981'],
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
            </>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              Enter valid investment details to see results
            </div>
          )}
        </div>
      </div>

      {yearlyData.length > 0 && (
        <DataGrid
          columns={[
            { key: 'year', title: 'Year', type: 'number' },
            { key: 'investment', title: 'Total Investment', type: 'currency' },
            { key: 'gains', title: 'Total Gains', type: 'currency' },
            { key: 'total', title: 'Maturity Amount', type: 'currency' }
          ]}
          data={yearlyData}
        />
      )}
    </div>
  );
}
