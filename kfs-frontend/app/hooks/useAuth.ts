import { useMutation } from "@tanstack/react-query"
import { login , LoginCredentials } from "../services/auth-api"


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
