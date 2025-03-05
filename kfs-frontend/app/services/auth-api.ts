import api from "./api/api-request"


export interface LoginCredentials {
  email: string
  password: string
}


export const login = async (credentials: LoginCredentials): Promise<any> => {
  return api.post(`/auth/login`, credentials)
}
