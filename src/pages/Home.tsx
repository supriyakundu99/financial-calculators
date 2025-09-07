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
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome to your financial planning toolkit
          </p>
        </div>
      </div>
    </div>
  );
}
