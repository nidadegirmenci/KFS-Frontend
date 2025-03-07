"use client"

import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Checkbox } from "@/app/components/ui/checkbox"
import { campaignStatuses } from "@/app/mocks/campaign-statuses"
import { sectors } from "@/app/mocks/sectors"
import { categories } from "@/app/mocks/categories"

interface CampaignFiltersProps {
  selectedStatuses: string[]
  selectedSectors: string[]
  selectedCategories: string[]
  searchQuery: string
  onStatusChange: (status: string) => void
  onSectorChange: (sector: string) => void
  onCategoryChange: (category: string) => void
  onSearchChange: (query: string) => void
}

export function CampaignFilters({
  selectedStatuses,
  selectedSectors,
  selectedCategories,
  searchQuery,
  onStatusChange,
  onSectorChange,
  onCategoryChange,
  onSearchChange,
}: CampaignFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label>Arama Yap</Label>
        <Input placeholder="" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
      </div>

      {/* Campaign Status */}
      <div className="space-y-2">
        <Label>Kampanya Durumu</Label>
        <div className="space-y-2">
          {campaignStatuses.map((status) => (
            <div key={status.id} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status.id}`}
                checked={selectedStatuses.includes(status.id)}
                onCheckedChange={() => onStatusChange(status.id)}
              />
              <Label htmlFor={`status-${status.id}`} className="text-sm font-normal">
                {status.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sectors */}
      <div className="space-y-2">
        <Label>Sektör</Label>
        <Input placeholder="" className="mb-2" />
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {sectors.map((sector) => (
            <div key={sector.id} className="flex items-center space-x-2">
              <Checkbox
                id={`sector-${sector.id}`}
                checked={selectedSectors.includes(sector.id)}
                onCheckedChange={() => onSectorChange(sector.id)}
              />
              <Label htmlFor={`sector-${sector.id}`} className="text-sm font-normal">
                {sector.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <Label>Kategori</Label>
        <Input placeholder="" className="mb-2" />
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onCategoryChange(category.id)}
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm font-normal">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

