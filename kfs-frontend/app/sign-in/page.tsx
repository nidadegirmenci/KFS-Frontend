"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card"
import { Separator } from "@/app/components/ui/seperator"
import Link from "next/link"
import Image from "next/image"
import { useLogin } from "@/app/hooks/useAuth"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { mutate: login, isPending, error: loginError } = useLogin(
    () => {
      router.push("/dashboard")
    },
    (error) => {
      console.log(error.response.data.error.message)
      setError(error.response.data.error.message)
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ email, password })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş yapılırken bir hata oluştu")
    }
  }

  const handleGoogleSignIn = () => {
    // Google ile giriş işlemi burada yapılacak
    console.log("Google ile giriş yapılıyor")
  }

  const handleAppleSignIn = () => {
    // Apple ile giriş işlemi burada yapılacak
    console.log("Apple ile giriş yapılıyor")
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Giriş Yap</CardTitle>
          <CardDescription className="text-center">
            Hesabınıza giriş yapmak için bilgilerinizi girin veya sosyal medya hesabınızı kullanın.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
         <Button className="w-full" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
          {(error || loginError) && (
            <p className="text-sm text-red-500 mt-2">
              {error || (loginError instanceof Error ? loginError.message : "Bir hata oluştu")}
            </p>
          )}
          <div className="mt-4 text-center">
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Şifremi Unuttum
            </Link>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col space-y-2 w-full">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <Image
                src="https://yt3.googleusercontent.com/ytc/AIdro_kxdF7KX2gwayJZyNuys1FpCw-kmAvZoytExNRXZncDKuY=s900-c-k-c0x00ffffff-no-rj"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Google ile Giriş Yap
            </Button>
            <Button variant="outline" className="w-full" onClick={handleAppleSignIn}>
              <Image
                src="https://fabrikbrands.com/wp-content/uploads/Apple-Logo-History-1-1155x770.png"
                alt="Apple"
                width={20}
                height={20}
                className="mr-2"
              />
              Apple ile Giriş Yap
            </Button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Hesabınız yok mu? </span>
            <Link href="/sign-up" className="text-sm text-blue-600 hover:underline">
              Kayıt Ol
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

