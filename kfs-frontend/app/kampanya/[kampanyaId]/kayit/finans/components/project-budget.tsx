"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { BudgetData, BudgetCategory, BudgetItem } from "../types/budget"
import { initialBudget } from "../data/initial-budget"

export default function ProjectBudget() {
  const [budget, setBudget] = useState<BudgetData>(initialBudget)

  const calculateTotal = (years: number[]): number => {
    return years.reduce((sum, value) => sum + value, 0)
  }

  const updateItemValue = (categoryId: keyof BudgetData, itemId: string | null, yearIndex: number, value: number) => {
    setBudget((prev) => {
      const newBudget = { ...prev }
      const category = newBudget[categoryId]

      if (itemId === null) {
        // Direct category update (for cleaning and contingency)
        category.years[yearIndex] = value
        category.total = calculateTotal(category.years)
      } else {
        // Update item value
        const item = category.items.find((i) => i.id === itemId)
        if (item) {
          item.years[yearIndex] = value
          item.total = calculateTotal(item.years)
        }

        // Update category totals
        category.years[yearIndex] = category.items.reduce((sum, item) => sum + item.years[yearIndex], 0)
        category.total = calculateTotal(category.years)
      }

      // Update operating expenses totals
      const operatingExpenses = newBudget.operatingExpenses
      operatingExpenses.years[yearIndex] = Object.values(newBudget)
        .filter((cat) => cat.id !== "operating") // Exclude operating expenses itself
        .reduce((sum, cat) => sum + cat.years[yearIndex], 0)
      operatingExpenses.total = calculateTotal(operatingExpenses.years)

      return newBudget
    })
  }

  const renderBudgetItem = (item: BudgetItem, categoryId: keyof BudgetData) => (
    <tr key={item.id} className="hover:bg-muted/50">
      <td className="px-4 py-2 border">{item.name}</td>
      {item.years.map((value, yearIndex) => (
        <td key={yearIndex} className="px-4 py-2 border">
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => {
              const newValue = e.target.value === "" ? 0 : Number(e.target.value)
              updateItemValue(categoryId, item.id, yearIndex, newValue)
            }}
            className="w-full"
          />
        </td>
      ))}
      <td className="px-4 py-2 border font-semibold text-right">₺{item.total.toLocaleString()}</td>
    </tr>
  )

  const renderBudgetCategory = (category: BudgetCategory, categoryId: keyof BudgetData) => {
    if (categoryId === "cleaningExpenses" || categoryId === "contingencyExpenses") {
      // Render single row for cleaning and contingency expenses
      return (
        <tr key={category.id} className="bg-muted/50">
          <td className="px-4 py-2 border font-semibold">{category.name}</td>
          {category.years.map((value, yearIndex) => (
            <td key={yearIndex} className="px-4 py-2 border">
              <Input
                type="number"
                value={value || ""}
                onChange={(e) => {
                  const newValue = e.target.value === "" ? 0 : Number(e.target.value)
                  updateItemValue(categoryId, null, yearIndex, newValue)
                }}
                className="w-full"
              />
            </td>
          ))}
          <td className="px-4 py-2 border text-right font-semibold">₺{category.total.toLocaleString()}</td>
        </tr>
      )
    }

    return (
      <>
        <tr className="bg-muted/50">
          <td className="px-4 py-2 border font-semibold">{category.name}</td>
          {category.years.map((total, index) => (
            <td key={index} className="px-4 py-2 border text-right font-semibold">
              ₺{total.toLocaleString()}
            </td>
          ))}
          <td className="px-4 py-2 border text-right font-semibold">₺{category.total.toLocaleString()}</td>
        </tr>
        {category.items.map((item) => renderBudgetItem(item, categoryId))}
      </>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proje Bütçesi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 border text-left">Gider Kalemi</th>
                <th className="px-4 py-2 border text-center">1. YIL</th>
                <th className="px-4 py-2 border text-center">2. YIL</th>
                <th className="px-4 py-2 border text-center">3. YIL</th>
                <th className="px-4 py-2 border text-center">4. YIL</th>
                <th className="px-4 py-2 border text-center">5. YIL</th>
                <th className="px-4 py-2 border text-center">TOPLAM</th>
              </tr>
            </thead>
            <tbody>
              {/* Render operating expenses first */}
              {renderBudgetCategory(budget.operatingExpenses, "operatingExpenses")}

              {/* Render all other categories */}
              {Object.entries(budget)
                .filter(([key]) => key !== "operatingExpenses")
                .map(([key, category]) => renderBudgetCategory(category, key as keyof BudgetData))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

