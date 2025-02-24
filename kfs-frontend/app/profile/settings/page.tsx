"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Bell, Lock, UserCircle, CreditCard, LogOut, Smartphone, Mail, BellRing } from "lucide-react"
import "../entrepreneur-registration/styles/custom-inputs.css"

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showProfileImage, setShowProfileImage] = useState(true)
  const [showNameSurname, setShowNameSurname] = useState(true)
  const [listInInvestors, setListInInvestors] = useState(true)
  const [emailPromotions, setEmailPromotions] = useState(true)
  const [smsPromotions, setSmsPromotions] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [systemUpdates, setSystemUpdates] = useState(true)

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement password change logic here
    console.log("Password change requested")
  }

  const handleAccountDeletion = () => {
    // Implement account deletion logic here
    console.log("Account deletion requested")
  }

  const updateSettings = useCallback((setting: string, value: boolean) => {
    // Bu fonksiyon, ayarları backend'e gönderecek
    console.log(`Updating setting: ${setting} to ${value}`)
    // Burada API çağrısı yapılacak
  }, [])

  useEffect(() => {
    updateSettings("showProfileImage", showProfileImage)
  }, [showProfileImage, updateSettings])

  useEffect(() => {
    updateSettings("showNameSurname", showNameSurname)
  }, [showNameSurname, updateSettings])

  useEffect(() => {
    updateSettings("listInInvestors", listInInvestors)
  }, [listInInvestors, updateSettings])

  useEffect(() => {
    updateSettings("emailPromotions", emailPromotions)
  }, [emailPromotions, updateSettings])

  useEffect(() => {
    updateSettings("smsPromotions", smsPromotions)
  }, [smsPromotions, updateSettings])

  useEffect(() => {
    updateSettings("pushNotifications", pushNotifications)
  }, [pushNotifications, updateSettings])

  useEffect(() => {
    updateSettings("systemUpdates", systemUpdates)
  }, [systemUpdates, updateSettings])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ayarlar</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="security">
            <AccordionTrigger>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Güvenlik & Girişler
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="password">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Şifreyi Güncelle
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="underline-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Yeni Şifre</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="underline-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="underline-input"
                        />
                      </div>
                      <Button type="submit">Şifreyi Değiştir</Button>
                    </form>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="edevlet">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <UserCircle className="w-4 h-4 mr-2" />
                      E-devlet Doğrulaması
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>E-devlet doğrulaması başarıyla tamamlanmıştır.</p>
                      <div className="space-y-2">
                        <Label htmlFor="tcNumber">T.C. Kimlik Numarası</Label>
                        <Input
                          id="tcNumber"
                          type="text"
                          value="12345678901" // Bu değer gerçek TC numarası ile değiştirilmeli
                          disabled
                          className="underline-input"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="logins">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Hesap Girişleri
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Son Girişler</h3>
                      <ul className="space-y-2">
                        <li>01.05.2023 14:30 - İstanbul, Türkiye</li>
                        <li>28.04.2023 09:15 - Ankara, Türkiye</li>
                        <li>25.04.2023 18:45 - İzmir, Türkiye</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delete">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Hesap Silme
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-red-600 font-semibold">Uyarı: Hesap silme işlemi geri alınamaz!</p>
                      <p>
                        Hesabınızı silmek istediğinizden emin misiniz? Bu işlem tüm verilerinizi kalıcı olarak
                        silecektir.
                      </p>
                      <Button onClick={handleAccountDeletion} variant="destructive">
                        Hesabımı Sil
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="privacy">
            <AccordionTrigger>
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Gizlilik & Bildirim
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <UserCircle className="w-5 h-5 mr-2" />
                  Gizlilik
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showProfileImage">Profil görselim gösterilsin</Label>
                    <Switch id="showProfileImage" checked={showProfileImage} onCheckedChange={setShowProfileImage} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showNameSurname">Ad/soyad bilgilerim gösterilsin</Label>
                    <Switch id="showNameSurname" checked={showNameSurname} onCheckedChange={setShowNameSurname} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="listInInvestors">Profilim kayıtlı yatırımcılar sayfasında listelensin</Label>
                    <Switch id="listInInvestors" checked={listInInvestors} onCheckedChange={setListInInvestors} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold flex items-center">
                  <BellRing className="w-5 h-5 mr-2" />
                  Bildirimler
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailPromotions" className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Yeni girişimler, yayınlar ve fırsatlarla ilgili tanıtım mailleri almak istiyorum
                    </Label>
                    <Switch id="emailPromotions" checked={emailPromotions} onCheckedChange={setEmailPromotions} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsPromotions" className="flex items-center">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Yeni girişimler, yayınlar ve fırsatlarla ilgili tanıtım SMS'leri almak istiyorum
                    </Label>
                    <Switch id="smsPromotions" checked={smsPromotions} onCheckedChange={setSmsPromotions} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications" className="flex items-center">
                      <Bell className="w-4 h-4 mr-2" />
                      Yeni girişimler, yayınlar ve fırsatlarla ilgili tanıtım bildirimleri almak istiyorum
                    </Label>
                    <Switch id="pushNotifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="systemUpdates" className="flex items-center">
                      <BellRing className="w-4 h-4 mr-2" />
                      fonbul.com sistem geliştirmelerinden haberdar olmak istiyorum
                    </Label>
                    <Switch id="systemUpdates" checked={systemUpdates} onCheckedChange={setSystemUpdates} />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

