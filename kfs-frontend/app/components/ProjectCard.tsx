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
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${isCompleted ? "border-green-500 border-2" : ""}`}
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <Badge className={`absolute top-2 right-2 ${isCompleted ? "bg-green-500" : ""}`}>
            {isCompleted ? "Tamamlandı" : project.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="mb-2 flex items-center">
          {project.title}
          {isCompleted && <CheckCircle className="ml-2 h-5 w-5 text-green-500" />}
        </CardTitle>
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{isCompleted ? "Tamamlandı" : `${project.daysLeft} gün kaldı`}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{project.backers} destekçi</span>
          </div>
        </div>
        <Progress value={progress} className="mb-4" />
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="font-semibold">₺{project.currentFunding.toLocaleString()}</span>
          <span className="text-muted-foreground flex items-center">
            <Target className="w-4 h-4 mr-1" />
            Hedef: ₺{project.fundingGoal.toLocaleString()}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition-all duration-300 rounded-full"
        >
          <Link href={`/projects/${project.id}`} className="flex items-center justify-center w-full">
            {isCompleted ? "Başarı Hikayesini Oku" : "Projeyi İncele"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

