export interface Campaign {
  id: string
  title: string
  companyName: string
  description: string
  imageUrl: string
  status: "fonlamada" | "yakinda" | "fonlandi" | "fonlanamadi" | "sonlandirmada"
  sector: string
  category: string
  fundingGoal: number
  currentFunding: number
  daysLeft?: number
  progress: number
  isSuccessful?: boolean
}

export const campaigns: Campaign[] = [
  {
    id: "heypungi",
    title: "Heypungi Dünyaya Açılıyor",
    companyName: "DOKSANALTI DİJİTAL YAYINCILIK ANONİM ŞİRKETİ",
    description:
      "Türkiye de ailelerin en sevdiği çocuk kitap uygulaması Heypungi, global yolculuğuna başladı. Siz de bu...",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LMNgHoUE4pF1VBf7TQbMm75nFBCB8W.png",
    status: "fonlamada",
    sector: "yazilim",
    category: "teknoloji",
    fundingGoal: 1000000,
    currentFunding: 610000,
    daysLeft: 14,
    progress: 61,
  },
  {
    id: "bilge-tunga",
    title: "Bilge Tunga Dünyaya Açılıyor",
    companyName: "Tungasoft Yazılım Eğitim Ve Danışmanlık Anonim Şirketi",
    description: "Eğitici Online Mobil Platform oyunu Bilge Tunga ve diğer oyun projelerimizle kitlesel fonlamada...",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-V4rC2iSk0UCDt2ltF75TJsKLh0j6E6.png",
    status: "fonlandi",
    sector: "oyun",
    category: "teknoloji",
    fundingGoal: 500000,
    currentFunding: 547500,
    progress: 109.5,
    isSuccessful: true,
  },
]

