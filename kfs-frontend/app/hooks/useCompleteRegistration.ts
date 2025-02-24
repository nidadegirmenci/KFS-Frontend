import { useMutation } from "@tanstack/react-query"
import { users } from "../mocks/users"

interface RegistrationData {
  userId: number
  accountType: "individual" | "corporate"
  firstName?: string
  lastName?: string
  companyName?: string
  taxOffice?: string
  taxNumber?: string
  country: string
  phone: string
  isInvestor: boolean
  isEntrepreneur: boolean
}

export function useCompleteRegistration() {
  return useMutation<void, Error, RegistrationData>({
    mutationFn: async (data) => {
      // Bu kısım, gerçek bir API çağrısı ile değiştirilecek
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = users.findIndex((u) => u.id === data.userId)
          if (userIndex === -1) {
            reject(new Error("Kullanıcı bulunamadı"))
          } else {
            users[userIndex] = { ...users[userIndex], ...data }
            resolve()
          }
        }, 1000) // 1 saniye gecikme ile API çağrısını simüle ediyoruz
      })
    },
  })
}

