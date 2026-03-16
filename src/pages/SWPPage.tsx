import SWPCalculator from "../components/SWPCalculator";
import SEO from "../components/SEO";

export default function SWPPage() {
  return (
    <>
      <SEO
        title="SWP Calculator - Systematic Withdrawal Plan Calculator Online"
        description="Calculate your SWP withdrawals with our free online SWP calculator. Plan your systematic withdrawal with interactive charts and yearly breakdown analysis."
        keywords="SWP calculator, systematic withdrawal plan, retirement planning, withdrawal calculator, investment withdrawal"
        path="/swp"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto">
          <SWPCalculator />
        </div>
      </div>
    </>
  );
}
