"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "../../mocks/projects"
import "../entrepreneur-registration/styles/custom-inputs.css"

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(projects.slice(0, 2))

  const handleDelete = (id: number) => {
    setCampaigns((prevCampaigns) => prevCampaigns.filter((campaign) => campaign.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Kampanyalarım</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={campaign.imageUrl || "/placeholder.svg"}
                  alt={campaign.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/${campaign.id}`} className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Görüntüle</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/campaigns/${campaign.id}/edit`} className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Düzenle</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(campaign.id)}
                      className="flex items-center text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Sil</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{campaign.title}</CardTitle>
              <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{campaign.category}</span>
                <span>{campaign.daysLeft} gün kaldı</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">
                    {Math.round((campaign.currentFunding / campaign.fundingGoal) * 100)}% Tamamlandı
                  </span>
                  <span className="text-sm">{campaign.backers} Destekçi</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(campaign.currentFunding / campaign.fundingGoal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-semibold">₺{campaign.currentFunding.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">Hedef: ₺{campaign.fundingGoal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

