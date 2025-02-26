"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ArrowRight, TrendingUp, Users, DollarSign, Target } from "lucide-react"
import Link from "next/link"

// Mock data
const mockStats = {
  totalCampaigns: 3,
  totalInvestment: 50000,
  supporterCount: 250,
  favoriteProjects: 7,
  campaignIncrease: 1,
  investmentIncrease: 10000,
  supporterIncrease: 30,
  favoriteIncrease: 2,
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Profil Özeti</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Kampanya</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalCampaigns}</div>
              <p className="text-xs text-muted-foreground">+{mockStats.campaignIncrease} geçen aydan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Yatırım</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₺{mockStats.totalInvestment.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +₺{mockStats.investmentIncrease.toLocaleString()} geçen aydan
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Destekçi Sayısı</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.supporterCount}</div>
              <p className="text-xs text-muted-foreground">+{mockStats.supporterIncrease} geçen aydan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favori Projeler</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.favoriteProjects}</div>
              <p className="text-xs text-muted-foreground">+{mockStats.favoriteIncrease} geçen aydan</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Son Kampanyalar</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Kampanya listesi buraya gelecek</p>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Son Yatırımlar</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Yatırım listesi buraya gelecek</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end mt-8">
          <Button asChild>
            <Link href="/profile/campaigns">
              Tüm Kampanyalarım
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

