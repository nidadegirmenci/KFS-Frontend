import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Target, Users, CheckCircle } from "lucide-react"
import type { Project } from "../mocks/projects"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const progress = (project.currentFunding / project.fundingGoal) * 100
  const isCompleted = progress >= 100

  return (
    <Card
      className={`overflow-hidden transition-all duration-500 transform hover:scale-[1.03] hover:shadow-xl rounded-lg ${
        isCompleted ? "border-green-500 border-2" : "border border-gray-200"
      }`}
    >
      <CardHeader className="p-0 relative group">
        <div className="relative w-full h-40">
          <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <Badge className={`absolute top-2 right-2 transition-all duration-300 transform group-hover:scale-110 ${
            isCompleted ? "bg-green-500" : "bg-blue-500"
          }`}>
            {isCompleted ? "Tamamlandı" : project.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="mb-2 flex items-center text-lg font-bold transition-colors duration-300 group-hover:text-blue-600">
          {project.title}
          {isCompleted && <CheckCircle className="ml-2 h-5 w-5 text-green-500" />}
        </CardTitle>
        <p className="text-gray-500 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-gray-500 transition-colors duration-300 group-hover:text-gray-700" />
            <span>{isCompleted ? "Tamamlandı" : `${project.daysLeft} gün kaldı`}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-gray-500 transition-colors duration-300 group-hover:text-gray-700" />
            <span>{project.backers} destekçi</span>
          </div>
        </div>
        <Progress value={progress} className="mb-4 bg-gray-200" />
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="font-semibold text-gray-800">₺{project.currentFunding.toLocaleString()}</span>
          <span className="text-gray-500 flex items-center transition-colors duration-300 group-hover:text-gray-700">
            <Target className="w-4 h-4 mr-1" />
            Hedef: ₺{project.fundingGoal.toLocaleString()}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition-all duration-300 rounded-full shadow-lg transform hover:scale-[1.05]"
        >
          <Link href={`/projects/${project.id}`} className="flex items-center justify-center w-full">
            {isCompleted ? "Başarı Hikayesini Oku" : "Projeyi İncele"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
