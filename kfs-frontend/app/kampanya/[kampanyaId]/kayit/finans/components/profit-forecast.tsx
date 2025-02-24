"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TextEditor } from "@/app/components/ui/text-editor"

export default function ProfitForecast() {
  const [forecastText, setForecastText] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kar Tahmin ve Beklentileri</CardTitle>
      </CardHeader>
      <CardContent>
        <TextEditor value={forecastText} onChange={setForecastText} maxLength={3000} />
      </CardContent>
    </Card>
  )
}

