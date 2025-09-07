import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Financial Calculators
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Welcome to your financial planning toolkit
          </p>
          <Link
            to="/calculators"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
