"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigationHelpers } from "../utils/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Upload , HelpCircle } from "lucide-react"

interface AnalysisItem {
  id: string
  content: string
}
interface PopoverTooltipProps {
  content: string
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
interface AnalysisSection {
  items: AnalysisItem[]
}

export default function KampanyaAnalizPage({ params }: { params: { kampanyaId: string } }) {
const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()
  const currentPage = "analiz"

  const [sections, setSections] = useState<{
    strengths: AnalysisSection
    weaknesses: AnalysisSection
    opportunities: AnalysisSection
    threats: AnalysisSection
    weaknessStrategies: AnalysisSection
    threatStrategies: AnalysisSection
  }>({
    strengths: { items: [] },
    weaknesses: { items: [] },
    opportunities: { items: [] },
    threats: { items: [] },
    weaknessStrategies: { items: [] },
    threatStrategies: { items: [] },
  })

  const addItem = (sectionKey: keyof typeof sections) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        items: [...prev[sectionKey].items, { id: Math.random().toString(), content: "" }],
      },
    }))
  }

  const updateItem = (sectionKey: keyof typeof sections, itemId: string, content: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        items: prev[sectionKey].items.map((item) => (item.id === itemId ? { ...item, content } : item)),
      },
    }))
  }

  const removeItem = (sectionKey: keyof typeof sections, itemId: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        items: prev[sectionKey].items.filter((item) => item.id !== itemId),
      },
    }))
  }

  const [selectedFiles, setSelectedFiles] = useState<{
    swot: File | null
    businessPlan: File | null
    investorPresentation: File | null
  }>({
    swot: null,
    businessPlan: null,
    investorPresentation: null,
  })

  const handleFileSelect = (type: keyof typeof selectedFiles) => (file: File | null) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [type]: file,
    }))
  }
const handlePreviousPage = () => {
    const previousPage = getPreviousPage("analiz")
    if (previousPage) {
      router.push(previousPage)
    }
  }
  const handleNextPage = () => {
    const nextPage = getNextPage("analiz")
    if (nextPage) {
      router.push(nextPage)
    }
  }
  return (
  <form onSubmit={(e) => {
      e.preventDefault()
      handleNextPage()
    }}>
    <div className="space-y-8">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Analizler</CardTitle>
          <p className="text-sm text-muted-foreground">
            Bu bölümde projenin risklerini analiz edeceğiz. Potansiyel yatırımcıların bu bilgileri detaylı olarak görmek
            isteyecektir.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            Lütfen her başlık için en az 3 adet madde giriniz.
          </div>
        </CardHeader>
      </Card>

      {/* Güçlü Yönler */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>Ürünün/Projenin Güçlü Yönleri Nelerdir?</CardTitle>
            <PopoverTooltip content="Projenizin güçlü yönlerini ve avantajlarını belirtin" />
          </div>
          <Button  type="button" variant="outline" onClick={() => addItem("strengths")}>
            Yeni Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.strengths.items.map((item) => (
            <div key={item.id} className="flex gap-2">
              <Textarea
                value={item.content}
                onChange={(e) => updateItem("strengths", item.id, e.target.value)}
                placeholder="Güçlü yönü açıklayın..."
              />
              <Button variant="destructive" size="icon" onClick={() => removeItem("strengths", item.id)}>
                X
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Zayıf Yönler */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>Ürünün/Projenin Zayıf Yönleri Nelerdir?</CardTitle>
            <PopoverTooltip content="Projenizin zayıf yönlerini ve dezavantajlarını belirtin" />
          </div>
          <Button  type="button" variant="outline" onClick={() => addItem("weaknesses")}>
            Yeni Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.weaknesses.items.map((item) => (
            <div key={item.id} className="flex gap-2">
              <Textarea
                value={item.content}
                onChange={(e) => updateItem("weaknesses", item.id, e.target.value)}
                placeholder="Zayıf yönü açıklayın..."
              />
              <Button variant="destructive" size="icon" onClick={() => removeItem("weaknesses", item.id)}>
                X
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Fırsatlar */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>Ürünün/Projenin Ortaya Çıkardığı Fırsatlar Nelerdir?</CardTitle>
            <PopoverTooltip content="Projenizin yarattığı fırsatları ve potansiyel avantajlarını belirtin" />
          </div>
          <Button  type="button" variant="outline" onClick={() => addItem("opportunities")}>
            Yeni Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.opportunities.items.map((item) => (
            <div key={item.id} className="flex gap-2">
              <Textarea
                value={item.content}
                onChange={(e) => updateItem("opportunities", item.id, e.target.value)}
                placeholder="Fırsatı açıklayın..."
              />
              <Button variant="destructive" size="icon" onClick={() => removeItem("opportunities", item.id)}>
                X
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tehditler */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>Ürünün/Projenin Gerçekleşmesinde Olası Tehditler Nelerdir?</CardTitle>
            <PopoverTooltip content="Projenizi tehdit eden faktörleri ve riskleri belirtin" />
          </div>
          <Button  type="button" variant="outline" onClick={() => addItem("threats")}>
            Yeni Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.threats.items.map((item) => (
            <div key={item.id} className="flex gap-2">
              <Textarea
                value={item.content}
                onChange={(e) => updateItem("threats", item.id, e.target.value)}
                placeholder="Tehdidi açıklayın..."
              />
              <Button variant="destructive" size="icon" onClick={() => removeItem("threats", item.id)}>
                X
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Zayıf Yönleri Güçlendirme Stratejileri */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>Zayıf Yönleri Nasıl Güçlendireceksin?</CardTitle>
            <PopoverTooltip content="Zayıf yönleri güçlendirmek için planlanan stratejileri belirtin" />
          </div>
          <Button  type="button" variant="outline" onClick={() => addItem("weaknessStrategies")}>
            Yeni Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.weaknessStrategies.items.map((item) => (
            <div key={item.id} className="flex gap-2">
              <Textarea
                value={item.content}
                onChange={(e) => updateItem("weaknessStrategies", item.id, e.target.value)}
                placeholder="Stratejiyi açıklayın..."
              />
              <Button variant="destructive" size="icon" onClick={() => removeItem("weaknessStrategies", item.id)}>
                X
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tehditleri Ortadan Kaldırma Stratejileri */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>Tehditleri Nasıl Ortadan Kaldıracaksın?</CardTitle>
            <PopoverTooltip content="Tehditleri ortadan kaldırmak için planlanan stratejileri belirtin" />
          </div>
          <Button  type="button" variant="outline" onClick={() => addItem("threatStrategies")}>
            Yeni Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.threatStrategies.items.map((item) => (
            <div key={item.id} className="flex gap-2">
              <Textarea
                value={item.content}
                onChange={(e) => updateItem("threatStrategies", item.id, e.target.value)}
                placeholder="Stratejiyi açıklayın..."
              />
              <Button variant="destructive" size="icon" onClick={() => removeItem("threatStrategies", item.id)}>
                X
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dökümanlar */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>Dökümanlar</CardTitle>
            <PopoverTooltip content="SWOT analizi, iş planı ve yatırımcı sunumu dökümanlarını yükleyin" />
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>SWOT Analizi</Label>
            <div className="relative">
              <Input
                type="file"
                onChange={(e) => handleFileSelect("swot")(e.target.files?.[0] || null)}
                className="cursor-pointer opacity-0 absolute inset-0 z-10"
              />
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{selectedFiles.swot?.name || "Dosya Seç"}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>İş Planı</Label>
            <div className="relative">
              <Input
                type="file"
                onChange={(e) => handleFileSelect("businessPlan")(e.target.files?.[0] || null)}
                className="cursor-pointer opacity-0 absolute inset-0 z-10"
              />
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{selectedFiles.businessPlan?.name || "Dosya Seç"}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Yatırımcı Sunumu</Label>
            <div className="relative">
              <Input
                type="file"
                onChange={(e) => handleFileSelect("investorPresentation")(e.target.files?.[0] || null)}
                className="cursor-pointer opacity-0 absolute inset-0 z-10"
              />
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {selectedFiles.investorPresentation?.name || "Dosya Seç"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

   <div className="flex justify-between mt-6">
        <Button 
          type="button" 
          variant="outline" 
          size="lg" 
          onClick={handlePreviousPage}
        >
          Önceki Forma Dön
        </Button>
        <Button 
          type="submit" 
          size="lg"
        >
          Kaydet ve İlerle
        </Button>
      </div>
    </div>
    </form>
  )
}

