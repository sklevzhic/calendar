import {IModel, IPrinter, IUser} from "../../../models/Technics";

export interface TechnicsState {
    printers: IPrinter[],
    users: IUser[],
    models: IModel[]
}

export enum TechnicsActionEnum {
    SET_PRINTERS = 'SET_PRINTERS',
    SET_DEVICE = 'SET_DEVICE',
    DELETE_DEVICE = 'DELETE_DEVICE',
    SET_USERS = "SET_USERS",
    SET_MODELS = "SET_MODELS"

}


export interface SetPrintersAction {
    type: TechnicsActionEnum.SET_PRINTERS,
    payload: IPrinter[]
}

export interface SetDeviceAction {
    type: TechnicsActionEnum.SET_DEVICE,
    payload: IPrinter
}

export interface DeleteDeviceAction {
    type: TechnicsActionEnum.DELETE_DEVICE,
    payload: string | number
}

//

export interface SetUsersAction {
    type: TechnicsActionEnum.SET_USERS,
    payload: IUser[]
}

export interface SetModelsAction {
    type: TechnicsActionEnum.SET_MODELS,
    payload: IModel[]
}



export type EventActions =
    SetPrintersAction
    | SetDeviceAction
    | DeleteDeviceAction
    | SetUsersAction
    | SetModelsAction