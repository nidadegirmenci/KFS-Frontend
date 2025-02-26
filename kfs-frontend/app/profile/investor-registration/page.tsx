"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { FileUpload } from "../../components/ui/file-upload"
import "../entrepreneur-registration/styles/custom-inputs.css"

export default function InvestorRegistrationPage() {
  const [formData, setFormData] = useState<{
    image: File | null;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    tcKimlikNo: string;
    birthDate: string;
    mkkNo: string;
    annualIncome: string;
  }>({
    image: null,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+90 555 123 4567",
    tcKimlikNo: "12345678901", // Placeholder 11-digit number
    birthDate: "1990-01-01",
    mkkNo: "",
    annualIncome: "",
  })


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yatırımcı Kayıt Formu</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <FileUpload
              multiple={true}
              onFileSelect={(file) => console.log(file)}
              initialFile={[]}
              accept="image/*"
            />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                disabled
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="firstName">Ad</label>
            </div>
            <div className="form-group">
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                disabled
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="lastName">Soyad</label>
            </div>
            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                disabled
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="email">E-posta</label>
            </div>
            <div className="form-group">
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                disabled
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="phone">Cep Telefonu</label>
            </div>
            <div className="form-group">
              <input
                id="tcKimlikNo"
                name="tcKimlikNo"
                value={formData.tcKimlikNo}
                disabled
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="tcKimlikNo">TC Kimlik Numarası</label>
            </div>
            <div className="form-group">
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                disabled
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="birthDate">Doğum Tarihi</label>
            </div>
            <div className="form-group">
              <input
                id="mkkNo"
                name="mkkNo"
                value={formData.mkkNo}
                onChange={handleInputChange}
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="mkkNo">MKK No (Varsa)</label>
            </div>
            <div className="form-group">
              <input
                id="annualIncome"
                name="annualIncome"
                type="number"
                value={formData.annualIncome}
                onChange={handleInputChange}
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="annualIncome">Gelir Beyanı (Yıllık) TL</label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Kaydet
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

