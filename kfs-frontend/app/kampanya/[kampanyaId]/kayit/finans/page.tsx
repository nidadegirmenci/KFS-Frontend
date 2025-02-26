"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation"
import { useNavigationHelpers } from "../utils/navigation"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  Wallet,
  Building2,
  PieChart,
  BarChart,
  LineChart,
  FileText,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"

// Tab components
import ProfitForecast from "./components/profit-forecast"
import ProjectBudget from "./components/project-budget"
import InvestmentBudget from "./components/investment-budget"
import IncomeItems from "./components/income-items"
import SalesTargets from "./components/sales-targets"
import CashFlow from "./components/cash-flow"
import Documents from "./components/documents"

const tabs = [
  {
    id: "profit-forecast",
    title: "Kar Tahminleri",
    fullTitle: "Kar Tahmin ve Beklentileri",
    icon: TrendingUp,
    description: "Gelecek dönem kar tahminleri ve beklentiler",
  },
  {
    id: "project-budget",
    title: "Proje Bütçesi",
    fullTitle: "Proje Bütçesi ve Harcamalar",
    icon: Wallet,
    description: "Proje için planlanan bütçe ve harcama kalemleri",
  },
  {
    id: "investment-budget",
    title: "Yatırım Bütçesi",
    fullTitle: "Yatırım Bütçesi ve Planlaması",
    icon: Building2,
    description: "Yatırım planlaması ve bütçe detayları",
  },
  {
    id: "income-items",
    title: "Gelir Kalemleri",
    fullTitle: "Gelir Kalemleri ve Kaynakları",
    icon: PieChart,
    description: "Gelir kaynakları ve detaylı gelir kalemleri",
  },
  {
    id: "sales-targets",
    title: "Satış Hedefleri",
    fullTitle: "Satış Hedefleri ve Stratejileri",
    icon: BarChart,
    description: "Satış hedefleri ve stratejik planlamalar",
  },
  {
    id: "cash-flow",
    title: "Nakit Akışı",
    fullTitle: "Nakit Akım Tablosu",
    icon: LineChart,
    description: "Nakit giriş ve çıkışlarının detaylı tablosu",
  },
  {
    id: "documents",
    title: "Belgeler",
    fullTitle: "Açıklama ve Belgeler",
    icon: FileText,
    description: "Finansal belgeler ve açıklamalar",
  },
]

export default function FinansPage() {
  const [activeTab, setActiveTab] = useState("profit-forecast")
  const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()

  const handlePrevClick = () => {
    const prevPage = getPreviousPage("finans")
    if (prevPage) {
      router.push(prevPage)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextPage = getNextPage("finans")
    if (nextPage) {
      router.push(nextPage)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profit-forecast":
        return <ProfitForecast />
      case "project-budget":
        return <ProjectBudget />
      case "investment-budget":
        return <InvestmentBudget />
      case "income-items":
        return <IncomeItems />
      case "sales-targets":
        return <SalesTargets />
      case "cash-flow":
        return <CashFlow />
      case "documents":
        return <Documents />
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Finansal Tablolar</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Projenin finansal bilgilerini aşağıdaki başlıklarda detaylandırabilirsiniz
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-5 w-5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Potansiyel yatırımcıların en fazla önem verdiği konu finansal raporlardır. Her başlığı detaylı
                      şekilde doldurunuz.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            {/* Grid Layout for Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TooltipProvider key={tab.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "flex items-center space-x-2 p-3 rounded-lg transition-colors w-full",
                            activeTab === tab.id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{tab.title}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-medium">{tab.fullTitle}</p>
                          <p className="text-xs text-muted-foreground">{tab.description}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>

            {/* Active Tab Content */}
            <div className="mt-4">{renderTabContent()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={handlePrevClick}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Önceki Forma Dön
              </Button>
              <Button type="submit">
                Kaydet ve İlerle
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}

