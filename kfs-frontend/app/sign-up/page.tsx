"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card"
import { Separator } from "@/app/components/ui/seperator"
import Image from "next/image"
import Link from "next/link"
import { useMail } from "../hooks/useMail"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  
  const router = useRouter()

  // useMail hook'u TanStack ile mail gönderme işini halledecek
  const { mutate: sendVerificationMail, isPending  } = useMail(
    () => {
      sessionStorage.setItem("registerEmail", email)
      sessionStorage.setItem("registerPassword", password)
      // Başarılı olursa doğrulama ekranına yönlendir
      router.push(`/verify-email?email=${encodeURIComponent(email)}`)
    },
    (error: any) => {
      setError(error.message || "Doğrulama maili gönderilirken bir hata oluştu.")
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.")
      return
    }

    try {
      // Normalde burada kullanıcı kaydını yaparsın (kendi backend'ine kaydetme işlemi vs.)
      console.log("Kayıt verileri:", { email, password })

      // Simülasyon: Kullanıcı kaydının başarılı olduğunu varsayıyoruz
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Kullanıcı başarıyla kaydolduktan sonra doğrulama e-postasını gönder
      sendVerificationMail({ email })
    } catch (error: any) {
      setError(error.message || "Kayıt sırasında bir hata oluştu.")
    }
  }

  const handleGoogleSignUp = () => {
    console.log("Google ile kayıt olunuyor")
  }

  const handleAppleSignUp = () => {
    console.log("Apple ile kayıt olunuyor")
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Hesap oluştur</CardTitle>
          <CardDescription className="text-center">
            Yeni bir hesap oluşturmak için e-posta adresinizi girin. Doğrulama e-postası göndereceğiz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Kayıt olunuyor..." : "Kayıt Ol"}
          </Button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <Separator className="my-4" />
          <div className="flex flex-col space-y-2 w-full">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignUp}>
              <Image
                src="https://yt3.googleusercontent.com/ytc/AIdro_kxdF7KX2gwayJZyNuys1FpCw-kmAvZoytExNRXZncDKuY=s900-c-k-c0x00ffffff-no-rj"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Google ile Kayıt Ol
            </Button>
            <Button variant="outline" className="w-full" onClick={handleAppleSignUp}>
              <Image
                src="https://fabrikbrands.com/wp-content/uploads/Apple-Logo-History-1-1155x770.png"
                alt="Apple"
                width={20}
                height={20}
                className="mr-2"
              />
              Apple ile Kayıt Ol
            </Button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Zaten bir hesabınız var mı? </span>
            <Link href="/sign-in" className="text-sm text-blue-600 hover:underline">
              Giriş Yap
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
