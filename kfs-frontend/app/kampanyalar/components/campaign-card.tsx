import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Progress } from "@/app/components/ui/progress"
import type { Campaign } from "@/app/mocks/campaigns"

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const statusLabels = {
    fonlamada: "Fonlamada",
    yakinda: "Yakında",
    fonlandi: "Fonlandı",
    fonlanamadi: "Fonlanamadı",
    sonlandirmada: "Sonlandırmada",
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 md:h-64">
        <Image src={campaign.imageUrl || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant={campaign.isSuccessful ? "default" : "secondary"} className="font-semibold">
            {campaign.isSuccessful ? "Başarılı" : statusLabels[campaign.status]}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold line-clamp-1">{campaign.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{campaign.companyName}</p>
          <p className="text-sm line-clamp-2">{campaign.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>%{campaign.progress} Fonlandı</span>
            {campaign.daysLeft && <span>{campaign.daysLeft} Gün Kaldı</span>}
          </div>
          <Progress value={campaign.progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="font-medium">₺{campaign.currentFunding.toLocaleString()}</span>
            <span className="text-muted-foreground">Hedef: ₺{campaign.fundingGoal.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {campaign.status === "fonlamada" && (
            <Button asChild className="flex-1">
              <Link href={`/kampanyalar/${campaign.id}/yatirim`}>YATIRIM YAP</Link>
            </Button>
          )}
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/kampanyalar/${campaign.id}`}>İNCELE</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

