"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { FileUpload } from "../../components/ui/file-upload"
import { Plus, Trash2, Linkedin, Instagram, Twitter, Globe } from "lucide-react"
import "../entrepreneur-registration/styles/custom-inputs.css"

// Mock user data
const mockUserInfo = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+90 555 123 4567",
  website: "",
  birthDate: "",
  gender: "",
  academicTitle: "",
}

interface SocialMedia {
  id: string
  name: string
  username: string
  followers: string
}

export default function InfoPage() {
  const [userInfo, setUserInfo] = useState(mockUserInfo)
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([
    { id: "linkedin", name: "LinkedIn", username: "", followers: "" },
    { id: "instagram", name: "Instagram", username: "", followers: "" },
    { id: "twitter", name: "Twitter", username: "", followers: "" },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileSelect = (file: File | null) => {
    if (file) {
      console.log("Selected file:", file)
    }
  }

  const handleSocialMediaChange = (id: string, field: "username" | "followers" | "name", value: string) => {
    setSocialMedia(socialMedia.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const addSocialMedia = () => {
    setSocialMedia([...socialMedia, { id: Date.now().toString(), name: "", username: "", followers: "" }])
  }

  const removeSocialMedia = (id: string) => {
    setSocialMedia(socialMedia.filter((item) => item.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { ...userInfo, socialMedia })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kişisel Bilgiler</CardTitle>
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
            <div className="space-y-2">
              <Label htmlFor="firstName">Ad</Label>
              <Input id="firstName" name="firstName" value={userInfo.firstName} disabled className="underline-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Soyad</Label>
              <Input id="lastName" name="lastName" value={userInfo.lastName} disabled className="underline-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" name="email" type="email" value={userInfo.email} disabled className="underline-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" name="phone" value={userInfo.phone} disabled className="underline-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Web Sitesi</Label>
              <Input
                id="website"
                name="website"
                value={userInfo.website}
                onChange={handleInputChange}
                className="underline-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Doğum Tarihi</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={userInfo.birthDate}
                onChange={handleInputChange}
                className="underline-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Cinsiyet</Label>
              <Select
                name="gender"
                value={userInfo.gender}
                onValueChange={(value) => handleSelectChange(value, "gender")}
              >
                <SelectTrigger className="underline-select">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Erkek</SelectItem>
                  <SelectItem value="female">Kadın</SelectItem>
                  <SelectItem value="other">Belirtmek İstemiyorum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="academicTitle">Akademik Ünvan</Label>
              <Input
                id="academicTitle"
                name="academicTitle"
                value={userInfo.academicTitle}
                onChange={handleInputChange}
                className="underline-input"
              />
            </div>
          </div>

          <div className="space-y-4 border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Sosyal Medya Hesapları</h3>
              <Button type="button" variant="outline" size="sm" onClick={addSocialMedia}>
                <Plus className="w-4 h-4 mr-2" /> Hesap Ekle
              </Button>
            </div>
            <div className="space-y-4">
              {socialMedia.map((account) => (
                <div key={account.id} className="flex items-center space-x-2">
                  <div className="w-8">
                    {account.name === "LinkedIn" && <Linkedin className="h-5 w-5" />}
                    {account.name === "Instagram" && <Instagram className="h-5 w-5" />}
                    {account.name === "Twitter" && <Twitter className="h-5 w-5" />}
                    {!["LinkedIn", "Instagram", "Twitter"].includes(account.name) && <Globe className="h-5 w-5" />}
                  </div>
                  {!["LinkedIn", "Instagram", "Twitter"].includes(account.name) && (
                    <Input
                      placeholder="Platform adı"
                      value={account.name}
                      onChange={(e) => handleSocialMediaChange(account.id, "name", e.target.value)}
                      className="underline-input"
                    />
                  )}
                  <Input
                    placeholder="Kullanıcı adı"
                    value={account.username}
                    onChange={(e) => handleSocialMediaChange(account.id, "username", e.target.value)}
                    className="underline-input"
                  />
                  <Input
                    placeholder="Takipçi sayısı"
                    type="number"
                    value={account.followers}
                    onChange={(e) => handleSocialMediaChange(account.id, "followers", e.target.value)}
                    className="underline-input"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialMedia(account.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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

