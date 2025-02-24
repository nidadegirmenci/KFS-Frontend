"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Edit } from "lucide-react"

export default function KampanyaKayit() {
  const [campaigns, setCampaigns] = useState<string[]>([])
  const router = useRouter()

  const handleCreateCampaign = () => {
    if (campaigns.length >= 2) {
      alert("En fazla 2 kampanya başlatabilirsiniz.")
      return
    }

    const campaignId = `KMP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setCampaigns([...campaigns, campaignId])
    router.push(`/kampanya/${campaignId}/kayit/profil`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Yeni Kampanya Başlat</h1>
      <p className="text-lg text-gray-600 mb-8">
        Buradan yeni bir kampanya oluşturabilir veya mevcut kampanyalarınızı düzenleyebilirsiniz. Her kullanıcı en fazla
        2 aktif kampanya başlatabilir.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {campaigns.map((campaignId) => (
          <Card key={campaignId} className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl">Kampanya: {campaignId}</CardTitle>
              <CardDescription>Taslak kampanya</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push(`/kampanya/${campaignId}/kayit/profil`)} className="w-full">
                <Edit className="mr-2 h-4 w-4" /> Kampanyayı Düzenle
              </Button>
            </CardContent>
          </Card>
        ))}
        {campaigns.length < 2 && (
          <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-2xl">Yeni Kampanya</CardTitle>
              <CardDescription>Yeni bir kampanya başlatın</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleCreateCampaign} className="w-full" size="lg">
                <PlusCircle className="mr-2 h-5 w-5" /> Yeni Kampanya Oluştur
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

