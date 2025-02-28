"use client"

import type { FC } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { useLogin } from "../hooks/useAuth"
import { useQueryClient } from "@tanstack/react-query"
import { useLogout } from "../hooks/useLogout"


interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const { data: user, isSuccess: isAuthenticated } = useLogin()
  const queryClient = useQueryClient()
  const { logout } = useLogout()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-left">MENU</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {/* Investor Section - Always visible */}
            <AccordionItem value="investor">
              <AccordionTrigger className="uppercase">YATIRIMCI</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                    <Link href="/kampanyalar" className="uppercase">
                      YATIRIM YAP
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                    <Link href="/investor/help-center" className="uppercase">
                      YARDIM MERKEZİ
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                    <Link href="/investor/how-to-invest" className="uppercase">
                      NASIL YATIRIMCI OLUNUR
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                    <Link href="/investor/how-to-earn" className="uppercase">
                      NASIL KAZANÇ SAĞLARIM
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Entrepreneur Section - Always visible */}
            <AccordionItem value="entrepreneur">
              <AccordionTrigger className="uppercase">GİRİŞİMCİ</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                    <Link href="/kampanya" className="uppercase">
                      KAMPANYA BAŞLAT
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                    <Link href="/entrepreneur/help-center" className="uppercase">
                      YARDIM MERKEZİ
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                    <Link href="/entrepreneur/access-finance" className="uppercase">
                      FİNANSMANA NASIL ULAŞIRIM
                    </Link>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* User Profile Section - Only visible when authenticated */}
            {isAuthenticated && (
              <AccordionItem value="profile">
                <AccordionTrigger className="uppercase">PROFİLİM</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                      <Link href="/profile">PROFİLİM</Link>
                    </Button>
                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                      <Link href="/profile/investments">YATIRIMLARIM</Link>
                    </Button>
                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                      <Link href="/profile/campaigns">KAMPANYALARIM</Link>
                    </Button>
                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                      <Link href="/profile/favorites">FAVORİLERİM</Link>
                    </Button>
                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start">
                      <Link href="/profile/settings">AYARLAR</Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          {/* Auth Buttons or Logout */}
          {isAuthenticated ? (
            <Button
              variant="ghost"
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="justify-start uppercase"
            >
              ÇIKIŞ YAP
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start uppercase">
                <Link href="/sign-in">GİRİŞ YAP</Link>
              </Button>
              <Button variant="ghost" asChild onClick={() => setIsOpen(false)} className="justify-start uppercase">
                <Link href="/sign-up">KAYIT OL</Link>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu

