export interface InvestmentResult {
  maturityAmount: number;
  totalInvestment: number;
  totalGains: number;
}

export interface WithdrawalResult {
  totalWithdrawn: number;
  remainingAmount: number;
}

export interface YearlyRow {
  year: number;
  [key: string]: number;
}
