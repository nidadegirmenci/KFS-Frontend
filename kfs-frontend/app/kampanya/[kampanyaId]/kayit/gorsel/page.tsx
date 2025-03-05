"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, Plus, X } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import Image from "next/image"
import FileUpload from "@/app/components/ui/file-upload"
import type { FormEvent } from "react"
import { useNavigationHelpers } from "../utils/navigation"

interface UploadedImage {
  id: string
  file: File
  preview: string
}

interface VideoLink {
  id: string
  url: string
}

export default function GorselPage() {
  const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()
  
  const [showcaseImage, setShowcaseImage] = useState<UploadedImage | null>(null)
  const [otherImages, setOtherImages] = useState<UploadedImage[]>([])
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([])
  const [error, setError] = useState<string>("")
  const [videoInput, setVideoInput] = useState("")

  const handleShowcaseUpload = (files: File[] | null) => {
    if (files) {
      console.log("Uploaded files:", files);
    } else {
      console.log("No files uploaded.");
    }
  };
  const handleOtherImagesUpload = (files: File[] | null) => {
    if (files) {
      console.log("Uploaded files:", files);
    } else {
      console.log("No files uploaded.");
    }
  };
  

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

  const handlePrevClick = () => {
    const prevPage = getPreviousPage("gorsel")
    if (prevPage) {
      router.push(prevPage)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    const nextPage = getNextPage("gorsel")
    if (nextPage) {
      router.push(nextPage)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <FileUpload multiple={false} onFileSelect={handleShowcaseUpload} accept="image/*" />
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
            <FileUpload multiple={true} onFileSelect={handleOtherImagesUpload} accept="image/*" />
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
              <Button type="button" onClick={addVideoLink}>
                <Plus className="w-4 h-4 mr-2" /> Ekle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handlePrevClick}><ChevronLeft className="w-4 h-4 ml-2" /> Önceki</Button>
        <Button type="submit">Kaydet ve İlerle <ChevronRight className="w-4 h-4 ml-2" /></Button>
      </div>
    </form>
  )
}
