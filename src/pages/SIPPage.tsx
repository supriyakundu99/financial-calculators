import SIPCalculator from "../components/SIPCalculator";
import SEO from "../components/SEO";

export default function SIPPage() {
  return (
    <>
      <SEO
        title="SIP Calculator - Systematic Investment Plan Calculator Online"
        description="Calculate your SIP returns with our free online SIP calculator. Plan your systematic investment with interactive charts, yearly breakdown and detailed analysis."
        keywords="SIP calculator, systematic investment plan, mutual fund SIP, investment returns, SIP planning"
        path="/sip"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto">
          <SIPCalculator />
        </div>
      </div>
    </>
  );
}
