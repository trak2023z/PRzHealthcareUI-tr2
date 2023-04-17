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

export type UserData = {
  id: number
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
  isActive: boolean;
  insertedDate: Date;
  modifiedDate: Date;
}
export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};
export type ResetPasswordData = {
  email: string
}

export const loginAccount = (data: LoginData) => {
  return Api.post('/account/login', data);
};

export const registerAccount = (data: RegisterData) => {
  return Api.post('/account/register', data);
}
export const confirmAccount = (hashCode: string | null) => {
  return Api.get('/account/confirm-mail',{
    params: {hashCode}
  });
}

export const getDoctors = () => {
  return Api.get('/account/getdoctorslist', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
}
export const changePassword = (data: ChangePasswordData) => {
  return Api.put('/account/changepassword', data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};
export const resetPassword = (email: string) => {
  return Api.put('/account/reset-password', {
    email: email,
  });
};
export const resetPasswordCheckHashCode = (data: string) => {
  return Api.put('/account/reset-passwordcheck', data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// export const getUserData = () => {
//   return Api.get('/account/getdata', {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//   });
// };