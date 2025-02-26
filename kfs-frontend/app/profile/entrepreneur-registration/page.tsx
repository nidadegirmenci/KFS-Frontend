"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { FileUpload } from "../../components/ui/file-upload"
import "./styles/custom-inputs.css"

export default function EntrepreneurRegistrationPage() {
  const [formData, setFormData] = useState({
    // Pre-filled data (simulated)
    image: null as File | null,  // Dosya olabileceği için tipi belirttik
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+90 555 123 4567",
    tcKimlikNo: "12345678901", // Placeholder 11-digit number
    birthDate: "1990-01-01",
    website: "https://johndoe.com",
    gender: "male",
    academicTitle: "other",
  
    // New fields
    country: "",
    city: "",
    district: "",
    postalCode: "",
    address: "",
    educationLevel: "",
    profession: "",
    sector: "",
    expertise: "",
    workExperience: "",
    cv: null as File | null,  // CV de bir dosya olduğu için
    bankName: "",
    iban: "",
    nationality: "",
  })
  

  const [countries, setCountries] = useState<{ name: string; code: string }[]>([])

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((response) => response.json())
      .then((data) => {
        const sortedCountries = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
          }))
          .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))

        const turkeyIndex = sortedCountries.findIndex((c: { code: string }) => c.code === "TR")
        if (turkeyIndex > -1) {
          const [turkey] = sortedCountries.splice(turkeyIndex, 1)
          sortedCountries.unshift(turkey)
        }

        setCountries(sortedCountries)
      })
      .catch((error) => console.error("Error fetching countries:", error))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileSelect = (file: File | null, fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Girişimci Kayıt Formu</CardTitle>
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
              <label htmlFor="phone">Telefon</label>
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
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="website">Web Sitesi</label>
            </div>
            <div className="form-group">
              <select
                name="gender"
                value={formData.gender}
                onChange={(e) => handleSelectChange(e.target.value, "gender")}
                className="underline-select"
              >
                <option value="" disabled hidden></option>
                <option value="male">Erkek</option>
                <option value="female">Kadın</option>
                <option value="other">Belirtmek İstemiyorum</option>
              </select>
              <label htmlFor="gender">Cinsiyet</label>
            </div>
            <div className="form-group">
              <select
                name="academicTitle"
                value={formData.academicTitle}
                onChange={(e) => handleSelectChange(e.target.value, "academicTitle")}
                className="underline-select"
              >
                <option value="" disabled hidden></option>
                <option value="other">Mevcut Değil</option>
                <option value="ogretim_gorevlisi">Öğretim Görevlisi</option>
                <option value="arastirma_gorevlisi">Araştırma Görevlisi</option>
                <option value="doktor">Doktor</option>
                <option value="doktor_ogretim_uyesi">Doktor Öğretim Üyesi</option>
                <option value="doktor_phd">Doktor (PhD)</option>
                <option value="docent">Doçent</option>
                <option value="docent_doktor">Doçent Doktor</option>
                <option value="profesor">Profesör</option>
                <option value="profesor_doktor">Profesör Doktor</option>
              </select>
              <label htmlFor="academicTitle">Akademik Ünvan</label>
            </div>
            <div className="form-group">
              <select
                name="nationality"
                value={formData.nationality}
                onChange={(e) => handleSelectChange(e.target.value, "nationality")}
                className="underline-select"
              >
                <option value="" disabled hidden></option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <label htmlFor="nationality">Uyruk</label>
            </div>
            <div className="form-group">
              <select
                name="country"
                value={formData.country}
                onChange={(e) => handleSelectChange(e.target.value, "country")}
                className="underline-select"
              >
                <option value="" disabled hidden></option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <label htmlFor="country">Ülke</label>
            </div>
            <div className="form-group">
              <input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="city">Şehir</label>
            </div>
            <div className="form-group">
              <input
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="district">İlçe</label>
            </div>
            <div className="form-group">
              <input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="underline-input"
                placeholder=" "
              />
              <label htmlFor="postalCode">Posta Kodu</label>
            </div>
            <div className="form-group md:col-span-2">
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="underline-textarea"
                placeholder=" "
              />
              <label htmlFor="address">Adres</label>
            </div>
            <div className="form-group">
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={(e) => handleSelectChange(e.target.value, "educationLevel")}
                className="underline-select"
              >
                <option value="" disabled hidden></option>
                <option value="primary">İlköğretim</option>
                <option value="secondary">Ortaöğretim</option>
                <option value="highschool">Lise</option>
                <option value="vocational">Meslek Yüksekokulu</option>

                <option value="bachelor">Lisans</option>
                <option value="master">Yüksek Lisans</option>
                <option value="phd">Doktora</option>
              </select>
              <label htmlFor="educationLevel">Eğitim Durumu</label>
            </div>
            <div className="form-group">
              <select
                name="profession"
                value={formData.profession}
                onChange={(e) => handleSelectChange(e.target.value, "profession")}
                className="underline-select"
              >
                <option value="" disabled hidden></option>
                <option value="engineer">Mühendis</option>
                <option value="teacher">Öğretmen</option>
                <option value="doctor">Doktor</option>
                <option value="other">Diğer</option>
              </select>
              <label htmlFor="profession">Meslek</label>
            </div>
            <div className="form-group">
              <select
                name="sector"
                value={formData.sector}
                onChange={(e) => handleSelectChange(e.target.value, "sector")}
                className="underline-select"
              >
                <option value="" disabled hidden></option>
                <option value="technology">Teknoloji</option>
                <option value="education">Eğitim</option>
                <option value="health">Sağlık</option>
                <option value="finance">Finans</option>
                <option value="other">Diğer</option>
              </select>
              <label htmlFor="sector">Faaliyet Gösterdiği Sektör</label>
            </div>
            <div className="form-group md:col-span-2">
              <textarea
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                className="underline-textarea"
                placeholder=" "
              />
              <label htmlFor="expertise">Uzmanlık Alanları</label>
            </div>
            <div className="form-group md:col-span-2">
              <textarea
                id="workExperience"
                name="workExperience"
                value={formData.workExperience}
                onChange={handleInputChange}
                className="underline-textarea"
                placeholder=" "
              />
              <label htmlFor="workExperience">İş Deneyimleri</label>
            </div>
            <div className="form-group md:col-span-2">
              <div className="flex items-center space-x-2">
                <input
                  id="cv"
                  type="text"
                  placeholder="Dosya seçilmedi"
                  value={formData.cv instanceof File ? formData.cv.name : ""}
                  readOnly
                  className="underline-input"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                    Belge Yükle
                  </div>
                </label>
                <input
                  id="cv-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null, "cv")}
                />
              </div>
              <label htmlFor="cv">Özgeçmiş</label>
            </div>
            <div className="form-group">
              <select
                name="bankName"
                value={formData.bankName}
                onChange={(e) => handleSelectChange(e.target.value, "bankName")}
                className="underline-select"
              >
                <option value="" disabled hidden></option>
                <option value="ziraat">Ziraat Bankası</option>
                <option value="isbank">İş Bankası</option>
                <option value="akbank">Akbank</option>
                <option value="garanti">Garanti BBVA</option>
                <option value="yapi_kredi">Yapı Kredi</option>
              </select>
              <label htmlFor="bankName">Banka Adı</label>
            </div>
            <div className="form-group">
              <input
                id="iban"
                name="iban"
                value={formData.iban}
                onChange={handleInputChange}

                className="underline-input"
              />
              <label htmlFor="iban">IBAN</label>
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

