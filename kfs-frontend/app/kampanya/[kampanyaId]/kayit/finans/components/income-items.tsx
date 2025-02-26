"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface IncomeItem {
  id: string
  productName: string
  salesPrice: number
  directCost: number
}

export default function IncomeItems() {
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([
    {
      id: "1",
      productName: "",
      salesPrice: 0,
      directCost: 0,
    },
  ])

  const addIncomeItem = () => {
    setIncomeItems([
      ...incomeItems,
      {
        id: Date.now().toString(),
        productName: "",
        salesPrice: 0,
        directCost: 0,
      },
    ])
  }

  const removeIncomeItem = (id: string) => {
    if (incomeItems.length > 1) {
      setIncomeItems(incomeItems.filter((item) => item.id !== id))
    }
  }

  const updateIncomeItem = (id: string, field: keyof IncomeItem, value: string) => {
    setIncomeItems(
      incomeItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "productName" ? value : Number(value) || 0,
            }
          : item,
      ),
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gelir Kalemleri</CardTitle>
          <Button variant="outline" size="sm" onClick={addIncomeItem}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ekle
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 border text-left">ÜRÜN KALEMLERİ</th>
                <th className="px-4 py-2 border text-center">SATIŞ FİYATI</th>
                <th className="px-4 py-2 border text-center">DOĞRUDAN MALİYET</th>
                <th className="px-4 py-2 border text-center w-[100px]">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {incomeItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50">
                  <td className="px-4 py-2 border">
                    <Input
                      value={item.productName}
                      onChange={(e) => updateIncomeItem(item.id, "productName", e.target.value)}
                      placeholder="Ürün adı girin"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <Input
                      type="number"
                      value={item.salesPrice || ""}
                      onChange={(e) => updateIncomeItem(item.id, "salesPrice", e.target.value)}
                      placeholder="0.00"
                      className="text-right"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <Input
                      type="number"
                      value={item.directCost || ""}
                      onChange={(e) => updateIncomeItem(item.id, "directCost", e.target.value)}
                      placeholder="0.00"
                      className="text-right"
                    />
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeIncomeItem(item.id)}
                      disabled={incomeItems.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

