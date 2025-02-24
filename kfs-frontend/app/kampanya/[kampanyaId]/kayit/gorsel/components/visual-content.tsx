"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, X, Upload } from "lucide-react"
import Image from "next/image"

interface UploadedImage {
  id: string
  file: File
  preview: string
}

interface VideoLink {
  id: string
  url: string
}

export default function VisualContent() {
  const [showcaseImage, setShowcaseImage] = useState<UploadedImage | null>(null)
  const [otherImages, setOtherImages] = useState<UploadedImage[]>([])
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([])
  const [error, setError] = useState<string>("")
  const [videoInput, setVideoInput] = useState("")

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(img.src)
        resolve(img.width >= 1280 && img.height >= 720)
      }
    })
  }

  const handleShowcaseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isValidSize = await validateImageDimensions(file)
    if (!isValidSize) {
      setError("Vitrin fotoğrafı en az 1280x720 boyutlarında olmalıdır.")
      return
    }

    setError("")
    const preview = URL.createObjectURL(file)
    setShowcaseImage({
      id: Date.now().toString(),
      file,
      preview,
    })
  }

  const handleOtherImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages = await Promise.all(
      files.map(async (file) => ({
        id: Date.now().toString() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
      })),
    )
    setOtherImages([...otherImages, ...newImages])
  }

  const removeImage = (id: string, type: "showcase" | "other") => {
    if (type === "showcase") {
      setShowcaseImage(null)
    } else {
      setOtherImages(otherImages.filter((img) => img.id !== id))
    }
  }

  const addVideoLink = () => {
    if (!videoInput) return

    // Basic validation for YouTube and Vimeo links
    const isValidUrl = videoInput.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/)

    if (!isValidUrl) {
      setError("Lütfen geçerli bir YouTube veya Vimeo linki girin.")
      return
    }

    setVideoLinks([...videoLinks, { id: Date.now().toString(), url: videoInput }])
    setVideoInput("")
    setError("")
  }

  const removeVideoLink = (id: string) => {
    setVideoLinks(videoLinks.filter((link) => link.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Showcase Photo Section */}
      <Card>
        <CardHeader>
          <CardTitle>Vitrin Fotoğrafı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col items-center gap-4">
              {showcaseImage ? (
                <div className="relative">
                  <Image
                    src={showcaseImage.preview || "/placeholder.svg"}
                    alt="Vitrin fotoğrafı"
                    width={1280}
                    height={720}
                    className="rounded-lg max-h-[400px] object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeImage(showcaseImage.id, "showcase")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-full">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleShowcaseUpload}
                    className="hidden"
                    id="showcase-upload"
                  />
                  <Label
                    htmlFor="showcase-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="mb-2 text-sm text-muted-foreground">Vitrin fotoğrafını yüklemek için tıklayın</p>
                      <p className="text-xs text-muted-foreground">Minimum boyut: 1280x720 piksel</p>
                    </div>
                  </Label>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Photos Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Diğer Fotoğraflar</CardTitle>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleOtherImagesUpload}
              className="hidden"
              id="other-photos-upload"
            />
            <Label htmlFor="other-photos-upload">
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Plus className="w-4 h-4 mr-2" />
                  Fotoğraf Ekle
                </span>
              </Button>
            </Label>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherImages.map((img) => (
              <div key={img.id} className="relative group">
                <Image
                  src={img.preview || "/placeholder.svg"}
                  alt="Proje fotoğrafı"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-48"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(img.id, "other")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Videos Section */}
      <Card>
        <CardHeader>
          <CardTitle>Videolar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Projenizi anlatan videoların Youtube veya Vimeo linkini giriniz"
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
              />
              <Button onClick={addVideoLink}>
                <Plus className="w-4 h-4 mr-2" />
                Ekle
              </Button>
            </div>

            <div className="space-y-2">
              {videoLinks.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <span className="truncate flex-1">{link.url}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeVideoLink(link.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

