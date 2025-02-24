export interface CashFlowData {
  // Income table data
  salesRevenue: number[]
  equity: number[]
  fundingIncome: number[]
  totalInflows: number[]

  // Expense table data
  operatingExpenses: number[]
  investments: number[]
  directSalesCosts: number[]
  totalOutflows: number[]

  // Cash flow table data
  totalCashAssets: number[]
  cumulativeCashTransfer: number[]
}

