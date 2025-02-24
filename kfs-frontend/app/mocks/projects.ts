export interface Project {
  id: number
  title: string
  description: string
  fundingGoal: number
  currentFunding: number
  category: string
  daysLeft: number
  backers: number
  imageUrl: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Eco-Friendly Su Şişesi",
    description: "Sürdürülebilir malzemelerden yapılmış, yeniden kullanılabilir su şişesi.",
    fundingGoal: 50000,
    currentFunding: 55000,
    category: "Çevre",
    daysLeft: 0,
    backers: 550,
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/recycle-ILkWpHh3oIV5KgykTiSkMrJR625YGb.jpeg",
  },
  {
    id: 2,
    title: "AI Destekli Dil Öğrenme Uygulaması",
    description: "Yapay zeka yardımıyla herhangi bir dili öğrenin.",
    fundingGoal: 100000,
    currentFunding: 75000,
    category: "Eğitim",
    daysLeft: 30,
    backers: 500,
    imageUrl:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
  },
  {
    id: 3,
    title: "Akıllı Kentsel Tarım Kiti",
    description: "Bu akıllı, otomatik tarım kitiyle küçük alanlarda kendi yiyeceğinizi yetiştirin.",
    fundingGoal: 75000,
    currentFunding: 45000,
    category: "Tarım",
    daysLeft: 20,
    backers: 300,
    imageUrl:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 4,
    title: "Güneş Enerjili Akıllı Saat",
    description: "Şarj etmeye gerek kalmadan güneş enerjisiyle çalışan akıllı saat.",
    fundingGoal: 200000,
    currentFunding: 150000,
    category: "Teknoloji",
    daysLeft: 25,
    backers: 1000,
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
  {
    id: 5,
    title: "Biyoplastik Ambalaj Çözümü",
    description: "Doğada çözünebilen, çevre dostu biyoplastik ambalaj teknolojisi.",
    fundingGoal: 80000,
    currentFunding: 60000,
    category: "Çevre",
    daysLeft: 18,
    backers: 400,
    imageUrl:
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 6,
    title: "Akıllı Ev Enerji Yönetim Sistemi",
    description: "Evinizin enerji tüketimini optimize eden ve tasarruf sağlayan akıllı sistem.",
    fundingGoal: 120000,
    currentFunding: 90000,
    category: "Teknoloji",
    daysLeft: 22,
    backers: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
]

