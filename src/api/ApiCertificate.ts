import { EventInformation } from './ApiEvent';
import Api from './ApiGlobal';

export const printCOVIDCertificate = (data: EventInformation | undefined) => {
    return Api.post('/certificate/covid',data, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }