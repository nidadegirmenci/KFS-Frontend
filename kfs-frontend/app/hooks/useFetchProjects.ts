import { useQuery } from "@tanstack/react-query"
import { projects } from "../mocks/projects"

export function useFetchProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => new Promise((resolve) => setTimeout(() => resolve(projects), 1000)),
  })
}

