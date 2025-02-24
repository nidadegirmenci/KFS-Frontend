import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { users } from "../mocks/users"

interface LoginCredentials {
  email: string
  password: string
}

interface User {
  id: number
  email: string
  firstName?: string
  lastName?: string
}

export function useLogin() {
  const queryClient = useQueryClient()

  const query = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: () => {
      const storedUser = localStorage.getItem("user")
      return storedUser ? (JSON.parse(storedUser) as User) : null
    },
  })

  const loginMutation = useMutation<User, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = users.find((u) => u.email === credentials.email && u.password === credentials.password)
          if (user) {
            const { password, ...userWithoutPassword } = user
            localStorage.setItem("user", JSON.stringify(userWithoutPassword))
            resolve(userWithoutPassword as User)
          } else {
            reject(new Error("Geçersiz e-posta veya şifre"))
          }
        }, 1000)
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data)
    },
  })

  

  return {
    ...query,
    login: loginMutation.mutate,
    isPending: loginMutation.isPending,
    error: loginMutation.error,
   
  }
}
