"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { mockIncomeItems } from "../data/mock-income"
import type { SalesTarget } from "../types/income"

export default function SalesTargets() {
  // Gelir kalemlerinden gelen ürünler için satış hedeflerini tut
  const [salesTargets, setSalesTargets] = useState<Record<string, SalesTarget>>(() => {
    // Her ürün için boş hedef oluştur
    return mockIncomeItems.reduce(
      (acc, item) => {
        acc[item.id] = {
          productId: item.id,
          quantities: {
            year1: 0,
            year2: 0,
            year3: 0,
            year4: 0,
            year5: 0,
          },
        }
        return acc
      },
      {} as Record<string, SalesTarget>,
    )
  })

  // Yıllık hedef adet güncelleme
  const updateQuantity = (productId: string, year: string, value: string) => {
    const numValue = value === "" ? 0 : Number.parseInt(value, 10)
    setSalesTargets((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantities: {
          ...prev[productId].quantities,
          [year]: numValue,
        },
      },
    }))
  }

  // Toplam adet hesaplama
  const calculateTotalQuantity = (quantities: Record<string, number>) => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
  }

  // Yıllık ciro hesaplama
  const calculateYearlyRevenue = (quantity: number, salesPrice: number) => {
    return quantity * salesPrice
  }

  // Yıllık maliyet hesaplama
  const calculateYearlyDirectCost = (quantity: number, directCost: number) => {
    return quantity * directCost
  }

  // Toplam ciro hesaplama
  const calculateTotalRevenue = (quantities: Record<string, number>, salesPrice: number) => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty * salesPrice, 0)
  }

  // Toplam maliyet hesaplama
  const calculateTotalDirectCost = (quantities: Record<string, number>, directCost: number) => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty * directCost, 0)
  }

  const years = ["year1", "year2", "year3", "year4", "year5"]

  return (
    <div className="space-y-6">
      {/* Adet Hedefleri */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Satış Hedefleri - Adet</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Her yıl için hedeflenen satış adetlerini girin</p>
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
                  <th className="px-4 py-2 border text-left">Ürün</th>
                  {years.map((year, index) => (
                    <th key={year} className="px-4 py-2 border text-center">
                      {index + 1}.YIL
                    </th>
                  ))}
                  <th className="px-4 py-2 border text-center">TOPLAM</th>
                </tr>
              </thead>
              <tbody>
                {mockIncomeItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 border">{item.productName}</td>
                    {years.map((year) => (
                      <td key={year} className="px-4 py-2 border">
                        <Input
                          type="number"
                          value={salesTargets[item.id].quantities[year] || ""}
                          onChange={(e) => updateQuantity(item.id, year, e.target.value)}
                          className="text-center"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-2 border text-center font-semibold">
                      {calculateTotalQuantity(salesTargets[item.id].quantities)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Ciro Hedefleri */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Satış Hedefleri - Ciro</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Yıllık satış adetleri × satış fiyatı</p>
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
                  <th className="px-4 py-2 border text-left">Ürün</th>
                  {years.map((year, index) => (
                    <th key={year} className="px-4 py-2 border text-center">
                      {index + 1}.YIL
                    </th>
                  ))}
                  <th className="px-4 py-2 border text-center">TOPLAM</th>
                </tr>
              </thead>
              <tbody>
                {mockIncomeItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 border">{item.productName}</td>
                    {years.map((year) => (
                      <td key={year} className="px-4 py-2 border text-right">
                        ₺
                        {calculateYearlyRevenue(
                          salesTargets[item.id].quantities[year],
                          item.salesPrice,
                        ).toLocaleString()}
                      </td>
                    ))}
                    <td className="px-4 py-2 border text-right font-semibold">
                      ₺{calculateTotalRevenue(salesTargets[item.id].quantities, item.salesPrice).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Maliyet Hedefleri */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Satış Hedefleri - Doğrudan Maliyet</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Yıllık satış adetleri × doğrudan maliyet</p>
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
                  <th className="px-4 py-2 border text-left">Ürün</th>
                  {years.map((year, index) => (
                    <th key={year} className="px-4 py-2 border text-center">
                      {index + 1}.YIL
                    </th>
                  ))}
                  <th className="px-4 py-2 border text-center">TOPLAM</th>
                </tr>
              </thead>
              <tbody>
                {mockIncomeItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 border">{item.productName}</td>
                    {years.map((year) => (
                      <td key={year} className="px-4 py-2 border text-right">
                        ₺
                        {calculateYearlyDirectCost(
                          salesTargets[item.id].quantities[year],
                          item.directCost,
                        ).toLocaleString()}
                      </td>
                    ))}
                    <td className="px-4 py-2 border text-right font-semibold">
                      ₺{calculateTotalDirectCost(salesTargets[item.id].quantities, item.directCost).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

