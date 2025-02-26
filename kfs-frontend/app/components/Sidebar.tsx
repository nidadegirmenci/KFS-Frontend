"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  User,
  Megaphone,
  BadgeDollarSign,
  Settings,
  UserPlus,
  Heart,
  CheckCircle2,
  FileText,
  Files,
  Image,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const sidebarItems = [
  { href: "/profile", label: "Genel Bakış", icon: LayoutDashboard },
  { href: "/profile/info", label: "Bilgilerim", icon: User },
  { href: "/profile/entrepreneur-registration", label: "Girişimci Kayıt", icon: UserPlus },
  { href: "/profile/investor-registration", label: "Yatırımcı Kayıt", icon: UserPlus },
  { href: "/profile/investments", label: "Yatırımlarım", icon: BadgeDollarSign },
  { href: "/profile/campaigns", label: "Kampanyalarım", icon: Megaphone },
  { href: "/profile/favorites", label: "Favorilerim", icon: Heart },
  { href: "/profile/settings", label: "Ayarlar", icon: Settings },
]

interface SidebarProps {
  isCollapsed: boolean
  toggleSidebar: () => void
  kampanyaId?: string
  items: {
    href: string
    label: string
    icon: LucideIcon
  }[]
}

export function Sidebar({ isCollapsed, toggleSidebar, kampanyaId, items: propItems }: SidebarProps) {
  const pathname = usePathname()

  // Campaign registration specific items
  const campaignItems = kampanyaId
    ? [
        { href: `/kampanya/${kampanyaId}/kayit/profil`, label: "Profil", icon: User },
        { href: `/kampanya/${kampanyaId}/kayit/kurulus`, label: "Kuruluş", icon: LayoutDashboard },
        { href: `/kampanya/${kampanyaId}/kayit/urun`, label: "Ürün/Hizmet", icon: BadgeDollarSign },
        { href: `/kampanya/${kampanyaId}/kayit/market`, label: "Pazar", icon: Megaphone },
        { href: `/kampanya/${kampanyaId}/kayit/finans`, label: "Finans", icon: BadgeDollarSign },
        { href: `/kampanya/${kampanyaId}/kayit/belgeler`, label: "Belgeler", icon: FileText },
        { href: `/kampanya/${kampanyaId}/kayit/gorsel`, label: "Görsel", icon: Image },
        { href: `/kampanya/${kampanyaId}/kayit/diger-belgeler`, label: "Diğer Belgeler", icon: Files },
        { href: `/kampanya/${kampanyaId}/kayit/onay`, label: "Onaya Gönder", icon: CheckCircle2 }, // Added new item
      ]
    : []

  const items = propItems || (pathname.includes("/kampanya/") ? campaignItems : sidebarItems)

  return (
    <div
      className={cn(
        "relative min-h-screen bg-white bg-opacity-70 backdrop-blur-md p-4 pt-8 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-8 z-10 rounded-full bg-white shadow-md hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </Button>
      <ScrollArea className="h-full">
        <div className="space-y-4 py-4">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-900 hover:scale-105",
                  pathname === item.href ? "bg-gray-100 text-gray-900" : "text-gray-600",
                  isCollapsed && "justify-center",
                )}
              >
                <item.icon className={cn("h-5 w-5 mr-2", isCollapsed && "mr-0")} />
                {!isCollapsed && <span>{item.label}</span>}
              </span>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

