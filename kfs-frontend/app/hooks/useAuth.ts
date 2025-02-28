import { useMutation } from "@tanstack/react-query"
import { login } from "../services/auth-api"

interface LoginCredentials {
  email: string
  password: string
}

export const useLogin = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      onError(error);
    },
  })

}
