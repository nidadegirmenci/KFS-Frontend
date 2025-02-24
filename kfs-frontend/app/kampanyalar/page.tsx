"use client"

import { useState } from "react"
import { CampaignFilters } from "./components/campaign-filters"
import { CampaignCard } from "./components/campaign-card"
import { campaigns } from "../mocks/campaigns"

export default function CampaignsPage() {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const handleSectorChange = (sector: string) => {
    setSelectedSectors((prev) => (prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]))
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const filteredCampaigns = campaigns.filter((campaign) => {
    // Search filter
    if (
      searchQuery &&
      !campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !campaign.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Status filter
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(campaign.status)) {
      return false
    }

    // Sector filter
    if (selectedSectors.length > 0 && !selectedSectors.includes(campaign.sector)) {
      return false
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(campaign.category)) {
      return false
    }

    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tüm Kampanyalar</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <CampaignFilters
            selectedStatuses={selectedStatuses}
            selectedSectors={selectedSectors}
            selectedCategories={selectedCategories}
            searchQuery={searchQuery}
            onStatusChange={handleStatusChange}
            onSectorChange={handleSectorChange}
            onCategoryChange={handleCategoryChange}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Campaign Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Arama kriterlerinize uygun kampanya bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

