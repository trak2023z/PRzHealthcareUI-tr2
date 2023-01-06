import Api from './ApiGlobal';

export type LoginData = {
  login: string;
  password: string;
  name: string;
  atyId: number;
  token: string;
};

export const loginAccount = (data: LoginData) => {
  return Api.post('/account/login', data);
};
