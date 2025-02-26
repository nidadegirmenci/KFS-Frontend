"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Alert, AlertDescription } from "@/app/components/ui/alert"

interface YearlyInvestment {
  amount: number
}

export default function InvestmentBudget() {
  const [investments, setInvestments] = useState<YearlyInvestment[]>([
    { amount: 0 },
    { amount: 0 },
    { amount: 0 },
    { amount: 0 },
    { amount: 0 },
  ])

  const calculateTotal = () => {
    return investments.reduce((sum, year) => sum + year.amount, 0)
  }

  const handleInvestmentChange = (yearIndex: number, value: string) => {
    const numValue = value === "" ? 0 : Number(value)
    setInvestments((prev) => {
      const newInvestments = [...prev]
      newInvestments[yearIndex] = { amount: numValue }
      return newInvestments
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yatırım Bütçesi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 border text-left">YATIRIM GEREKSİNİMİ</th>
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
                <td className="px-4 py-2 border font-semibold">YATIRIM GEREKSİNİMİ</td>
                {investments.map((yearInvestment, index) => (
                  <td key={index} className="px-4 py-2 border">
                    <Input
                      type="number"
                      value={yearInvestment.amount || ""}
                      onChange={(e) => handleInvestmentChange(index, e.target.value)}
                      className="w-full"
                    />
                  </td>
                ))}
                <td className="px-4 py-2 border text-right font-semibold">₺{calculateTotal().toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Alert className="mt-4 bg-yellow-50 border-yellow-200 text-yellow-800">
          <AlertDescription>
            Kampanyada elde edilecek fon haricinde ihtiyaç duyduğunuz Yatırımların girilmesi gerekmektedir.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

