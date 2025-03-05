"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Button } from "@/app/components/ui/button"
import { FileUpload } from "@/app/components/ui/file-upload"
import { InfoIcon as InfoCircle, Plus, ChevronRight, ChevronLeft } from "lucide-react"
import { getCities, getDistricts } from "./cities-districts"
import { useRouter } from "next/navigation"
import { useNavigationHelpers } from "../utils/navigation"

export default function KampanyaKurulusPage({ params }: { params: { kampanyaId: string } }) {
  const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [districts, setDistricts] = useState<string[]>([])
  const [address, setAddress] = useState("")
  const [relationshipText, setRelationshipText] = useState("")
  const [experienceText, setExperienceText] = useState("")
  const [expertiseText, setExpertiseText] = useState("")

  const cities = getCities()

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    setDistricts(getDistricts(city))
  }

  const handlePrevClick = () => {
    const prevPage = getPreviousPage("kurulus")
    if (prevPage) {
      router.push(prevPage)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    const nextPage = getNextPage("kurulus")
    if (nextPage) {
      router.push(nextPage)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Kuruluş</h1>
          <p className="text-muted-foreground">Kurulacak şirket bilgileri</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kurulacak Şirket Hakkında</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Ünvan <span className="text-red-500">*</span>
                </Label>
                <Input id="title" aria-label="" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    İl <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={handleCityChange} required>
                    <SelectTrigger>
                      <SelectValue aria-label="İl seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">
                    İlçe <span className="text-red-500">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedCity ? "İlçe seçin" : "Önce il seçin"} />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adres</Label>
                <Input
                  id="address"
                  placeholder=""
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  maxLength={500}
                />
                <div className="text-sm text-muted-foreground text-right">{address.length} / 500</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capital">
                  Sermaye <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input id="capital" type="number" aria-label="" required className="pl-7" />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2">₺</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Fonlama Sonrası Kurucu Ortaklar</CardTitle>
            <InfoCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kurucu Ortak</CardTitle>
                <Button type="button" variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Ekle
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Adı Soyadı / Ticaret Unvanı</Label>
                  <Input aria-label="" />
                </div>

                <div className="space-y-2">
                  <Label>Görevi / Unvanı</Label>
                  <Input placeholder="" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mezun Olunan Okul/Üniversite</Label>
                    <Input placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label>Not Ortalaması</Label>
                    <Input type="number" step="0.01" placeholder="" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Özgeçmiş</Label>
                  <FileUpload
                    multiple={true}
                    onFileSelect={(file) => console.log(file)}
                    accept="application/pdf"
                  />

                </div>

                <div className="space-y-2">
                  <Label>Vatandaşı Olunan Ülkeler</Label>
                  <Input placeholder="" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Sermayedeki Pay Tutarı</Label>
                    <Input type="number" placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sermayedeki Pay Oranı</Label>
                    <Input type="number" placeholder="" />
                  </div>
                  <div className="space-y-2">
                    <Label>Oy Hakkı</Label>
                    <Input type="number" placeholder="" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>İmtiyazlar</Label>
                  <Input placeholder="" />
                </div>

                <div className="space-y-2">
                  <Label>Kampanya İle Olan İlişkisi</Label>
                  <Input
                    value={relationshipText}
                    onChange={(e) => setRelationshipText(e.target.value)}
                    maxLength={200}
                    placeholder=""
                  />
                  <div className="text-sm text-muted-foreground text-right">{relationshipText.length} / 200</div>
                </div>

                <div className="space-y-2">
                  <Label>İş Deneyimi</Label>
                  <Input
                    value={experienceText}
                    onChange={(e) => setExperienceText(e.target.value)}
                    maxLength={5000}
                    placeholder=""
                  />
                  <div className="text-sm text-muted-foreground text-right">{experienceText.length} / 5000</div>
                </div>

                <div className="space-y-2">
                  <Label>Uzmanlık Alanları</Label>
                  <Input
                    value={expertiseText}
                    onChange={(e) => setExpertiseText(e.target.value)}
                    maxLength={5000}
                    placeholder=""
                  />
                  <div className="text-sm text-muted-foreground text-right">{expertiseText.length} / 5000</div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-6">
          <Button type="button" variant="outline" size="lg" onClick={handlePrevClick}>
            <ChevronLeft className="w-4 h-4 ml-2" />
            Önceki Forma Dön
          </Button>
          <Button type="submit" size="lg">
            Kaydet ve İlerle
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </form>
  )
}

