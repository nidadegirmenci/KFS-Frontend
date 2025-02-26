"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { Plus, X } from "lucide-react"
import Image from "next/image"
import FileUpload from "@/app/components/ui/file-upload"

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

  const handleShowcaseUpload = (file: File) => {
    setShowcaseImage({ id: Date.now().toString(), file, preview: URL.createObjectURL(file) })
  }

  const handleOtherImagesUpload = (files: File[]) => {
    const newImages = files.map((file) => ({
      id: Date.now().toString() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }))
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
      <Card>
        <CardHeader>
          <CardTitle>Vitrin Fotoğrafı</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FileUpload
            multiple={true}
            onFileSelect={(file) => console.log(file)}
            accept="image/*"
          />
          {showcaseImage && (
            <div className="relative mt-4">
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
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Diğer Fotoğraflar</CardTitle>
            <FileUpload
              multiple={true}
              onFileSelect={(file) => console.log(file)}
              accept="image/*"
            />
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