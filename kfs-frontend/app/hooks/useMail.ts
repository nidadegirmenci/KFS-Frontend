import { useMutation } from "@tanstack/react-query";
import { sendVerificationMail , MailApi } from "../services/mail-api"


export const useMail = (
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    return useMutation({
        mutationFn: (mail: MailApi) => sendVerificationMail(mail),
        onSuccess: (data) => {
            onSuccess(data);
        },
        onError: (error) => {
            onError(error);
        },
    })
}
