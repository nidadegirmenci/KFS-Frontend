"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { PopoverTooltip } from "@/app/components/ui/popover-tooltip"
import { Bold, Italic, Underline, Heading, List, ListOrdered, Plus, Upload, X } from "lucide-react"
import { useNavigationHelpers } from "../utils/navigation"

interface CustomTopic {
  id: string
  title: string
  description: string
  file: File | null
}


export default function UrunPage() {
  const router = useRouter()
  const { getPreviousPage , getNextPage } = useNavigationHelpers()
  // Product/Project Section
  const [shortDescription, setShortDescription] = useState("")
  const [productDetails, setProductDetails] = useState("")
  const [problemIdentification, setProblemIdentification] = useState("")
  const [solution, setSolution] = useState("")
  const [valueProposition, setValueProposition] = useState("")

  // Process Section
  const [developmentProcess, setDevelopmentProcess] = useState("")
  const [productionProcess, setProductionProcess] = useState("")
  const [byProducts, setByProducts] = useState("")
  const [technicalAnalysis, setTechnicalAnalysis] = useState("")
  const [rdActivities, setRdActivities] = useState("")
  const [previousSales, setPreviousSales] = useState("")

  // Document Files
  const [productDetailDoc, setProductDetailDoc] = useState<File | null>(null)
  const [developmentProcessDoc, setDevelopmentProcessDoc] = useState<File | null>(null)
  const [productionProcessDoc, setProductionProcessDoc] = useState<File | null>(null)
  const [byProductsDoc, setByProductsDoc] = useState<File | null>(null)
  const [technicalAnalysisDoc, setTechnicalAnalysisDoc] = useState<File | null>(null)
  const [rdActivitiesDoc, setRdActivitiesDoc] = useState<File | null>(null)
  const [previousSalesDoc, setPreviousSalesDoc] = useState<File | null>(null)

  // Custom Topics
  const [customTopics, setCustomTopics] = useState<CustomTopic[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, topicId: string) => {
    const file = e.target.files?.[0] || null
    setCustomTopics(customTopics.map((topic) => (topic.id === topicId ? { ...topic, file } : topic)))
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, setDocument: (file: File | null) => void) => {
    const file = e.target.files?.[0] || null
    setDocument(file)
  }

  const removeDocument = (setDocument: (file: File | null) => void) => {
    setDocument(null)
  }

  const addCustomTopic = () => {
    const newTopic: CustomTopic = {
      id: Date.now().toString(),
      title: "",
      description: "",
      file: null,
    }
    setCustomTopics([...customTopics, newTopic])
  }

  const removeCustomTopic = (id: string) => {
    setCustomTopics(customTopics.filter((topic) => topic.id !== id))
  }

  const handleCustomTopicChange = (id: string, field: keyof CustomTopic, value: any) => {
    setCustomTopics(customTopics.map((topic) => (topic.id === id ? { ...topic, [field]: value } : topic)))
  }

  const handlePreviousPage = () => {
    const previousPage = getPreviousPage("urun")
    if (previousPage) {
      router.push(previousPage)
    }
  }
  const handleNextPage = () => {
    const nextPage = getNextPage("urun")
    if (nextPage) {
      router.push(nextPage)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Prepare data for submission
    const formData = new FormData()
    formData.append("shortDescription", shortDescription)
    formData.append("productDetails", productDetails)
    formData.append("problemIdentification", problemIdentification)
    formData.append("solution", solution)
    formData.append("valueProposition", valueProposition)
    formData.append("developmentProcess", developmentProcess)
    formData.append("productionProcess", productionProcess)
    formData.append("byProducts", byProducts)
    formData.append("technicalAnalysis", technicalAnalysis)
    formData.append("rdActivities", rdActivities)
    formData.append("previousSales", previousSales)

    if (productDetailDoc) formData.append("productDetailDoc", productDetailDoc)
    if (developmentProcessDoc) formData.append("developmentProcessDoc", developmentProcessDoc)
    if (productionProcessDoc) formData.append("productionProcessDoc", productionProcessDoc)
    if (byProductsDoc) formData.append("byProductsDoc", byProductsDoc)
    if (technicalAnalysisDoc) formData.append("technicalAnalysisDoc", technicalAnalysisDoc)
    if (rdActivitiesDoc) formData.append("rdActivitiesDoc", rdActivitiesDoc)
    if (previousSalesDoc) formData.append("previousSalesDoc", previousSalesDoc)

    customTopics.forEach((topic) => {
      formData.append(`customTopicTitle-${topic.id}`, topic.title)
      formData.append(`customTopicDescription-${topic.id}`, topic.description)
      if (topic.file) formData.append(`customTopicFile-${topic.id}`, topic.file)
    })

    try {
      const response = await fetch("/api/kampanya/urun", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        // Handle error
        console.error("Error submitting form:", response.status)
        // Display error message to the user
        // ...
      } else {
        // Navigate to the next page
        router.push("/kampanya/[kampanyaId]/kayit/onay")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      // Display error message to the user
      // ...
    }
  }

  return (
   <form onSubmit={(e) => {
      e.preventDefault()
      handleNextPage()
    }}>
      <div className="space-y-6">
        {/* Product/Project Information */}
        <Card>
          <CardHeader>
            <CardTitle>Ürün/Proje Hakkında</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Short Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Ürün ve Teknoloji (Kısa Özeti)</Label>
                <span className="text-destructive">*</span>
                <PopoverTooltip content="Ürününüzü ve kullandığınız teknolojiyi kısaca özetleyin" />
              </div>
              <Textarea
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value.slice(0, 250))}
                className="resize-none"
                placeholder="Kısa özet girin..."
              />
              <div className="text-sm text-muted-foreground text-right">{shortDescription.length} / 250</div>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Ürün/Proje Hakkında</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Ürün veya projeniz hakkında detaylı bilgi verin" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={productDetails}
                    onChange={(e) => setProductDetails(e.target.value.slice(0, 6000))}
                    className="border-0 focus-visible:ring-0 min-h-[200px]"
                    placeholder="Detaylı açıklama girin..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{productDetails.length} / 6000</div>
              </div>
              <div className="min-w-[200px] space-y-2">
                <Label className="text-sm text-muted-foreground">İlgili Döküman</Label>
                <Input
                  type="file"
                  onChange={(e) => handleDocumentUpload(e, setProductDetailDoc)}
                  className="hidden"
                  id="product-detail-doc"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("product-detail-doc")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {productDetailDoc ? productDetailDoc.name : "Dosya Seç"}
                  </Button>
                  {productDetailDoc && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(setProductDetailDoc)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Problem Identification */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Tespit Ettiğin Sorun</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Çözmeye çalıştığınız problemi açıklayın" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={problemIdentification}
                    onChange={(e) => setProblemIdentification(e.target.value.slice(0, 6000))}
                    className="border-0 focus-visible:ring-0"
                    placeholder="Sorunu açıklayın..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{problemIdentification.length} / 6000</div>
              </div>
            </div>

            {/* Solution */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Bulduğun Çözümün</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Geliştirdiğiniz çözümü açıklayın" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={solution}
                    onChange={(e) => setSolution(e.target.value.slice(0, 6000))}
                    className="border-0 focus-visible:ring-0"
                    placeholder="Çözümü açıklayın..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{solution.length} / 6000</div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Değer Önerilerin</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Ürün veya projenizin değer önerilerini açıklayın" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={valueProposition}
                    onChange={(e) => setValueProposition(e.target.value.slice(0, 6000))}
                    className="border-0 focus-visible:ring-0"
                    placeholder="Değer önerilerini açıklayın..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{valueProposition.length} / 6000</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Süreçler Hakkında</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Development Process */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Ürünün/Projenin Gelişim Süreçleri Hakkında Özet Bilgi</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Gelişim süreçlerini özetleyin" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={developmentProcess}
                    onChange={(e) => setDevelopmentProcess(e.target.value.slice(0, 4000))}
                    className="border-0 focus-visible:ring-0"
                    placeholder="Gelişim süreçlerini açıklayın..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{developmentProcess.length} / 4000</div>
              </div>
              <div className="min-w-[200px] space-y-2">
                <Label className="text-sm text-muted-foreground">İlgili Döküman</Label>
                <Input
                  type="file"
                  onChange={(e) => handleDocumentUpload(e, setDevelopmentProcessDoc)}
                  className="hidden"
                  id="development-process-doc"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("development-process-doc")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {developmentProcessDoc ? developmentProcessDoc.name : "Dosya Seç"}
                  </Button>
                  {developmentProcessDoc && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(setDevelopmentProcessDoc)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Production Process */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Ürünün/Projenin Üretim Süreçleri Hakkında Özet Bilgi</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Üretim süreçlerini özetleyin" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={productionProcess}
                    onChange={(e) => setProductionProcess(e.target.value.slice(0, 4000))}
                    className="border-0 focus-visible:ring-0"
                    placeholder="Üretim süreçlerini açıklayın..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{productionProcess.length} / 4000</div>
              </div>
              <div className="min-w-[200px] space-y-2">
                <Label className="text-sm text-muted-foreground">İlgili Döküman</Label>
                <Input
                  type="file"
                  onChange={(e) => handleDocumentUpload(e, setProductionProcessDoc)}
                  className="hidden"
                  id="production-process-doc"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("production-process-doc")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {productionProcessDoc ? productionProcessDoc.name : "Dosya Seç"}
                  </Button>
                  {productionProcessDoc && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(setProductionProcessDoc)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* By-Products */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Ortaya Çıkabilecek Yan Ürünler Hakkında Özet Bilgi</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Olası yan ürünleri açıklayın" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={byProducts}
                    onChange={(e) => setByProducts(e.target.value.slice(0, 4000))}
                    className="border-0 focus-visible:ring-0"
                    placeholder="Yan ürünleri açıklayın..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{byProducts.length} / 4000</div>
              </div>
              <div className="min-w-[200px] space-y-2">
                <Label className="text-sm text-muted-foreground">İlgili Döküman</Label>
                <Input
                  type="file"
                  onChange={(e) => handleDocumentUpload(e, setByProductsDoc)}
                  className="hidden"
                  id="by-products-doc"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("by-products-doc")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {byProductsDoc ? byProductsDoc.name : "Dosya Seç"}
                  </Button>
                  {byProductsDoc && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(setByProductsDoc)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Technical Analysis */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Teknik ve Tasarımsal Analizler Hakkında Özet Bilgi</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Teknik ve tasarımsal analizleri özetleyin" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={technicalAnalysis}
                    onChange={(e) => setTechnicalAnalysis(e.target.value.slice(0, 4000))}
                    className="border-0 focus-visible:ring-0"
                    placeholder="Teknik ve tasarımsal analizleri açıklayın..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{technicalAnalysis.length} / 4000</div>
              </div>
              <div className="min-w-[200px] space-y-2">
                <Label className="text-sm text-muted-foreground">İlgili Döküman</Label>
                <Input
                  type="file"
                  onChange={(e) => handleDocumentUpload(e, setTechnicalAnalysisDoc)}
                  className="hidden"
                  id="technical-analysis-doc"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("technical-analysis-doc")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {technicalAnalysisDoc ? technicalAnalysisDoc.name : "Dosya Seç"}
                  </Button>
                  {technicalAnalysisDoc && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(setTechnicalAnalysisDoc)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* R&D Activities */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>AR-GE Faaliyetleri Hakkında Özet Bilgi</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="AR-GE faaliyetlerini özetleyin" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={rdActivities}
                    onChange={(e) => setRdActivities(e.target.value.slice(0, 4000))}
                    className="border-0 focus-visible:ring-0"
                    placeholder="AR-GE faaliyetlerini açıklayın..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{rdActivities.length} / 4000</div>
              </div>
              <div className="min-w-[200px] space-y-2">
                <Label className="text-sm text-muted-foreground">İlgili Doküman</Label>
                <Input
                  type="file"
                  onChange={(e) => handleDocumentUpload(e, setRdActivitiesDoc)}
                  className="hidden"
                  id="rd-activities-doc"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("rd-activities-doc")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {rdActivitiesDoc ? rdActivitiesDoc.name : "Dosya Seç"}
                  </Button>
                  {rdActivitiesDoc && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(setRdActivitiesDoc)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Previous Sales */}
            <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Önceki Satışlar Hakkında Özet Bilgi</Label>
                  <span className="text-destructive">*</span>
                  <PopoverTooltip content="Önceki satışları özetleyin" />
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heading className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={previousSales}
                    onChange={(e) => setPreviousSales(e.target.value.slice(0, 4000))}
                    className="border-0 focus-visible:ring-0"
                    placeholder="Önceki satışları açıklayın..."
                  />
                </div>
                <div className="text-sm text-muted-foreground text-right">{previousSales.length} / 4000</div>
              </div>
              <div className="min-w-[200px] space-y-2">
                <Label className="text-sm text-muted-foreground">İlgili Döküman</Label>
                <Input
                  type="file"
                  onChange={(e) => handleDocumentUpload(e, setPreviousSalesDoc)}
                  className="hidden"
                  id="previous-sales-doc"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("previous-sales-doc")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {previousSalesDoc ? previousSalesDoc.name : "Dosya Seç"}
                  </Button>
                  {previousSalesDoc && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(setPreviousSalesDoc)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Topics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>Ürün/Proje ile İlgili Belirtmek İstediğiniz Diğer Konular</CardTitle>
                <PopoverTooltip content="Ürün veya projeniz ile ilgili eklemek istediğiniz diğer konuları buraya ekleyebilirsiniz." />
              </div>
            <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          
          <Button type="button" onClick={addCustomTopic} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Ekle
          </Button>
        </div>
      </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {customTopics.map((topic) => (
              <Card key={topic.id}>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`topic-${topic.id}`}>Konu</Label>
                      <Input
                        id={`topic-${topic.id}`}
                        value={topic.title}
                        onChange={(e) => handleCustomTopicChange(topic.id, "title", e.target.value)}
                        placeholder="Konu başlığını girin..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`description-${topic.id}`}>Açıklama</Label>
                      <div className="border rounded-md">
                        <div className="flex items-center gap-1 p-2 border-b bg-muted/50">
                          <Button variant="ghost" size="sm">
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Underline className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Heading className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <List className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ListOrdered className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          id={`description-${topic.id}`}
                          value={topic.description}
                          onChange={(e) =>
                            handleCustomTopicChange(topic.id, "description", e.target.value.slice(0, 2000))
                          }
                          className="border-0 focus-visible:ring-0 min-h-[200px]"
                          placeholder="Açıklama girin..."
                        />
                        <div className="p-2 text-sm text-muted-foreground text-right border-t bg-muted/50">
                          {topic.description.length} / 2000
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Label className="text-sm text-muted-foreground">İlgili Belge</Label>
                        <Input
                          type="file"
                          onChange={(e) => handleFileUpload(e, topic.id)}
                          className="hidden"
                          id={`file-${topic.id}`}
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById(`file-${topic.id}`)?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {topic.file ? topic.file.name : "Dosya Seç"}
                          </Button>
                          {topic.file && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCustomTopicChange(topic.id, "file", null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => removeCustomTopic(topic.id)}>
                        <X className="h-4 w-4 mr-2" />
                        Konuyu Kaldır
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {customTopics.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                Henüz ek konu eklenmemiş. Yeni bir konu eklemek için "Yeni Ekle" butonunu kullanın.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button type="button" variant="outline" size="lg" onClick={handlePreviousPage}>
            Önceki Forma Dön
          </Button>
          <Button type="submit" size="lg">
            Kaydet ve İlerle
          </Button>
        </div>
      </div>
    </form>
  )
}

