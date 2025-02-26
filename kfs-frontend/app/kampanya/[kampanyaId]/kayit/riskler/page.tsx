"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { TextEditor } from "@/app/components/ui/text-editor"
import { Button } from "@/app/components/ui/button"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
import { useRouter } from "next/navigation"
import { useNavigationHelpers } from "../utils/navigation"

export default function KampanyaRisklerPage({ params }: { params: { kampanyaId: string } }) {
  const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()
  const [projectRisks, setProjectRisks] = useState("")
  const [sectorRisks, setSectorRisks] = useState("")
  const [shareRisks, setShareRisks] = useState("")
  const [otherRisks, setOtherRisks] = useState("")

  const handlePrevClick = () => {
    const prevPage = getPreviousPage("riskler")
    if (prevPage) {
      router.push(prevPage)
    }
  }

  const handleNextClick = () => {
    const nextPage = getNextPage("riskler")
    if (nextPage) {
      router.push(nextPage)
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Riskler</CardTitle>
        <p className="text-sm text-muted-foreground">
          Bu bölümde; girişim şirketine ve faaliyetlere, girişim şirketinin ve/veya hedef kitlenin içinde bulunduğu
          sektöre, çıkarılacak paylara ve yatırım kararı verilmesinde önem taşıyan diğer risklere ayrı başlıklar halinde
          yer verilecektir.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">
              Projeye İlişkin Riskler <span className="text-red-500">*</span>
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Projeye ilişkin riskleri detaylı olarak açıklayınız.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TextEditor value={projectRisks} onChange={setProjectRisks} maxLength={5000} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">
              Sektöre İlişkin Riskler <span className="text-red-500">*</span>
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sektöre ilişkin riskleri detaylı olarak açıklayınız.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TextEditor value={sectorRisks} onChange={setSectorRisks} maxLength={5000} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">
              Paylara İlişkin Riskler <span className="text-red-500">*</span>
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Paylara ilişkin riskleri detaylı olarak açıklayınız.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TextEditor value={shareRisks} onChange={setShareRisks} maxLength={3000} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">
              Diğer Riskler <span className="text-red-500">*</span>
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Diğer önemli riskleri detaylı olarak açıklayınız.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TextEditor value={otherRisks} onChange={setOtherRisks} maxLength={3000} />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handlePrevClick}>
            Önceki Forma Dön
          </Button>
          <Button onClick={handleNextClick}>Kaydet ve İlerle</Button>
        </div>
      </CardContent>
    </Card>
  )
}

