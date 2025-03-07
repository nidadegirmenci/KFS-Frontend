"use client"

import type React from "react"

import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation"
import { useNavigationHelpers } from "../utils/navigation"
import { ChevronRight, ChevronLeft, Plus, Trash2, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import Image from "next/image"
import { useState, type FormEvent } from "react"

interface UploadedImage {
  id: string
  file: File
  preview: string
}

export default function GorselPage() {
  const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()
  const [showcaseImage, setShowcaseImage] = useState<UploadedImage | null>(null)
  const [otherImages, setOtherImages] = useState<UploadedImage[]>([])
  const [videoInput, setVideoInput] = useState("")
  const [videoLinks, setVideoLinks] = useState<string[]>([])
  const [error, setError] = useState<string>("")

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

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image()
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
      setError("Yüklediğiniz fotoğraf en az 1280x720 boyutlarında olmalıdır.")
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

    setVideoLinks([...videoLinks, videoInput])
    setVideoInput("")
    setError("")
  }

  const removeVideoLink = (index: number) => {
    setVideoLinks(videoLinks.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Fotoğraf ve Çizimler Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between bg-slate-100 rounded-t-lg">
          <CardTitle className="text-xl font-medium text-slate-700">Fotoğraf ve Çizimler</CardTitle>
          <HelpCircle className="text-blue-600 w-5 h-5" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vitrin Fotoğrafı */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">Vitrin Fotoğrafı</span>
                <span className="text-red-500">*</span>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="border-t border-b py-4">
                {showcaseImage ? (
                  <div className="relative">
                    <Image
                      src={showcaseImage.preview || "/placeholder.svg"}
                      alt="Vitrin fotoğrafı"
                      width={600}
                      height={400}
                      className="rounded-md object-cover max-h-[300px] w-full"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-700"
                      onClick={() => removeImage(showcaseImage.id, "showcase")}
                    >
                      <Trash2 className="h-4 w-4" />
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
                    <Label htmlFor="showcase-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                        <span className="text-blue-600 font-medium">Dosya Seç</span>
                      </div>
                    </Label>
                  </div>
                )}
              </div>
            </div>

            {/* Diğer fotoğraflar */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">Diğer fotoğraflar</span>
              </div>

              <div className="border-t border-b py-4">
                <div className="grid grid-cols-3 gap-4">
                  {otherImages.map((img) => (
                    <div key={img.id} className="relative">
                      <Image
                        src={img.preview || "/placeholder.svg"}
                        alt="Proje fotoğrafı"
                        width={200}
                        height={150}
                        className="rounded-md object-cover h-[150px] w-full"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-700"
                        onClick={() => removeImage(img.id, "other")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleOtherImagesUpload}
                      className="hidden"
                      id="other-photos-upload"
                    />
                    <Label htmlFor="other-photos-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-[150px]">
                        <span className="text-blue-600 font-medium">Dosya Seç</span>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Videolar Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between bg-slate-100 rounded-t-lg">
          <CardTitle className="text-xl font-medium text-slate-700">Videolar</CardTitle>
          <HelpCircle className="text-blue-600 w-5 h-5" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">
                Projenizi anlatan videoların Youtube veya Vimeo linkini giriniz.
              </span>
              <span className="text-red-500">*</span>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder=""
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={addVideoLink} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Ekle
              </Button>
            </div>

            <div className="space-y-2">
              {videoLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <span className="truncate flex-1">{link}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeVideoLink(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={handlePrevClick} className="flex items-center">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Önceki Forma Dön
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex items-center">
          Kaydet ve İlerle
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  )
}

