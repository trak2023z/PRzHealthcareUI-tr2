import Api from "./ApiGlobal";

export type EventInformation = {
  id: number;
  accId: number;
  dateFrom: Date;
  timeFrom: string;
  dateTo: Date;
  timeTo: string;
  type: number;
  doctorId: number;
  vacId: number;
  description: string;
  isActive: boolean;
  insertedDate: Date;
  insertedAccId: number;
  modifiedDate: Date;
  modifiedAccId: number;
};

export type EventBasicInformation = {
  dateFrom: String;
  doctorId: String;
};

export const getUserEvents = (accountId: Number) => {
  return Api.get("/event/getuserevents", {
    params: { accountId },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
export const getNurseEvents = (accountId: Number) => {
  return Api.get("/event/getnurseevents", {
    params: { accountId },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getAvailableDays = (
  selectedDate: String,
  selectedDoctorId: String
) => {
  return Api.get("/event/getavailabledates", {
    params: { selectedDate, selectedDoctorId },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
export const takeEventTerm = (data: EventInformation) => {
  return Api.patch("/event/takeeventterm", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
export const finishEventTerm = (data: EventInformation) => {
  return Api.patch("/event/finishterm", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
export const cancelEventTerm = (data: EventInformation) => {
  return Api.patch("/event/cancelterm", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};