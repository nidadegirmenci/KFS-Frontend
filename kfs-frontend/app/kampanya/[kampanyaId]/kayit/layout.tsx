"use client"

import { type ReactNode, useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Menu,
  Users,
  Package,
  BarChart2,
  PieChart,
  AlertTriangle,
  DollarSign,
  Building,
  FileSpreadsheet,
  Image,
  File,
  Eye,
  Gift,
  Briefcase,
  CheckCircle2,
} from "lucide-react"

const sidebarItems = [
  { href: "profil", label: "Kampanya Profili", icon: Briefcase },
  { href: "belgeler", label: "Belge/Ödül/Hukuk", icon: Gift },
  { href: "takim", label: "Takım", icon: Users },
  { href: "urun", label: "Ürün/Üretim Modeli", icon: Package },
  { href: "market", label: "Market/Rekabet/Hedef", icon: BarChart2 },
  { href: "analiz", label: "Analizler", icon: PieChart },
  { href: "riskler", label: "Riskler", icon: AlertTriangle },
  { href: "fonlama", label: "Fonlama", icon: DollarSign },
  { href: "kurulus", label: "Kuruluş", icon: Building },
  { href: "finans", label: "Finansal Tablolar", icon: FileSpreadsheet },
  { href: "gorsel", label: "Görseller", icon: Image },
  { href: "diger-belgeler", label: "Diğer Belgeler", icon: File },
  { href: "onay", label: "Onaya Gönder", icon: CheckCircle2 },
  { href: "onizleme", label: "Önizleme", icon: Eye }, // Added back Önizleme
]

export default function KampanyaKayitLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { kampanyaId: string }
}) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const pathname = usePathname()

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible)

  const currentPageTitle = useMemo(() => {
    const currentItem = sidebarItems.find((item) => pathname.includes(item.href))
    return currentItem ? currentItem.label : "Kampanya Kaydı"
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out",
          isSidebarVisible ? "w-64" : "w-0",
        )}
      >
        <ScrollArea className="h-screen p-4">
          <div className="space-y-4 pt-14">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={`/kampanya/${params.kampanyaId}/kayit/${item.href}`}>
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-900 hover:scale-105",
                    pathname.includes(item.href) ? "bg-gray-100 text-gray-900" : "text-gray-600",
                  )}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          isSidebarVisible ? "ml-64" : "ml-0",
        )}
      >
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center sticky top-0 z-30">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mr-4 hover:bg-gray-100"
                  onClick={toggleSidebar}
                >
                  <Menu size={24} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Menü</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <h2 className="text-xl text-gray-600">{currentPageTitle}</h2>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}

