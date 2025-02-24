"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { CashFlowData } from "../types/cash-flow"

// Mock data that would normally come from other components
const mockData = {
  salesRevenue: [10000, 10000, 10000, 10000, 10000],
  operatingExpenses: [1000, 1000, 1000, 0, 0],
  investments: [10000, 10000, 10000, 10000, 10000],
  directSalesCosts: [6000, 6000, 6000, 6000, 6000],
}

export default function CashFlow() {
  const [cashFlowData, setCashFlowData] = useState<CashFlowData>({
    salesRevenue: [],
    equity: Array(5).fill(0),
    fundingIncome: Array(5).fill(0),
    totalInflows: [],
    operatingExpenses: [],
    investments: [],
    directSalesCosts: [],
    totalOutflows: [],
    totalCashAssets: [],
    cumulativeCashTransfer: [],
  })

  useEffect(() => {
    // Calculate cash flow data
    const calculateCashFlow = () => {
      const newData: CashFlowData = {
        salesRevenue: mockData.salesRevenue,
        equity: Array(5).fill(0),
        fundingIncome: Array(5).fill(0),
        totalInflows: [],
        operatingExpenses: mockData.operatingExpenses,
        investments: mockData.investments,
        directSalesCosts: mockData.directSalesCosts,
        totalOutflows: [],
        totalCashAssets: [],
        cumulativeCashTransfer: [],
      }

      // Calculate total inflows
      newData.totalInflows = newData.salesRevenue.map(
        (revenue, i) => revenue + newData.equity[i] + newData.fundingIncome[i],
      )

      // Calculate total outflows
      newData.totalOutflows = newData.operatingExpenses.map(
        (expense, i) => expense + newData.investments[i] + newData.directSalesCosts[i],
      )

      // Calculate cumulative cash flow
      let cumulativeBalance = 0
      for (let i = 0; i < 5; i++) {
        if (i === 0) {
          newData.totalCashAssets[i] = 0
        } else {
          newData.totalCashAssets[i] = newData.cumulativeCashTransfer[i - 1]
        }

        cumulativeBalance = newData.totalCashAssets[i] + newData.totalInflows[i] - newData.totalOutflows[i]
        newData.cumulativeCashTransfer[i] = cumulativeBalance
      }

      setCashFlowData(newData)
    }

    calculateCashFlow()
  }, [])

  const formatCurrency = (value: number) => {
    return `₺ ${Math.abs(value).toLocaleString()}`
  }

  const formatValue = (value: number) => {
    return value < 0 ? `(-)${formatCurrency(value)}` : formatCurrency(value)
  }

  return (
    <div className="space-y-6">
      {/* Income Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gelir Tablosu</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Yıllık gelir detayları</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 border text-left"></th>
                  <th className="px-4 py-2 border text-center">1.YIL</th>
                  <th className="px-4 py-2 border text-center">2.YIL</th>
                  <th className="px-4 py-2 border text-center">3.YIL</th>
                  <th className="px-4 py-2 border text-center">4.YIL</th>
                  <th className="px-4 py-2 border text-center">5.YIL</th>
                  <th className="px-4 py-2 border text-center">TOPLAM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border font-medium">SATIŞ GELİRLERİ</td>
                  {cashFlowData.salesRevenue.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right">
                      {formatCurrency(value)}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-right font-medium">
                    {formatCurrency(cashFlowData.salesRevenue.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">ÖZ SERMAYE</td>
                  {cashFlowData.equity.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right">
                      {formatCurrency(value)}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-right font-medium">
                    {formatCurrency(cashFlowData.equity.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">FONLAMA GELİRİ</td>
                  {cashFlowData.fundingIncome.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right">
                      {formatCurrency(value)}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-right font-medium">
                    {formatCurrency(cashFlowData.fundingIncome.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="px-4 py-2 border font-medium">TOPLAM GİRİŞLER</td>
                  {cashFlowData.totalInflows.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right font-medium">
                      {formatCurrency(value)}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-right font-medium">
                    {formatCurrency(cashFlowData.totalInflows.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Expense Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gider Tablosu</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Yıllık gider detayları</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 border text-left"></th>
                  <th className="px-4 py-2 border text-center">1.YIL</th>
                  <th className="px-4 py-2 border text-center">2.YIL</th>
                  <th className="px-4 py-2 border text-center">3.YIL</th>
                  <th className="px-4 py-2 border text-center">4.YIL</th>
                  <th className="px-4 py-2 border text-center">5.YIL</th>
                  <th className="px-4 py-2 border text-center">TOPLAM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border font-medium">YILLIK İŞLETME GİDERLERİ</td>
                  {cashFlowData.operatingExpenses.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right">
                      {formatCurrency(value)}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-right font-medium">
                    {formatCurrency(cashFlowData.operatingExpenses.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">YATIRIMLAR</td>
                  {cashFlowData.investments.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right">
                      {formatCurrency(value)}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-right font-medium">
                    {formatCurrency(cashFlowData.investments.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">DOĞRUDAN SATIŞ MALİYETLERİ</td>
                  {cashFlowData.directSalesCosts.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right">
                      {formatCurrency(value)}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-right font-medium">
                    {formatCurrency(cashFlowData.directSalesCosts.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="px-4 py-2 border font-medium">TOPLAM ÇIKIŞLAR</td>
                  {cashFlowData.totalOutflows.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right font-medium">
                      {formatCurrency(value)}
                    </td>
                  ))}
                  <td className="px-4 py-2 border text-right font-medium">
                    {formatCurrency(cashFlowData.totalOutflows.reduce((a, b) => a + b, 0))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Nakit Akım Tablosu</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Nakit akış detayları</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 border text-left"></th>
                  <th className="px-4 py-2 border text-center">1.YIL</th>
                  <th className="px-4 py-2 border text-center">2.YIL</th>
                  <th className="px-4 py-2 border text-center">3.YIL</th>
                  <th className="px-4 py-2 border text-center">4.YIL</th>
                  <th className="px-4 py-2 border text-center">5.YIL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border font-medium">TOPLAM NAKİT VARLIK</td>
                  {cashFlowData.totalCashAssets.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right">
                      {formatValue(value)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">TOPLAM GİRİŞLER</td>
                  {cashFlowData.totalInflows.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right">
                      {formatCurrency(value)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">TOPLAM ÇIKIŞLAR</td>
                  {cashFlowData.totalOutflows.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right">
                      {formatCurrency(value)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-muted/50">
                  <td className="px-4 py-2 border font-medium">KÜMÜLATİF N.V. DEVİR</td>
                  {cashFlowData.cumulativeCashTransfer.map((value, index) => (
                    <td key={index} className="px-4 py-2 border text-right font-medium">
                      {formatValue(value)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

