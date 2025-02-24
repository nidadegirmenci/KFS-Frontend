export interface BudgetItem {
  id: string
  name: string
  years: number[]
  total: number
  subItems?: BudgetItem[]
}

export interface BudgetCategory {
  id: string
  name: string
  items: BudgetItem[]
  years: number[]
  total: number
}

export interface BudgetData {
  operatingExpenses: BudgetCategory
  personnelExpenses: BudgetCategory
  communicationExpenses: BudgetCategory
  utilityExpenses: BudgetCategory
  officeExpenses: BudgetCategory
  travelExpenses: BudgetCategory
  representationExpenses: BudgetCategory
  rentExpenses: BudgetCategory
  advertisingExpenses: BudgetCategory
  consultancyExpenses: BudgetCategory
  productionExpenses: BudgetCategory
  cleaningExpenses: BudgetCategory
  contingencyExpenses: BudgetCategory
}

