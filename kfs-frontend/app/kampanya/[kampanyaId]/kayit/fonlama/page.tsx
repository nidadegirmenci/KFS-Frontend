"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { TextEditor } from "@/app/components/ui/text-editor"
import { Switch } from "@/app/components/ui/switch"
import { FileUpload } from "@/app/components/ui/file-upload"
import { Info , Trash2 , ChevronLeft, ChevronRight} from "lucide-react"
import { useRouter } from "next/navigation"
import { useNavigationHelpers } from "../utils/navigation"

interface FundUsage {
  description: string
  startDate: string
  endDate: string
  amount: number
}

interface AdditionalFunding {
  description: string
  date: string
  amount: number
}

export default function KampanyaFonlamaPage() {
  const router = useRouter()
  const { getNextPage, getPreviousPage } = useNavigationHelpers()
  const [fundUsages, setFundUsages] = useState<FundUsage[]>([])
  const [additionalFundings, setAdditionalFundings] = useState<AdditionalFunding[]>([])
  const [extraFunding, setExtraFunding] = useState(false)
  const [ownershipComparison, setOwnershipComparison] = useState("")
  const [generalRationale, setGeneralRationale] = useState("")

  const addFundUsage = () => {
    setFundUsages([...fundUsages, { description: "", startDate: "", endDate: "", amount: 0 }])
  }
  const removeFundUsage = (index: number) => {
    setFundUsages(fundUsages.filter((_, i) => i !== index))
  }

  const addAdditionalFunding = () => {
    setAdditionalFundings([...additionalFundings, { description: "", date: "", amount: 0 }])
  }
  const removeAdditionalFunding = (index: number) => {
    setAdditionalFundings(additionalFundings.filter((_, i) => i !== index))
  }
  const handlePrevClick = () => {
    const prevPage = getPreviousPage("fonlama")
    if (prevPage) {
      router.push(prevPage)
    }
  }

  const handleSubmit = () => {
    // Burada form verileri kaydedilebilir
    console.log({ fundUsages, additionalFundings, extraFunding, ownershipComparison, generalRationale })
    
    const nextPage = getNextPage("fonlama")
    if (nextPage) {
      router.push(nextPage)
    }
  }


  return (
    <div className="space-y-8">
      {/* Warning Message */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-sm">
          Platformumuzda çıkarılan her bir pay için <strong>1 TL</strong> sabit değer olarak alınır. Bir Girişimci bir
          yıl içerisinde iki kampanya yapabilir ve bu kampanyalarda talep edilen fon tutarı
          <strong>2024</strong> yılı için <strong>75.000.000 TL</strong>
          {"'"}den fazla olamaz.
        </p>
      </div>

      {/* Main Funding Details */}
      <Card>
        <CardHeader>
          <CardTitle>Fonlama</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ventureValue">
                Girişimin Değeri Nedir? <span className="text-red-500">*</span>
              </Label>
              <Input id="ventureValue" type="number" aria-label="Girişimin değerini girin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fundingNeeded">
                Girişimin İçin ne Kadar Fona ihtiyacın Var? <span className="text-red-500">*</span>
              </Label>
              <Input id="fundingNeeded" type="number" aria-label="İhtiyaç duyulan fon miktarını girin" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fundPeriod">
                Fon Kullanım Süresi (Ay) <span className="text-red-500">*</span>
              </Label>
              <Input id="fundPeriod" type="number" aria-label="Ay olarak süreyi girin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="equityOffered">
                Bu Fon için % Kaç Hisse Vermek İstiyorsun? <span className="text-red-500">*</span>
              </Label>
              <Input id="equityOffered" type="number" aria-label="Hisse yüzdesini girin" />
            </div>
          </div>
          <div className="col-span-full">
            <Label>Değerleme Raporu</Label>
            <FileUpload onFileSelect={(file) => console.log(file)} />
          </div>
        </CardContent>
      </Card>

      {/* Post-Campaign Values */}
      <Card>
        <CardHeader>
          <CardTitle>Kampanya Sonrası Oluşan Değerler</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Toplam Satışa Sunulan Pay Adedi</Label>
            <p className="text-2xl font-semibold">0</p>
          </div>
          <div className="space-y-2">
            <Label>Fonlama Sonrası Sermaye</Label>
            <p className="text-2xl font-semibold">₺0</p>
          </div>
          <div className="space-y-2">
            <Label>Payların Birim Satış Fiyatı</Label>
            <p className="text-2xl font-semibold">₺0</p>
          </div>
          <div className="space-y-2">
            <Label>Payların Birim Nominal Değeri</Label>
            <p className="text-2xl font-semibold">0</p>
          </div>
          <div className="col-span-full flex items-center space-x-2">
            <Switch id="extraFunding" checked={extraFunding} onCheckedChange={setExtraFunding} />
            <Label htmlFor="extraFunding">%20{"'"}ye Kadar Ek Fonlama Yapmak İstiyor musunuz?</Label>
          </div>
        </CardContent>
      </Card>

      {/* Fund Usage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Topladığın Fonu Nerelerde Kullanacaksın?</CardTitle>
          <Button variant="outline" size="sm" onClick={addFundUsage}>
            Yeni Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {fundUsages.map((usage, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Açıklama</Label>
                <Input
                  value={usage.description}
                  onChange={(e) => {
                    const newUsages = [...fundUsages]
                    newUsages[index].description = e.target.value
                    setFundUsages(newUsages)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Kullanım Tarihi</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={usage.startDate}
                    onChange={(e) => {
                      const newUsages = [...fundUsages]
                      newUsages[index].startDate = e.target.value
                      setFundUsages(newUsages)
                    }}
                  />
                  <Input
                    type="date"
                    value={usage.endDate}
                    onChange={(e) => {
                      const newUsages = [...fundUsages]
                      newUsages[index].endDate = e.target.value
                      setFundUsages(newUsages)
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tutar</Label>
                <Input
                  type="number"
                  value={usage.amount}
                  onChange={(e) => {
                    const newUsages = [...fundUsages]
                    newUsages[index].amount = Number(e.target.value)
                    setFundUsages(newUsages)
                  }}
                />
              </div>
              <Button className="absolute right-1 p-1" variant="destructive" size="icon" onClick={() => removeFundUsage(index)}>
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Funding Sources */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ek Finansman Kaynakları</CardTitle>
          <Button variant="outline" size="sm" onClick={addAdditionalFunding}>
            Yeni Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {additionalFundings.map((funding, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Açıklama</Label>
                <Input
                  value={funding.description}
                  onChange={(e) => {
                    const newFundings = [...additionalFundings]
                    newFundings[index].description = e.target.value
                    setAdditionalFundings(newFundings)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Fon Temin Tarihi</Label>
                <Input
                  type="date"
                  value={funding.date}
                  onChange={(e) => {
                    const newFundings = [...additionalFundings]
                    newFundings[index].date = e.target.value
                    setAdditionalFundings(newFundings)
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Tutar</Label>
                <Input
                  type="number"
                  value={funding.amount}
                  onChange={(e) => {
                    const newFundings = [...additionalFundings]
                    newFundings[index].amount = Number(e.target.value)
                    setAdditionalFundings(newFundings)
                  }}
                />
              </div>
              <Button className="absolute right-1 p-1 mt-5" variant="destructive" size="icon" onClick={() => removeAdditionalFunding(index)}>
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Ownership Structure Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle>Mevcut ile Fonlama Sonrası Ortaklık Yapısının Karşılaştırılması</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <TextEditor value={ownershipComparison} onChange={setOwnershipComparison} maxLength={10000} />
        </CardContent>
      </Card>

      {/* General Rationale */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle>Genel Gerekçe ve Temel Bilgiler</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Kitle fonlaması kampanyası yürütülmesinin ve paya dayalı modelin seçilmesinin gerekçeleri ile girişim
                şirketini bu finansman yöntemine sevk eden motivasyon unsurları hakkında açıklama yapılacaktır.
              </li>
              <li>
                Diğer çeşitli dış finansman kaynaklarından fon temin edilememiş olması halinde bu durum gerekçeleriyle
                birlikte ayrıca belirtilecektir.
              </li>
              <li>
                Ek olarak, kampanya süresi, varsa ek fon toplama dahil hedeflenen fon tutarı, kampanyanın başarılı bir
                şekilde sonuçlanması halinde ortaya konulacak ürün ve hizmetler ile girişim şirketi, ilişkili tarafları
                ve diğer üçüncü kişilerce elde edilecek menfaatler hakkında bilgilere yer verilecektir.
              </li>
            </ul>
          </div>
          <TextEditor value={generalRationale} onChange={setGeneralRationale} maxLength={5000} />
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevClick}>
        <ChevronLeft className="w-4 h-4 ml-2" />
          Önceki Forma Dön
        </Button>
        <Button onClick={handleSubmit}>Kaydet ve İlerle
        <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

