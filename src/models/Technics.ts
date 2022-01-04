export interface IPrinter {
    "id": string,
    "userId": string | number,
    "name": string,
    "invent": string | number,
    "zavod": string | number,
    "matfyo": string | number,
    "room": string | number,
    "build": string | number,
    "print": boolean,
    "device": IModel
}

export interface IUser {
    "id": string | number,
    "name": string,
}

export interface IModel {
    "id": string | number,
    "type": string,
    "name": string,
    "year": string | number,
    "cartridge"?: string
}

export interface IRefill {
    device: any;
    "id": string | number,
    "userId": string | number,
    "printerId": string | number,
    "dateget": string,
    "stage": 1 | 2 | 3 | 4
}