"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Briefcase,
  Gift,
  Users,
  Package,
  BarChart2,
  PieChart,
  AlertTriangle,
  DollarSign,
  Building,
  FileSpreadsheet,
  ImageIcon,
  File,
} from "lucide-react"

interface FormSection {
  id: string
  label: string
  icon: React.ElementType
  isComplete: boolean
  href: string
}

const formSections: FormSection[] = [
  { id: "profil", label: "Kampanya Profili", icon: Briefcase, isComplete: false, href: "profil" },
  { id: "belgeler", label: "Belge/Ödül/Hukuk", icon: Gift, isComplete: false, href: "belgeler" },
  { id: "takim", label: "Takım", icon: Users, isComplete: false, href: "takim" },
  { id: "urun", label: "Ürün/Üretim Modeli", icon: Package, isComplete: false, href: "urun" },
  { id: "market", label: "Pazar/Rekabet/Hedef", icon: BarChart2, isComplete: false, href: "market" },
  { id: "analiz", label: "Analizler", icon: PieChart, isComplete: false, href: "analiz" },
  { id: "riskler", label: "Riskler", icon: AlertTriangle, isComplete: false, href: "riskler" },
  { id: "fonlama", label: "Fonlama", icon: DollarSign, isComplete: false, href: "fonlama" },
  { id: "kurulus", label: "Kuruluş", icon: Building, isComplete: false, href: "kurulus" },
  { id: "finans", label: "Finansal Tablolar", icon: FileSpreadsheet, isComplete: false, href: "finans" },
  { id: "gorsel", label: "Görseller", icon: ImageIcon, isComplete: false, href: "gorsel" },
  { id: "diger-belgeler", label: "Diğer Belgeler", icon: File, isComplete: false, href: "diger-belgeler" }, // Added Diğer Belgeler
]

export default function KampanyaOnayPage({ params }: { params: { kampanyaId: string } }) {
  const router = useRouter()
  const [incompleteSections, setIncompleteSections] = useState<FormSection[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [accuracyAccepted, setAccuracyAccepted] = useState(false)

  // Simulating form validation check
  useEffect(() => {
    // In a real application, this would check the actual form data
    const sectionsToValidate = formSections.map((section) => ({
      ...section,
      isComplete: Math.random() > 0.5, // Randomly marking sections as complete/incomplete for demo
    }))

    setIncompleteSections(sectionsToValidate.filter((section) => !section.isComplete))
  }, [])

  const handleSectionClick = (href: string) => {
    router.push(`/kampanya/${params.kampanyaId}/kayit/${href}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (incompleteSections.length > 0) {
      return // Don't allow submission if there are incomplete sections
    }
    if (!termsAccepted || !privacyAccepted || !accuracyAccepted) {
      return // Don't allow submission if terms are not accepted
    }
    // Handle form submission
    router.push(`/kampanya/${params.kampanyaId}/kayit/onizleme`)
  }

  return (
    <div className="space-y-6">
      {incompleteSections.length > 0 && (
        <Alert className="bg-red-50 border-red-200 text-red-800">
          <AlertDescription>
            Onaya göndermek için aşağıda belirtilen formların zorunlu alanlarını doldurmanız gerekmektedir.
          </AlertDescription>
        </Alert>
      )}

      {incompleteSections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tamamlanmamış Bölümler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {incompleteSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.href)}
                className="w-full p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg flex items-center gap-3 text-left transition-colors"
              >
                <section.icon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">{section.label}</span>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {incompleteSections.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Kampanya Onayı</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="termsAndConditions"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <Label htmlFor="termsAndConditions">Kullanım şartlarını ve koşullarını kabul ediyorum</Label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacyPolicy"
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                  />
                  <Label htmlFor="privacyPolicy">Gizlilik politikasını kabul ediyorum</Label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="informationAccuracy"
                    checked={accuracyAccepted}
                    onCheckedChange={(checked) => setAccuracyAccepted(checked as boolean)}
                  />
                  <Label htmlFor="informationAccuracy">
                    Verdiğim tüm bilgilerin doğru ve eksiksiz olduğunu onaylıyorum
                  </Label>
                </div>
              </div>
              <Button type="submit" disabled={!termsAccepted || !privacyAccepted || !accuracyAccepted}>
                Kampanyayı Onayla ve Gönder
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

