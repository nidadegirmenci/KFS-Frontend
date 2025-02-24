"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { useSignUp } from "../hooks/useSignUp"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { mutate: signUp, isLoading, error: apiError } = useSignUp()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.")
      return
    }
    signUp(
      { email, password },
      {
        onSuccess: (user) => {
          router.push(`/verify-email?email=${encodeURIComponent(email)}`)
        },
        onError: (error) => {
          setError(error.message)
        },
      },
    )
  }

  const handleGoogleSignUp = () => {
    // Google ile kayıt işlemi burada yapılacak
    console.log("Google ile kayıt olunuyor")
  }

  const handleAppleSignUp = () => {
    // Apple ile kayıt işlemi burada yapılacak
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
          <Button  className="w-full" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Kayıt olunuyor..." : "Kayıt Ol"}
          </Button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {apiError && <p className="text-sm text-red-500 mt-2">{apiError.message}</p>}
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

