import Api from "./ApiGlobal";

export type CaptchaResponse = {
    key: string;
}

  export const validateCaptcha = (key: CaptchaResponse) => {
    return Api.post("/notification/editnotificationtype", key);
  };
  