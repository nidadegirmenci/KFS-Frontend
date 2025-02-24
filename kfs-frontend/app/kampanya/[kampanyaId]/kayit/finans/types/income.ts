export interface IncomeItem {
  id: string
  productName: string
  salesPrice: number
  directCost: number
}

export interface SalesTarget {
  productId: string
  quantities: {
    [key: string]: number // year1, year2, etc.
  }
}

