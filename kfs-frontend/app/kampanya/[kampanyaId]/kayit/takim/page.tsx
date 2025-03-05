"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams} from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { TextEditor } from "@/app/components/ui/text-editor"
import {
  Plus,
  Upload,
  X,
  HelpCircle,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  ChevronRight,
  ChevronLeft

} from "lucide-react"
import { useNavigationHelpers } from "../utils/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"

interface PopoverTooltipProps {
  content: string | React.ReactNode
  className?: string
}

function PopoverTooltip({ content, className }: PopoverTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <HelpCircle className={`h-4 w-4 text-blue-500 cursor-pointer ${className}`} />
      </PopoverTrigger>
      <PopoverContent className="w-80 text-sm">{content}</PopoverContent>
    </Popover>
  )
}

interface TeamMember {
  id: string
  name: string
  surname: string
  position: string
  biography: string
  responsibilities: string
  expertise: string
  relationship: string
  email: string
  instagram: string
  twitter: string
  linkedin: string
  photo: File | null
  cv: File | null
}

const MAX_BIOGRAPHY_LENGTH = 2000
const MAX_TEXT_LENGTH = 500

export default function TakimPage() {
  const router = useRouter()
  const { getPreviousPage, getNextPage } = useNavigationHelpers()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const params = useParams<{ kampanyaId: string }>() // useParams ile kampanyaId al
  const kampanyaId = params?.kampanyaId || "" // ID yoksa boş string ata

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "",
      surname: "",
      position: "",
      biography: "",
      responsibilities: "",
      expertise: "",
      relationship: "",
      email: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      photo: null,
      cv: null,
    }
    setTeamMembers([...teamMembers, newMember])
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0] || null
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, photo: file } : member)))
  }

  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0] || null
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, cv: file } : member)))
  }

  const handleInputChange = (id: string, field: keyof TeamMember, value: string, maxLength?: number) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id
          ? {
            ...member,
            [field]: maxLength ? value.slice(0, maxLength) : value,
          }
          : member,
      ),
    )
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const handlePreviousPage = () => {
    const previousPage = getPreviousPage("takim")
    if (previousPage) {
      router.push(previousPage)
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Form verisini oluştur
    const formData = {
      teamMembers,
    };
  
    console.log("Form Data:", formData); // Debugging için
  
    // Burada formData'yı API'ye göndermek için fetch veya axios kullanılabilir
  
    const nextPage = getNextPage("takim"); // Bir sonraki sayfa yolunu al
    if (nextPage) {
      router.push(nextPage); // Kullanıcıyı bir sonraki sayfaya yönlendir
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Takım Üyeleri</CardTitle>
              <PopoverTooltip content="Girişiminizin takım üyelerini ve bilgilerini buraya ekleyebilirsiniz." />
            </div>
            <Button onClick={addTeamMember} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Üye Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {teamMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column: Name, Surname, Position, and CV Upload */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${member.id}`}>Ad</Label>
                        <Input
                          id={`name-${member.id}`}
                          value={member.name}
                          onChange={(e) => handleInputChange(member.id, "name", e.target.value)}
                          placeholder=""
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`surname-${member.id}`}>Soyad</Label>
                        <Input
                          id={`surname-${member.id}`}
                          value={member.surname}
                          onChange={(e) => handleInputChange(member.id, "surname", e.target.value)}
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`position-${member.id}`}>Pozisyon/Ünvan</Label>
                      <Input
                        id={`position-${member.id}`}
                        value={member.position}
                        onChange={(e) => handleInputChange(member.id, "position", e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Özgeçmiş</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleCVChange(e, member.id)}
                          className="hidden"
                          id={`cv-${member.id}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => document.getElementById(`cv-${member.id}`)?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {member.cv ? member.cv.name : "Özgeçmiş Yükle"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right column: Photo Upload and Preview */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Fotoğraf</Label>
                      <div className="flex flex-col items-center gap-2">
                        {member.photo && (
                          <div className="w-32 h-32 rounded-full overflow-hidden">
                            <img
                              src={URL.createObjectURL(member.photo) || "/placeholder.svg"}
                              alt={`${member.name} ${member.surname}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoChange(e, member.id)}
                          className="hidden"
                          id={`photo-${member.id}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-center"
                          onClick={() => document.getElementById(`photo-${member.id}`)?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {member.photo ? "Fotoğrafı Değiştir" : "Fotoğraf Yükle"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Existing fields (full width) */}
                  <div className="md:col-span-3 space-y-6">
                    {/* Biography */}
                    <div className="space-y-2">
                      <Label>Kısa Biyografi</Label>
                      <TextEditor
                        value={member.biography}
                        onChange={(newValue) => handleInputChange(member.id, "biography", newValue, MAX_BIOGRAPHY_LENGTH)}
                        maxLength={MAX_BIOGRAPHY_LENGTH}
                      />
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-2">
                      <Label>Şirkette Üstlendiği Görev ve Sorumluluklar</Label>
                      <TextEditor
                        value={member.responsibilities}
                        onChange={(newValue) => handleInputChange(member.id, "responsibilities", newValue, MAX_TEXT_LENGTH)}
                        maxLength={MAX_TEXT_LENGTH}
                      />
                    </div>


                    {/* Expertise */}
                    <div className="space-y-2">
                      <Label>Uzmanlık Alanı ve Profesyonel Tecrübesi</Label>
                      <TextEditor
                        value={member.expertise}
                        onChange={(newValue) => handleInputChange(member.id, "expertise", newValue, MAX_TEXT_LENGTH)}
                        maxLength={MAX_TEXT_LENGTH}
                      />
                    </div>

                    {/* Relationship */}
                    <div className="space-y-2">
                      <Label>Girişimci ile İlişkisinin Kaynağı</Label>
                      <TextEditor
                        value={member.relationship}
                        onChange={(newValue) => handleInputChange(member.id, "relationship", newValue, MAX_TEXT_LENGTH)}
                        maxLength={MAX_TEXT_LENGTH}
                      />
                    </div>


                    {/* Social Media */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>E-Posta</Label>
                        <div className="relative">
                          <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            value={member.email}
                            onChange={(e) => handleInputChange(member.id, "email", e.target.value)}
                            className="pl-8"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Instagram</Label>
                        <div className="relative">
                          <Instagram className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={member.instagram}
                            onChange={(e) => handleInputChange(member.id, "instagram", e.target.value)}
                            className="pl-8"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Twitter</Label>
                        <div className="relative">
                          <Twitter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={member.twitter}
                            onChange={(e) => handleInputChange(member.id, "twitter", e.target.value)}
                            className="pl-8"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>LinkedIn</Label>
                        <div className="relative">
                          <Linkedin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            value={member.linkedin}
                            onChange={(e) => handleInputChange(member.id, "linkedin", e.target.value)}
                            className="pl-8"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>

                    {/* Remove Member Button */}
                    <div className="flex justify-end">
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeTeamMember(member.id)}>
                        <X className="h-4 w-4 mr-2" />
                        Üyeyi Kaldır
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" size="lg" onClick={handlePreviousPage}>
           <ChevronLeft className="w-4 h-4 ml-2" />
          Önceki Forma Dön
        </Button>
        <Button type="submit" size="lg" onClick={handleSubmit}>
          Kaydet ve İlerle
           <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

