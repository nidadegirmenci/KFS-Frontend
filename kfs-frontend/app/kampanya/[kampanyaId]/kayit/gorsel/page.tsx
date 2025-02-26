"use client"

import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation"
import { useNavigationHelpers } from "../utils/navigation"
import { ChevronRight , ChevronLeft } from "lucide-react"
import VisualContent from "./components/visual-content"
import type { FormEvent } from "react"

export default function GorselPage() {
  const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()

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
      <VisualContent />

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handlePrevClick}>
        <ChevronLeft className="w-4 h-4 ml-2" />
          Önceki Forma Dön
        </Button>
        <Button type="submit">Kaydet ve İlerle <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  )
}

