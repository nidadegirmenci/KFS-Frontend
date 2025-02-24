"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  useEffect(() => {
    // Simulate email verification process
    const timer = setTimeout(() => {
      setIsVerified(true)
    }, 3000) // 3 seconds delay to simulate verification

    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    router.push(`/complete-registration?email=${encodeURIComponent(email || "")}`)
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">E-posta Doğrulama</CardTitle>
          <CardDescription className="text-center">
            Lütfen e-posta adresinize gönderilen doğrulama bağlantısını kontrol edin.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {isVerified ? (
            <p className="text-green-600">E-posta adresiniz doğrulandı!</p>
          ) : (
            <p>Doğrulama işlemi devam ediyor...</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleContinue} disabled={!isVerified}>
            Kayıt İşlemini Tamamla
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

