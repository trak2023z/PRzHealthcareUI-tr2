import Api from './ApiGlobal';

export type ResetPasswordNotification = {
  reminderEmail: string;
};

export const postResetPasswordNotification = (
  data: ResetPasswordNotification
) => {
  return Api.post('/notification/resetpassword', data, {
    headers: { 'Content-Type': 'application/json' }
  });
};