import Api from './ApiGlobal';

export type LoginData = {
  login: string;
  password: string;
  name: string;
  atyId: number;
  token: string;
};
export type RegisterData = {
  atyId: number;
  login: string;
  password: string;
  photoBinary: string;
  firstname: string;
  secondname: string;
  lastname: string;
  dateOfBirth: Date;
  pesel: number;
  email: string;
  contactNumber: string;
};

export const loginAccount = (data: LoginData) => {
  return Api.post('/account/login', data);
};
