import Api from './ApiGlobal';

export type VaccinationInformation = {
    id: number,
    name: string,
    description: string,
    photoId: number,
    photoBinary: string,
    daysBetweenVacs: number,
    isActive: boolean,
    insertedDate: Date,
    insertedAccId: number,
    modifiedDate: Date,
    modifiedAccId: number
};

export const getVaccinationList = () => {
    return Api.get('/vaccination/getall', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
  export const addVaccination = (data: VaccinationInformation) => {
    return Api.put("/vaccination/addvaccination", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };
  export const editVaccination = (data: VaccinationInformation) => {
    return Api.put("/vaccination/editvaccination", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };
  export const archiveVaccination = (data: VaccinationInformation) => {
    return Api.put("/vaccination/archivevaccination", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };
  export const unarchiveVaccination = (data: VaccinationInformation) => {
    return Api.put("/vaccination/unarchivevaccination", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };