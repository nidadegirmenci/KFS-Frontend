"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { PhoneVerificationPopup } from "../components/PhoneVerificationPopup"
import { useAuth } from "../contexts/AuthContext"
import { useCompleteRegistration } from "../hooks/useCompleteRegistration"
import { countryCodes } from "../utils/countryCodes"

interface Country {
  name: string
  code: string
}

export default function CompleteRegistration() {
  const [accountType, setAccountType] = useState("individual")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [taxOffice, setTaxOffice] = useState("")
  const [taxNumber, setTaxNumber] = useState("")
  const [phoneCode, setPhoneCode] = useState("+90")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [country, setCountry] = useState("TR")
  const [countries, setCountries] = useState<Country[]>([])
  const [isInvestor, setIsInvestor] = useState(false)
  const [isEntrepreneur, setIsEntrepreneur] = useState(false)
  const [error, setError] = useState("")
  const [isVerificationPopupOpen, setIsVerificationPopupOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams?.get("email") ?? ""
  const { login } = useAuth()
  const { mutate: completeRegistration, isLoading, error: apiError } = useCompleteRegistration()

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((response) => response.json())
      .then((data) => {
        const sortedCountries = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name))

        const turkeyIndex = sortedCountries.findIndex((c: Country) => c.code === "TR")
        if (turkeyIndex > -1) {
          const [turkey] = sortedCountries.splice(turkeyIndex, 1)
          sortedCountries.unshift(turkey)
        }

        setCountries(sortedCountries)
      })
      .catch((error) => console.error("Error fetching countries:", error))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case "firstName":
        setFirstName(value)
        break
      case "lastName":
        setLastName(value)
        break
      case "companyName":
        setCompanyName(value)
        break
      case "taxOffice":
        setTaxOffice(value)
        break
      case "taxNumber":
        setTaxNumber(value)
        break
      case "phoneNumber":
        setPhoneNumber(value)
        break
      default:
        break
    }
  }

  const handleSelectChange = (value: string, name: string) => {
    if (name === "country") {
      setCountry(value)
      const newPhoneCode = countryCodes[value] || ""
      setPhoneCode(newPhoneCode)
      setPhoneNumber("") // Reset phone number when country changes
    } else {
      //setUserInfo((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber || !country || (!isInvestor && !isEntrepreneur)) {
      setError("Lütfen tüm zorunlu alanları doldurun ve en az bir ilgi alanı seçin.")
      return
    }
    if (accountType === "individual" && (!firstName || !lastName)) {
      setError("Lütfen ad ve soyad alanlarını doldurun.")
      return
    }
    if (accountType === "corporate" && (!companyName || !taxOffice || !taxNumber)) {
      setError("Lütfen tüm kurumsal bilgileri doldurun.")
      return
    }
    setError("")
    setIsVerificationPopupOpen(true)
  }

  const handleVerify = (code: string) => {
    // Simulating verification with a mock code
    const mockVerificationCode = "123456"
    if (code === mockVerificationCode) {
      completeRegistration(
        {
          userId: 1, // Bu değer gerçek uygulamada dinamik olarak belirlenmelidir
          accountType: accountType as "individual" | "corporate",
          firstName,
          lastName,
          companyName,
          taxOffice,
          taxNumber,
          country,
          phone: phoneCode + phoneNumber,
          isInvestor,
          isEntrepreneur,
        },
        {
          onSuccess: () => {
            setIsVerificationPopupOpen(false)
            login() // Update the auth state
            router.push("/") // Redirect to the home page
          },
          onError: (error) => {
            setError(error.message)
          },
        },
      )
    } else {
      setError("Geçersiz doğrulama kodu. Lütfen tekrar deneyin.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Kayıt İşlemini Tamamla</CardTitle>
          <CardDescription className="text-center">
            Lütfen aşağıdaki bilgileri doldurarak kayıt işleminizi tamamlayın.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Hesap Türü</Label>
                <RadioGroup defaultValue="individual" onValueChange={setAccountType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Bireysel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corporate" id="corporate" />
                    <Label htmlFor="corporate">Kurumsal</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="country">Ülke</Label>
                <Select value={country} onValueChange={(value) => handleSelectChange(value, "country")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ülke seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" value={email} disabled />
              </div>
              {accountType === "individual" ? (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input id="firstName" name="firstName" value={firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input id="lastName" name="lastName" value={lastName} onChange={handleInputChange} required />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="companyName">Şirket Ünvanı</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="taxOffice">Vergi Dairesi</Label>
                    <Input id="taxOffice" name="taxOffice" value={taxOffice} onChange={handleInputChange} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="taxNumber">Vergi Kimlik Numarası (VKN)</Label>
                    <Input id="taxNumber" name="taxNumber" value={taxNumber} onChange={handleInputChange} required />
                  </div>
                </>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Cep Telefonu</Label>
                <div className="flex">
                  <Input id="phoneCode" name="phoneCode" value={phoneCode} className="w-20 mr-2" disabled />
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    placeholder={country === "TR" ? "5__ ___ __ __" : "Telefon numarası"}
                    className="flex-1"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>İlgi Alanları</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="investor"
                    checked={isInvestor}
                    onCheckedChange={(checked) => setIsInvestor(checked as boolean)}
                  />
                  <Label htmlFor="investor">Yatırımcı</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="entrepreneur"
                    checked={isEntrepreneur}
                    onCheckedChange={(checked) => setIsEntrepreneur(checked as boolean)}
                  />
                  <Label htmlFor="entrepreneur">Girişimci</Label>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "İşlem yapılıyor..." : "Kayıt İşlemini Tamamla"}
          </Button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {apiError && <p className="text-sm text-red-500 mt-2">{apiError.message}</p>}
        </CardFooter>
      </Card>
      <PhoneVerificationPopup
        isOpen={isVerificationPopupOpen}
        onClose={() => setIsVerificationPopupOpen(false)}
        onVerify={handleVerify}
        phone={phoneCode + phoneNumber}
      />
    </div>
  )
}

