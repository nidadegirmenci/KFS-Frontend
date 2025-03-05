"use client"

import type React from "react"
import CountUp from "react-countup"
import { Banknote, Users, Briefcase, Award } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useState, useEffect } from "react"

interface StatItemProps {
  value: number
  label: string
  icon: React.ReactNode
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Card className="bg-white shadow-lg p-6 flex flex-col items-center justify-center">
      <div className="w-24 h-24 relative mb-4">
        <CircularProgressbar
          value={progress}
          strokeWidth={8}
          styles={buildStyles({
            pathTransitionDuration: 4,
            pathColor: "#4f46e5",
            trailColor: "#e5e7eb",
            strokeLinecap: "round",
          })}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-indigo-600">{icon}</div>
        </div>
      </div>
      <CountUp end={value} duration={2.5} separator="," className="text-2xl font-bold text-gray-800 mt-2" />
      <p className="text-gray-600 text-center mt-1">{label}</p>
    </Card>
  )
}

const Statistics: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">FonBul'un Etkileyici Rakamları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem value={1000000} label="Toplam Fonlama (₺)" icon={<Banknote size={32} />} />
          <StatItem value={5000} label="Üye Sayısı" icon={<Users size={32} />} />
          <StatItem value={500} label="Girişimci Sayısı" icon={<Briefcase size={32} />} />
          <StatItem value={100} label="Başarılı Proje" icon={<Award size={32} />} />
        </div>
      </div>
    </div>
  )
}

export default Statistics
