export interface IPrinter {
    "id": string,
    "type": string | number,
    "name": string,
    "invent": string,
    "year": string | number,
    "build": string | number,
    "room": string | number,
    "user": string | number,
    "matfyo": string,
    "zavod": string,
    "print": boolean,
    "problem": string,
    "faculty":string,
    "desc":string,
    "date":string,
    "getdate": string,
    "isTrusted":string,
    "cartridge": string
    "refills"?: IRefill[]
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
    "date": string;
    "id": string | number,
    "techId": string | number,
    "status": string,
    "device"?: IPrinter
}