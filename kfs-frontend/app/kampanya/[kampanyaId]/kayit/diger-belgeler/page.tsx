"use client"

import { useState, type FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUpload } from "@/app/components/ui/file-upload"
import { useRouter } from "next/navigation"
import { useNavigationHelpers } from "../utils/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function DigerBelgelerPage() {
  const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()
  const [files, setFiles] = useState<File[]>([])

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setFiles((prev) => [...prev, file])
    }
  }

  const handlePrevClick = () => {
    const prevPage = getPreviousPage("diger-belgeler")
    if (prevPage) {
      router.push(prevPage)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    const nextPage = getNextPage("diger-belgeler")
    if (nextPage) {
      router.push(nextPage)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Yüklemek İstediğiniz Diğer Dokümanlar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-blue-50 border-blue-200 text-blue-800">
            <AlertDescription>Bu alana dosya yükleme zorunluluğunuz bulunmamaktadır.</AlertDescription>
          </Alert>

          <FileUpload onFileSelect={handleFileSelect} accept=".pdf,.doc,.docx,.xls,.xlsx" multiple={true} />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handlePrevClick} className="flex items-center gap-2">
          <ChevronLeft size={16} />
          Önceki Forma Dön
        </Button>
        <Button type="submit" className="flex items-center gap-2">
          Kaydet ve İlerle
          <ChevronRight size={16} />
        </Button>
      </div>
    </form>
  )
}

