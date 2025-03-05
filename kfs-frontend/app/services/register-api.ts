import api from './api/api-request';

export interface RegisterApi {
    email: string;
    password: string;
    code: string;
}

export interface UpdateRegisterApi {
    userId: number;
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    companyName : string;
    taxOffice: string;
    taxNumber: string;
    isLawApproved: boolean;
    userType: string;
}


export const createRegister = async (register: RegisterApi): Promise<any> => {
    return api.post('/auth/register', register);
};

export const updateRegister = async (updateRegister: UpdateRegisterApi): Promise<any> => {
    const { userId, userType, ...body } = updateRegister;
    return api.put(`/users/${userId}?userType=${userType}`, body);
};


