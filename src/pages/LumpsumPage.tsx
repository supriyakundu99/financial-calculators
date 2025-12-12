import LumpsumCalculator from "../components/LumpsumCalculator";
import SEO from "../components/SEO";

export default function LumpsumPage() {
  return (
    <>
      <SEO 
        title="Lumpsum Calculator - Calculate Lumpsum Investment Returns Online"
        description="Calculate your Lumpsum investment returns with our free online Lumpsum calculator. Plan your one-time investment with interactive charts, yearly breakdown and detailed analysis."
        keywords="Lumpsum calculator, one-time investment, mutual fund lumpsum, investment returns, wealth creation"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto">
          <LumpsumCalculator />
        </div>
      </div>
    </>
  );
}
