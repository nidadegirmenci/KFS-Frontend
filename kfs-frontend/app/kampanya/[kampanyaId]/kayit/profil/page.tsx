"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { TextEditor } from "@/app/components/ui/text-editor"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Switch } from "@/app/components/ui/switch"
import { ChevronRight, Upload, Plus, HelpCircle, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { Badge } from "@/app/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/app/components/ui/command"
import { useRouter ,useParams } from "next/navigation"
import { useNavigationHelpers } from "../utils/navigation"
import { cities, type City } from "./cities"
import "./styles/custom-inputs.css"

interface PopoverTooltipProps {
  content: string | React.ReactNode
  className?: string
}

function PopoverTooltip({ content, className }: PopoverTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <HelpCircle className={`h-4 w-4 text-blue-500 cursor-pointer ${className}`} />
      </PopoverTrigger>
      <PopoverContent className="w-80 text-sm">{content}</PopoverContent>
    </Popover>
  )
}

const MAX_DESCRIPTION_LENGTH = 25000
const MAX_SUMMARY_LENGTH = 250
const MAX_SCOPE_LENGTH = 250
const MAX_SCOPE_DETAIL_LENGTH = 20000

export default function KampanyaProfilPage() {
  const router = useRouter()
  const { getNextPage } = useNavigationHelpers()
  const [logo, setLogo] = useState<string | null>(null)
  const [hasPreviousCampaign, setHasPreviousCampaign] = useState(false)
  const [description, setDescription] = useState("")
  const [summary, setSummary] = useState("")
  const [scope, setScope] = useState("")
  const [scopeDetail, setScopeDetail] = useState("")
  const [locations, setLocations] = useState("")
  const [categories, setCategories] = useState("")
  const [businessModels, setBusinessModels] = useState("")
  const [sectors, setSectors] = useState("")
  const [selectedLocations, setSelectedLocations] = useState<City[]>([])
  const [participants, setParticipants] = useState<Array<{ id: string; email: string }>>([])
  const [email, setEmail] = useState("")
  const params = useParams<{ kampanyaId: string }>() // useParams kullanımı
  const kampanyaId = params?.kampanyaId || "" 

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoDelete = () => {
    setLogo(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Include selectedLocations in your form data
    const formData = {
      // ... other form fields
      locations: selectedLocations.map((city) => city.id),
    }
    // Submit the form data
    console.log(formData)
  }

  const handleAddParticipant = (email: string) => {
    setParticipants([...participants, { id: Date.now().toString(), email }])
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sol Kolon - Girişim ve Kampanya Adı */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="companyName">Girişimin Adı</Label>
                    <span className="text-destructive">*</span>
                    <PopoverTooltip content="Girişiminizin resmi adını giriniz" />
                  </div>
                  <Input id="companyName" placeholder="" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="campaignName">Kampanyanın Adı</Label>
                    <span className="text-destructive">*</span>
                    <PopoverTooltip content="Burada yer alan kampanya adı tanıtımlarda kullanılacaktır. Lütfen kampanyanız için kısa ve etkileyici bir ad yazınız." />
                  </div>
                  <Input id="campaignName" placeholder="" />
                </div>
              </div>

              {/* Sağ Kolon - Logo Yükleme */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Kampanya Logosu</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="En az 500x500 piksel boyutunda logo yükleyiniz" />
                </div>
                <div
                  className="file-upload-area h-full min-h-[200px] relative"
                  onClick={() => document.getElementById("logo-upload")?.click()}
                >
                  <input type="file" id="logo-upload" hidden accept="image/*" onChange={handleLogoUpload} />
                  {logo ? (
                    <>
                      <img
                        src={logo || "/placeholder.svg"}
                        alt="Logo önizleme"
                        className="file-preview max-h-[180px] object-contain"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLogoDelete()
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Upload className="h-8 w-8" />
                      <span>Logo yüklemek için tıklayın veya sürükleyin</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="summary">Kampanyayı Bir Cümle İle Anlat</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Kampanyanızı kısa ve öz bir şekilde açıklayın" />
                </div>
                <Input
                  id="summary"
                  placeholder=""
                  value={summary}
                  onChange={(e) => setSummary(e.target.value.slice(0, MAX_SUMMARY_LENGTH))}
                  maxLength={MAX_SUMMARY_LENGTH}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Proje Detayları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Moved Proje Hakkında section to the top */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Proje Hakkında</Label>
                      <span className="text-destructive">*</span>
                      <PopoverTooltip content="Projenizi detaylı bir şekilde anlatın" />
                    </div>

                    <TextEditor
                      value={description}
                      onChange={(newValue) => setDescription(newValue.slice(0, MAX_DESCRIPTION_LENGTH))}
                      maxLength={MAX_DESCRIPTION_LENGTH}
                    />


                  </div>

                  {/* Kapsam Amaç ve Konusu (Özet) */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="scope">Kapsam Amaç ve Konusu (Özet)</Label>
                      <span className="text-destructive">*</span>
                      <PopoverTooltip content="Projenizin kapsamını, amacını ve konusunu özetleyin" />
                    </div>
                    <TextEditor
                      value={scope}
                      onChange={(newValue) => setScope(newValue.slice(0, MAX_SCOPE_LENGTH))}
                      maxLength={MAX_SCOPE_LENGTH}
                    />

                  </div>

                  {/* Projenin Kapsam, Amaç ve Konusu */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Projenin Kapsam, Amaç ve Konusu</Label>
                      <span className="text-destructive">*</span>
                      <PopoverTooltip content="Projenizin kapsamını, amacını ve konusunu detaylı olarak açıklayın" />
                    </div>
                    <TextEditor
                      value={scopeDetail}
                      onChange={(newValue) => setScopeDetail(newValue.slice(0, MAX_SCOPE_DETAIL_LENGTH))}
                      maxLength={MAX_SCOPE_DETAIL_LENGTH}
                    />

                  </div>

                  {/* Girişimin Aşaması */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Girişimin Aşaması</Label>
                      <span className="text-destructive">*</span>
                      <PopoverTooltip content="Girişiminizin mevcut durumunu seçin" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prototype-dev">Prototip Geliştirme</SelectItem>
                        <SelectItem value="validated-prototype">Doğrulanmış Prototip</SelectItem>
                        <SelectItem value="ready-to-market">Ticarileşmeye Hazır Ürün</SelectItem>
                        <SelectItem value="market-entry">Pazara Giriş</SelectItem>
                        <SelectItem value="growth">Büyüme</SelectItem>
                        <SelectItem value="series-a">Seri A Yatırım</SelectItem>
                        <SelectItem value="series-b">Seri B Yatırım</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Girişimin Lokasyonları */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Girişimin Lokasyonları</Label>
                      <span className="text-destructive">*</span>
                      <PopoverTooltip content="Girişiminizin faaliyet gösterdiği lokasyonları seçin" />
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          {selectedLocations.length > 0
                            ? selectedLocations.map((city) => city.name).join(", ")
                            : "Lokasyon seçin"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Lokasyon ara..." />
                          <CommandList>
                            <CommandEmpty>Lokasyon bulunamadı.</CommandEmpty>
                            <CommandGroup>
                              {cities.map((city) => (
                                <CommandItem
                                  key={city.id}
                                  onSelect={() => {
                                    setSelectedLocations((current) =>
                                      current.some((loc) => loc.id === city.id)
                                        ? current.filter((loc) => loc.id !== city.id)
                                        : [...current, city],
                                    )
                                  }}
                                >
                                  {city.name}
                                  <Badge
                                    variant={
                                      selectedLocations.some((loc) => loc.id === city.id) ? "default" : "outline"
                                    }
                                    className="ml-auto"
                                  >
                                    {selectedLocations.some((loc) => loc.id === city.id) ? "Seçildi" : "Seç"}
                                  </Badge>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedLocations.map((city) => (
                        <Badge key={city.id} variant="secondary">
                          {city.name}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 ml-2"
                            onClick={() =>
                              setSelectedLocations((current) => current.filter((loc) => loc.id !== city.id))
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Ana Kategoriler ve İş Modelleri */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Girişimin Ana Kategorileri</Label>
                        <span className="text-destructive">*</span>
                        <PopoverTooltip content="Girişiminizin ana kategorilerini seçin" />
                      </div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Teknoloji</SelectItem>
                          <SelectItem value="health">Sağlık</SelectItem>
                          <SelectItem value="education">Eğitim</SelectItem>
                          <SelectItem value="finance">Finans</SelectItem>
                          <SelectItem value="retail">Perakende</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Girişimin İş Modelleri</Label>
                        <span className="text-destructive">*</span>
                        <PopoverTooltip content="Girişiminizin iş modellerini seçin" />
                      </div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="b2b">B2B</SelectItem>
                          <SelectItem value="b2c">B2C</SelectItem>
                          <SelectItem value="b2b2c">B2B2C</SelectItem>
                          <SelectItem value="c2c">C2C</SelectItem>
                          <SelectItem value="saas">SaaS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Girişimin Sektörleri */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Girişimin Sektörleri</Label>
                      <span className="text-destructive">*</span>
                      <PopoverTooltip content="Girişiminizin faaliyet gösterdiği sektörleri seçin" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Yazılım</SelectItem>
                        <SelectItem value="hardware">Donanım</SelectItem>
                        <SelectItem value="biotech">Biyoteknoloji</SelectItem>
                        <SelectItem value="ai">Yapay Zeka</SelectItem>
                        <SelectItem value="mobile">Mobil Teknolojiler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Katılımcı Girişimciler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg text-sm">
              Kampanya onaya gönderildiğinde ilgili katılımcılara bilgilendirme maili gönderilecektir.
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Katılımcı Girişimci</h3>
              </div>
              <div className="flex gap-2">
                <Input
                  aria-label="Fonbulucu'da kayıtlı mail adresi"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (email) {
                      handleAddParticipant(email)
                      setEmail("")
                    }
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ekle
                </Button>
              </div>
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-2">
                  <Input value={participant.email} disabled />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setParticipants(participants.filter((p) => p.id !== participant.id))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geçmiş Kampanyalar Hakkında Bilgiler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch id="previous-campaign" checked={hasPreviousCampaign} onCheckedChange={setHasPreviousCampaign} />
              <Label htmlFor="previous-campaign">Daha önce paya dayalı kitle fonlaması kampanyası yapıldı mı?</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Kaydet ve İlerle
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </form>
  )
}

