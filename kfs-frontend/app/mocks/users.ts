export interface User {
  id: number
  email: string
  password: string
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
  isPhoneVerified: boolean
  verificationCode: string
}

export const users: User[] = [
  {
    id: 1,
    email: "john@example.com",
    password: "password123",
    accountType: "individual",
    firstName: "John",
    lastName: "Doe",
    country: "TR",
    phone: "05551234567",
    isInvestor: true,
    isEntrepreneur: false,
    isPhoneVerified: true,
    verificationCode: "123456",
  },
  {
    id: 2,
    email: "jane@example.com",
    password: "password456",
    accountType: "corporate",
    companyName: "Tech Innovations Ltd.",
    taxOffice: "Istanbul",
    taxNumber: "1234567890",
    country: "TR",
    phone: "05559876543",
    isInvestor: false,
    isEntrepreneur: true,
    isPhoneVerified: false,
    verificationCode: "654321",
  },
  {
    id: 3,
    email: "mehmet@example.com",
    password: "sifre123",
    accountType: "individual",
    firstName: "Mehmet",
    lastName: "Yılmaz",
    country: "TR",
    phone: "05551112233",
    isInvestor: true,
    isEntrepreneur: true,
    isPhoneVerified: false,
    verificationCode: "789012",
  },
  {
    id: 4,
    email: "ayse@example.com",
    password: "guvenli456",
    accountType: "individual",
    firstName: "Ayşe",
    lastName: "Kaya",
    country: "TR",
    phone: "05559876543",
    isInvestor: false,
    isEntrepreneur: true,
    isPhoneVerified: true,
    verificationCode: "345678",
  },
  {
    id: 5,
    email: "tech_startup@example.com",
    password: "startup789",
    accountType: "corporate",
    companyName: "Tech Startup A.Ş.",
    taxOffice: "Ankara",
    taxNumber: "9876543210",
    country: "TR",
    phone: "03121234567",
    isInvestor: false,
    isEntrepreneur: true,
    isPhoneVerified: false,
    verificationCode: "901234",
  },
  {
    id: 6,
    email: "yatirimci@example.com",
    password: "yatirim000",
    accountType: "individual",
    firstName: "Ali",
    lastName: "Veli",
    country: "TR",
    phone: "05553334444",
    isInvestor: true,
    isEntrepreneur: false,
    isPhoneVerified: true,
    verificationCode: "567890",
  },
  {
    id: 7,
    email: "newuser@example.com",
    password: "newpass123",
    accountType: "individual",
    country: "TR",
    phone: "05557778888",
    isInvestor: false,
    isEntrepreneur: false,
    isPhoneVerified: false,
    verificationCode: "123789",
  },
]

