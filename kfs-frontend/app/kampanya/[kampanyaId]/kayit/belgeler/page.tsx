"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { Plus, Upload, X, HelpCircle } from "lucide-react"
import { useNavigationHelpers } from "../utils/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"

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

interface Document {
  id: string
  documentNo: string
  description: string
  file: File | null
}

interface Award {
  id: string
  date: string
  organization: string
  description: string
  file: File | null
}

interface Permit {
  id: string
  date: string
  description: string
  file: File | null
}

export default function BelgelerPage() {
  const router = useRouter()
  const { getPreviousPage } = useNavigationHelpers()
  const [documents, setDocuments] = useState<Document[]>([])
  const [awards, setAwards] = useState<Award[]>([])
  const [permits, setPermits] = useState<Permit[]>([])

  const addDocument = () => {
    const newDocument: Document = {
      id: Date.now().toString(),
      documentNo: "",
      description: "",
      file: null,
    }
    setDocuments([...documents, newDocument])
  }

  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      date: "",
      organization: "",
      description: "",
      file: null,
    }
    setAwards([...awards, newAward])
  }

  const addPermit = () => {
    const newPermit: Permit = {
      id: Date.now().toString(),
      date: "",
      description: "",
      file: null,
    }
    setPermits([...permits, newPermit])
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "document" | "award" | "permit",
    id: string,
  ) => {
    const file = e.target.files?.[0] || null

    switch (type) {
      case "document":
        setDocuments(documents.map((doc) => (doc.id === id ? { ...doc, file } : doc)))
        break
      case "award":
        setAwards(awards.map((award) => (award.id === id ? { ...award, file } : award)))
        break
      case "permit":
        setPermits(permits.map((permit) => (permit.id === id ? { ...permit, file } : permit)))
        break
    }
  }

  const removeItem = (type: "document" | "award" | "permit", id: string) => {
    switch (type) {
      case "document":
        setDocuments(documents.filter((doc) => doc.id !== id))
        break
      case "award":
        setAwards(awards.filter((award) => award.id !== id))
        break
      case "permit":
        setPermits(permits.filter((permit) => permit.id !== id))
        break
    }
  }

  const handlePreviousPage = () => {
    const previousPage = getPreviousPage("belgeler")
    if (previousPage) {
      router.push(previousPage)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Patent, Marka Tescil ve Belge Bilgileri</CardTitle>
              <PopoverTooltip content="Patent, marka tescil belgelerinizi ve diğer önemli belgelerinizi buraya ekleyebilirsiniz." />
            </div>
            <Button onClick={addDocument} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`doc-no-${doc.id}`}>Belge No</Label>
                    <Input
                      id={`doc-no-${doc.id}`}
                      value={doc.documentNo}
                      onChange={(e) =>
                        setDocuments(documents.map((d) => (d.id === doc.id ? { ...d, documentNo: e.target.value } : d)))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`doc-desc-${doc.id}`}>Açıklama</Label>
                    <Textarea
                      id={`doc-desc-${doc.id}`}
                      value={doc.description}
                      onChange={(e) =>
                        setDocuments(
                          documents.map((d) => (d.id === doc.id ? { ...d, description: e.target.value } : d)),
                        )
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Belge</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(e, "document", doc.id)}
                        className="hidden"
                        id={`doc-file-${doc.id}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => document.getElementById(`doc-file-${doc.id}`)?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {doc.file ? doc.file.name : "Dosya Seç"}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem("document", doc.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Ödül ve Başarılar</CardTitle>
              <PopoverTooltip content="Aldığınız ödülleri ve başarılarınızı buraya ekleyebilirsiniz." />
            </div>
            <Button onClick={addAward} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {awards.map((award) => (
            <Card key={award.id}>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`award-date-${award.id}`}>Tarih</Label>
                    <Input
                      id={`award-date-${award.id}`}
                      type="date"
                      value={award.date}
                      onChange={(e) =>
                        setAwards(awards.map((a) => (a.id === award.id ? { ...a, date: e.target.value } : a)))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`award-org-${award.id}`}>Ödülü Veren Kuruluş</Label>
                    <Input
                      id={`award-org-${award.id}`}
                      value={award.organization}
                      onChange={(e) =>
                        setAwards(awards.map((a) => (a.id === award.id ? { ...a, organization: e.target.value } : a)))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`award-desc-${award.id}`}>Açıklama</Label>
                    <Textarea
                      id={`award-desc-${award.id}`}
                      value={award.description}
                      onChange={(e) =>
                        setAwards(awards.map((a) => (a.id === award.id ? { ...a, description: e.target.value } : a)))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Belge</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(e, "award", award.id)}
                        className="hidden"
                        id={`award-file-${award.id}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => document.getElementById(`award-file-${award.id}`)?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {award.file ? award.file.name : "Dosya Seç"}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem("award", award.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>İzin ve Onaylar</CardTitle>
              <PopoverTooltip content="Gerekli izin ve onay belgelerinizi buraya ekleyebilirsiniz." />
            </div>
            <Button onClick={addPermit} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {permits.map((permit) => (
            <Card key={permit.id}>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`permit-date-${permit.id}`}>Tarih</Label>
                    <Input
                      id={`permit-date-${permit.id}`}
                      type="date"
                      value={permit.date}
                      onChange={(e) =>
                        setPermits(permits.map((p) => (p.id === permit.id ? { ...p, date: e.target.value } : p)))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`permit-desc-${permit.id}`}>Açıklama</Label>
                    <Textarea
                      id={`permit-desc-${permit.id}`}
                      value={permit.description}
                      onChange={(e) =>
                        setPermits(permits.map((p) => (p.id === permit.id ? { ...p, description: e.target.value } : p)))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Belge</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(e, "permit", permit.id)}
                        className="hidden"
                        id={`permit-file-${permit.id}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => document.getElementById(`permit-file-${permit.id}`)?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {permit.file ? permit.file.name : "Dosya Seç"}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem("permit", permit.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" size="lg" onClick={handlePreviousPage}>
          Önceki Forma Dön
        </Button>
        <Button type="submit" size="lg">
          Kaydet ve İlerle
        </Button>
      </div>
    </div>
  )
}

