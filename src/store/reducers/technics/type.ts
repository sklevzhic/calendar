import { IPrinter } from "../../../models/Technics";

export interface TechnicsState {
    printers: IPrinter[],
}

export enum TechnicsActionEnum {
    SET_PRINTERS = 'SET_PRINTERS',
}


export interface SetPrintersAction {
    type: TechnicsActionEnum.SET_PRINTERS,
    payload: IPrinter[]
}



export type EventActions = SetPrintersAction