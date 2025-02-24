import ProjectCard from "./components/ProjectCard"
import ProjectSlider from "./components/ProjectSlider"
import Statistics from "./components/Statistics"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { projects } from "./mocks/projects"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <ProjectSlider projects={projects.slice(0, 5)} />
      <Statistics />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center">FonBul ile Hayallerinizi Gerçekleştirin</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Yaratıcı projeleri destekleyin, geleceği şekillendirin
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild>
            <Link href="/projects">
              Tüm Projeleri Gör
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

