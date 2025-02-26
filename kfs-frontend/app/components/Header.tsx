"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ChevronDown, User } from "lucide-react"
import MobileMenu from "./mobile-menu"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useLogin } from "../hooks/useLogin"
import { useLogout } from "../hooks/useLogout"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: user, isSuccess: isAuthenticated } = useLogin()
  const { logout } = useLogout()

  return (
    <header className="bg-background border-b border-gray-200 dark:border-gray-700 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="text-2xl font-bold text-primary uppercase">
              FonBul
            </Link>
          </div>
          <div className="hidden md:flex md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Investor Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="uppercase">
                  YATIRIMCI <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/kampanyalar">YATIRIM YAP</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/investor/help-center">YARDIM MERKEZİ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/investor/how-to-invest">NASIL YATIRIMCI OLUNUR</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/investor/how-to-earn">NASIL KAZANÇ SAĞLARIM</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Entrepreneur Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="uppercase">
                  GİRİŞİMCİ <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/kampanya">KAMPANYA BAŞLAT</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/entrepreneur/help-center">YARDIM MERKEZİ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/entrepreneur/access-finance">FİNANSMANA NASIL ULAŞIRIM</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Authentication Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profilim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/investments">Yatırımlarım</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/campaigns">Kampanyalarım</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/favorites">Favorilerim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/settings">Ayarlar</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Çıkış Yap</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">GİRİŞ YAP</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/sign-up">KAYIT OL</Link>
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <span className="sr-only">Menüyü aç</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </header>
  )
}

export default Header
