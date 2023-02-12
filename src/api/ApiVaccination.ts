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
    return Api.get('/vaccination/getallactive', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }