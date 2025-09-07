import SIPCalculator from '../components/SIPCalculator';
import SWPCalculator from '../components/SWPCalculator';
import ThemeToggle from '../components/ThemeToggle';

export default function Calculators() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          Financial Calculators
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <SIPCalculator />
          <SWPCalculator />
        </div>
      </div>
    </div>
  );
}
