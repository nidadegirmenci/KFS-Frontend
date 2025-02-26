"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { Plus, Upload, X } from "lucide-react"

interface Document {
  id: string
  subject: string
  file: File | null
}

export default function Documents() {
  const [fundingDescription, setFundingDescription] = useState("")
  const [documents, setDocuments] = useState<Document[]>([])
  const MAX_CHARS = 3000

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      setFundingDescription(text)
    }
  }

  const addDocument = () => {
    setDocuments([
      ...documents,
      {
        id: Date.now().toString(),
        subject: "",
        file: null,
      },
    ])
  }

  const removeDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const updateDocument = (id: string, field: keyof Document, value: any) => {
    setDocuments(documents.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc)))
  }

  return (
    <div className="space-y-6">
      {/* Funding Sources Section */}
      <Card>
        <CardHeader>
          <CardTitle>Fon Kaynakları ve Finansman Yapısı</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
            <AlertDescription>
              Girişim şirketinin kısa ve uzun vadeli fon kaynakları, fon kaynaklarının kullanımına ilişkin herhangi bir
              sınırlama olup olmadığı, borçlanma ihtiyacı, borç yapısı ve nakit akışı hakkında bilgi vererek, mevcut
              yükümlülüklerinizi karşılamak için yeterli işletme sermayesinin bulunup bulunmadığı hakkında bilgiler
              veriniz.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Detaylı Bilgi Giriniz</Label>
            <Textarea
              value={fundingDescription}
              onChange={handleDescriptionChange}
              className="min-h-[200px] resize-none"
              placeholder="Açıklama giriniz..."
            />
            <div className="text-sm text-muted-foreground text-right">
              {fundingDescription.length} / {MAX_CHARS}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Documents Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Eklemek İstediğiniz Diğer Belgeler</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addDocument}>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-4 items-start border p-4 rounded-lg"
              >
                <div className="space-y-2">
                  <Label>Konu</Label>
                  <Input
                    value={doc.subject}
                    onChange={(e) => updateDocument(doc.id, "subject", e.target.value)}
                    placeholder="Belge konusunu girin"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Belge</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      onChange={(e) => updateDocument(doc.id, "file", e.target.files?.[0] || null)}
                      className="hidden"
                      id={`file-${doc.id}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {doc.file ? doc.file.name : "Dosya Seç"}
                    </Button>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-8"
                  onClick={() => removeDocument(doc.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {documents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Henüz belge eklenmemiş. Yeni bir belge eklemek için "Yeni Ekle" butonunu kullanın.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

