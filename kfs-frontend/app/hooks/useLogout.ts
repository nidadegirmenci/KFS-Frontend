"use client"

import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const logout = () => {
    // Clear local storage
    localStorage.removeItem("user")

    // Clear query cache and invalidate user queries
    queryClient.setQueryData(["user"], null)
    queryClient.invalidateQueries({ queryKey: ["user"] })


    // Navigate to home page
    router.push("/")
  }

  return { logout }
}
