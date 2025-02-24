"use client"

import { type ReactNode, useState, useMemo } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "../components/Sidebar"
import { LayoutDashboard, User, UserPlus, BadgeDollarSign, Megaphone, Heart, Settings } from "lucide-react"

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

// Mock user data
const mockUser = {
  firstName: "John",
  lastName: "Doe",
}

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const currentPageTitle = useMemo(() => {
    const currentItem = sidebarItems.find((item) => item.href === pathname)
    return currentItem ? currentItem.label : "Profil"
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} items={sidebarItems} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white bg-opacity-70 backdrop-blur-md border-b border-gray-200 px-8 py-4">
          <h1 className="text-2xl font-bold">
            Hoşgeldiniz, {mockUser.firstName} {mockUser.lastName}
          </h1>
          <h2 className="text-xl text-gray-600 mt-2">{currentPageTitle}</h2>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}

