"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card"
import { useRegister } from "../hooks/useRegister"

export default function VerifyEmail() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const email = typeof window !== "undefined" ? sessionStorage.getItem("registerEmail") : null
  const password = typeof window !== "undefined" ? sessionStorage.getItem("registerPassword") : null

  const { mutate: registerUser, isPending } = useRegister(
    (data) => {
      console.log("Register response data:", data);

    const userId = data?.userId ?? data?.data?.userId;  
  
      // Başarılı kayıt sonrası sessionStorage temizlenebilir
      sessionStorage.removeItem("registerEmail");
      sessionStorage.removeItem("registerPassword");
  
      // Burada userId'yi URL'ye ekleyerek yönlendiriyoruz
      router.push(`/complete-registration?&userId=${userId}`);
    },
    (error) => {
      setError(error.message || "Kayıt sırasında bir hata oluştu.");
    }
  );

  const handleVerify = () => {
    setError("")

    if (!code || code.length !== 6) {
      setError("Geçerli bir doğrulama kodu girin.")
      return
    }

    registerUser({ email: email as string, password: password as string, code })
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">E-posta Doğrulama</CardTitle>
          <CardDescription className="text-center">
            Lütfen e-posta adresinize gönderilen 6 haneli doğrulama kodunu girin.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Input
            type="text"
            maxLength={6}
            placeholder="Doğrulama Kodu"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="text-center tracking-widest text-lg"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleVerify} disabled={isPending}>
            {isPending ? "Doğruluyor..." : "Kodu Doğrula ve Devam Et"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
