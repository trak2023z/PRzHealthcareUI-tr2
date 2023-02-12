import Api from './ApiGlobal';

export type EventInformation = {
    id: number,
    accId: number,
    timeFrom: Date,
    timeTo: Date,
    type: number,
    doctorId: number,
    vacId: number,
    description: string,
    isActive: boolean,
    insertedDate: Date,
    insertedAccId: number,
    modifiedDate: Date,
    modifiedAccId: number
};