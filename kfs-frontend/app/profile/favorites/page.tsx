"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "../../mocks/projects"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(projects.slice(0, 2).map((p) => ({ ...p, isFavorite: true })))

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((project) => (project.id === id ? { ...project, isFavorite: !project.isFavorite } : project)),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Favorilerim</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                  onClick={() => toggleFavorite(project.id)}
                >
                  <Heart className={`h-6 w-6 ${project.isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
              <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{project.category}</span>
                <span>{project.daysLeft} gün kaldı</span>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">
                    {Math.round((project.currentFunding / project.fundingGoal) * 100)}% Tamamlandı
                  </span>
                  <span className="text-sm">{project.backers} Destekçi</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-semibold">₺{project.currentFunding.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">Hedef: ₺{project.fundingGoal.toLocaleString()}</span>
                </div>
              </div>
            </CardFooter>
            <CardFooter className="p-4">
              <Button asChild className="w-full">
                <Link href={`/projects/${project.id}`}>Projeyi İncele</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

