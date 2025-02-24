"use client"

import type React from "react"
import CountUp from "react-countup"
import { Banknote, Users, Briefcase, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatItemProps {
  value: number
  label: string
  icon: React.ReactNode
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon }) => (
  <Card className="bg-white shadow-lg">
    <CardContent className="flex flex-col items-center justify-center p-6">
      <div className="text-indigo-600 mb-4">{icon}</div>
      <CountUp end={value} duration={2.5} separator="," className="text-3xl font-bold text-gray-800 mb-2" />
      <p className="text-gray-600 text-center">{label}</p>
    </CardContent>
  </Card>
)

const Statistics: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">FonBul'un Etkileyici Rakamları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem value={1000000} label="Toplam Fonlama (₺)" icon={<Banknote size={40} />} />
          <StatItem value={5000} label="Üye Sayısı" icon={<Users size={40} />} />
          <StatItem value={500} label="Girişimci Sayısı" icon={<Briefcase size={40} />} />
          <StatItem value={100} label="Başarılı Proje" icon={<Award size={40} />} />
        </div>
      </div>
    </div>
  )
}

export default Statistics

