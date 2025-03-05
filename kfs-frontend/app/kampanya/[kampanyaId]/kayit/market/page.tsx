"use client"

import type React from "react"
import { useState } from "react"
import { useRouter , useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { TextEditor } from "@/app/components/ui/text-editor"
import { useNavigationHelpers } from "../utils/navigation"
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  X,
 
} from "lucide-react"



interface AdditionalTopic {
  id: number
  topic: string
  description: string
  file: File | null
}

interface UploadedFile {
  file: File
  name: string
}

export default function KampanyaMarketPage() {
  const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()
  const [marketText, setMarketText] = useState("")
  const [competitionText, setCompetitionText] = useState("")
  const [targetAudienceText, setTargetAudienceText] = useState("")
  const [commercializationText, setCommercializationText] = useState("")
  const [additionalTopics, setAdditionalTopics] = useState<AdditionalTopic[]>([])
  const [marketFile, setMarketFile] = useState<UploadedFile | null>(null)
  const [competitionFile, setCompetitionFile] = useState<UploadedFile | null>(null)
  const [targetAudienceFile, setTargetAudienceFile] = useState<UploadedFile | null>(null)
  const [commercializationFile, setCommercializationFile] = useState<UploadedFile | null>(null)
   const params = useParams<{ kampanyaId: string }>() // useParams ile kampanyaId al
    const kampanyaId = params?.kampanyaId || "" // ID yoksa boş string ata

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (file: UploadedFile | null) => void,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setter({ file, name: file.name })
    }
  }

  const handleDeleteFile = (setter: (file: UploadedFile | null) => void) => {
    setter(null)
  }

  const handleAddTopic = () => {
    setAdditionalTopics([...additionalTopics, { id: Date.now(), topic: "", description: "", file: null }])
  }

  const handleDeleteTopic = (id: number) => {
    setAdditionalTopics(additionalTopics.filter((topic) => topic.id !== id))
  }

  const handleTopicChange = (id: number, field: keyof AdditionalTopic, value: string | File | null) => {
    setAdditionalTopics(additionalTopics.map((topic) => (topic.id === id ? { ...topic, [field]: value } : topic)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push(getNextPage("market") || "")
  }

  const handlePrevious = () => {
    router.push(getPreviousPage("market") || "")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pazar/Rekabet/Hedef</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pazar Hakkında Özet Bilgi */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Label htmlFor="marketSummary">Pazar Hakkında Özet Bilgi *</Label>
                <TextEditor value={marketText} onChange={setMarketText} />
              </div>
              <div className="ml-4 min-w-[200px]">
                <div className="text-sm text-gray-500 mb-2">İlgili Doküman</div>
                <div className="space-y-2">
                  <Input
                    type="file"
                    id="marketFile"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setMarketFile)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("marketFile")?.click()}
                  >
                    Dosya Seç
                  </Button>
                  {marketFile && (
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm truncate">{marketFile.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => handleDeleteFile(setMarketFile)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rekabet Hakkında Özet Bilgi */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Label htmlFor="competitionSummary">Rekabet Hakkında Özet Bilgi *</Label>
                <TextEditor value={competitionText} onChange={setCompetitionText} />
              </div>
              <div className="ml-4 min-w-[200px]">
                <div className="text-sm text-gray-500 mb-2">İlgili Doküman</div>
                <div className="space-y-2">
                  <Input
                    type="file"
                    id="competitionFile"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setCompetitionFile)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("competitionFile")?.click()}
                  >
                    Dosya Seç
                  </Button>
                  {competitionFile && (
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm truncate">{competitionFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFile(setCompetitionFile)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Hedef Kitle Hakkında Özet Bilgi */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Label htmlFor="targetAudienceSummary">Hedef Kitle Hakkında Özet Bilgi *</Label>
                <TextEditor value={targetAudienceText} onChange={setTargetAudienceText} />
              </div>
              <div className="ml-4 min-w-[200px]">
                <div className="text-sm text-gray-500 mb-2">İlgili Doküman</div>
                <div className="space-y-2">
                  <Input
                    type="file"
                    id="targetAudienceFile"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setTargetAudienceFile)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("targetAudienceFile")?.click()}
                  >
                    Dosya Seç
                  </Button>
                  {targetAudienceFile && (
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm truncate">{targetAudienceFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFile(setTargetAudienceFile)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ticarileşme Planı ve İş Modeli */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Label htmlFor="commercializationPlan">Ticarileşme Planı ve İş Modeli *</Label>
                <TextEditor value={commercializationText} onChange={setCommercializationText} />
              </div>
              <div className="ml-4 min-w-[200px]">
                <div className="text-sm text-gray-500 mb-2">İlgili Doküman</div>
                <div className="space-y-2">
                  <Input
                    type="file"
                    id="commercializationFile"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setCommercializationFile)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("commercializationFile")?.click()}
                  >
                    Dosya Seç
                  </Button>
                  {commercializationFile && (
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm truncate">{commercializationFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFile(setCommercializationFile)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Belirtmek İstediğiniz Diğer Konular */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Belirtmek İstediğiniz Diğer Konular</h3>
              <Button type="button" variant="outline" onClick={handleAddTopic}>
                <Plus className="w-4 h-4 mr-2" />
                Yeni Ekle
              </Button>
            </div>

            {additionalTopics.map((topic) => (
              <div key={topic.id} className="space-y-4 p-4 border rounded-lg relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleDeleteTopic(topic.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <Label htmlFor={`topic-${topic.id}`}>Konu</Label>
                  <Input
                    id={`topic-${topic.id}`}
                    value={topic.topic}
                    onChange={(e) => handleTopicChange(topic.id, "topic", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${topic.id}`}>Açıklama</Label>
                  <TextEditor
                    value={topic.description}
                    onChange={(value) => handleTopicChange(topic.id, "description", value)}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Label>Belge</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      id={`file-${topic.id}`}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleTopicChange(topic.id, "file", e.target.files[0])
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById(`file-${topic.id}`)?.click()}
                    >
                      Dosya Seç
                    </Button>
                    {topic.file && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTopicChange(topic.id, "file", null)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                {topic.file && <div className="text-sm text-gray-500">Seçilen dosya: {topic.file.name}</div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handlePrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Önceki Forma Dön
        </Button>
        <Button type="submit">
          Kaydet ve İlerle
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  )
}

