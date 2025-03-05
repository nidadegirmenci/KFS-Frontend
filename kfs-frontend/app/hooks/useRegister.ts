import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegister , RegisterApi , UpdateRegisterApi , updateRegister } from "../services/register-api";

export const useRegister = (
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (register: RegisterApi) => createRegister(register),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });  // Kullanıcı listesi hemen güncellensin
           onSuccess(data);
        },
        onError: (error) => {
            onError(error);
        },
    });
};

export const useUpdateRegister = (
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (UpRegister: UpdateRegisterApi) => updateRegister(UpRegister),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });  // Kullanıcı listesi hemen güncellensin
            onSuccess(data);
        },
        onError: (error) => {
            onError(error);
        },
    });
};