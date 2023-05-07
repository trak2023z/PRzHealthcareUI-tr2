import Api from "./ApiGlobal";

export type NotificationTypeInformation = {
    id: number;
    name: string;
    template: string;
  };

export const getNotificationTypes = () => {
    return Api.get("/notification", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };

  export const editNotificationType = (data: NotificationTypeInformation) => {
    return Api.put("/notification/editnotificationtype", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };
  