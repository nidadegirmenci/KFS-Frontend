import api from './api/api-request';

export interface MailApi {
    email: string;
}

export const sendVerificationMail = async (mail: MailApi): Promise<any> => {
    return api.post('/auth/send-verification-email', mail);
};