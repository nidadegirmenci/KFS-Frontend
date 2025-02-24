import { useParams } from "next/navigation"

export const campaignFormOrder = [
  "profil",
  "belgeler",
  "takim",
  "urun",
  "market",
  "analiz",
  "riskler",
  "fonlama",
  "kurulus",
  "finans",
  "gorsel",
  "diger-belgeler",
  "onay",
]

export const useNavigationHelpers = () => {
  const params = useParams()
  const kampanyaId = params?.kampanyaId as string

  const getPreviousPage = (currentPage: string) => {
    const currentIndex = campaignFormOrder.indexOf(currentPage)
    if (currentIndex > 0) {
      return `/kampanya/${kampanyaId}/kayit/${campaignFormOrder[currentIndex - 1]}`
    }
    return null
  }

  const getNextPage = (currentPage: string) => {
    const currentIndex = campaignFormOrder.indexOf(currentPage)
    if (currentIndex < campaignFormOrder.length - 1) {
      return `/kampanya/${kampanyaId}/kayit/${campaignFormOrder[currentIndex + 1]}`
    }
    return null
  }

  return {
    getPreviousPage,
    getNextPage,
  }
}

