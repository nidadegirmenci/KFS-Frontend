import { useMutation } from "@tanstack/react-query"
import { users } from "../mocks/users"

interface SignUpCredentials {
  email: string
  password: string
}

interface User {
  id: number
  email: string
  password: string
  accountType: "individual" | "corporate"
  country: string
  phone: string
  isInvestor: boolean
  isEntrepreneur: boolean
  isPhoneVerified: boolean
  verificationCode: string
}

export function useSignUp() {
  return useMutation<User, Error, SignUpCredentials>({
    mutationFn: async (credentials) => {
      // Bu kısım, gerçek bir API çağrısı ile değiştirilecek
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const existingUser = users.find((u) => u.email === credentials.email)
          if (existingUser) {
            reject(new Error("Bu e-posta adresi zaten kullanılıyor"))
          } else {
            const newUser: User = {
              id: users.length + 1,
              email: credentials.email,
              password: credentials.password,
              accountType: "individual", // Varsayılan olarak bireysel hesap
              country: "TR", // Varsayılan olarak Türkiye
              phone: "", // Boş bırakılıyor, daha sonra doldurulacak
              isInvestor: false,
              isEntrepreneur: false,
              isPhoneVerified: false,
              verificationCode: Math.floor(100000 + Math.random() * 900000).toString(), // 6 haneli rastgele kod
            }
            users.push(newUser)
            resolve(newUser)
          }
        }, 1000) // 1 saniye gecikme ile API çağrısını simüle ediyoruz
      })
    },
  })
}

