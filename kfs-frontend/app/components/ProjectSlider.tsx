"use client"

import type React from "react"
import { useState, useRef } from "react"
import Slider from "react-slick"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "../mocks/projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface ProjectSliderProps {
  projects: Project[]
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
    arrows: false,
  }

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index)
    }
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto my-8 px-4">
      <Slider ref={sliderRef} {...settings}>
        {projects.map((project, index) => (
          <div key={project.id} className="px-2">
            <Card className="overflow-hidden shadow-lg rounded-xl">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-[400px]">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-300 hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{project.category}</Badge>
                </div>
                <CardContent className="w-full md:w-1/2 p-6 bg-white relative">
                  <CardTitle className="text-2xl md:text-3xl mb-2">{project.title}</CardTitle>
                  <p className="text-sm md:text-base mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">
                      {Math.round((project.currentFunding / project.fundingGoal) * 100)}% Funded
                    </span>
                    <span className="text-sm">{project.daysLeft} days left</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">₺{project.currentFunding.toLocaleString()}</span>
                    <span className="text-sm">Goal: ₺{project.fundingGoal.toLocaleString()}</span>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <Button asChild className="group transition-all duration-300 hover:bg-primary hover:text-white">
                      <Link href={`/projects/${project.id}`}>
                        İncele!
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
      <div className="flex justify-center mt-4">
        {projects.map((_, index) => (
          <Button
            key={index}
            variant={currentSlide === index ? "default" : "outline"}
            size="sm"
            className="mx-1 rounded-full w-3 h-3 p-0"
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectSlider

