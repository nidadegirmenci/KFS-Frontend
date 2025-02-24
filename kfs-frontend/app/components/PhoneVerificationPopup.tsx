import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhoneVerificationPopupProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (code: string) => void
  phone: string
}

export function PhoneVerificationPopup({ isOpen, onClose, onVerify, phone }: PhoneVerificationPopupProps) {
  const [verificationCode, setVerificationCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onVerify(verificationCode)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Telefon Numarası Doğrulama</DialogTitle>
          <DialogDescription>
            Lütfen {phone} numaralı telefonunuza gönderilen 6 haneli doğrulama kodunu girin.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="verificationCode" className="text-right">
                Kod
              </Label>
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="col-span-3"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Doğrula</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

