import {IModel, IPrinter, IRefill, IUser} from "../../../models/Technics";

export interface TechnicsState {
    printers: IPrinter[],
    users: IUser[],
    models: IModel[],
    refills: IRefill[],
    refillsFilter: any
    modelInfo: IModel,
    isFetchingModelInfo: boolean
}

export enum TechnicsActionEnum {
    SET_PRINTERS = 'SET_PRINTERS',
    SET_DEVICE = 'SET_DEVICE',
    DELETE_DEVICE = 'DELETE_DEVICE',
    SET_USERS = "SET_USERS",
    SET_MODELS = "SET_MODELS",
    SET_REFILL = "SET_REFILL",
    DELETE_REFILL = "DELETE_REFILL",
    SET_REFILLS = "SET_REFILLS",
    SET_REFILLS_FILTERED = "SET_REFILLS_FILTERED",
    SHOW_REFILLS_BY_PRINTER = "SHOW_REFILLS_BY_PRINTER",
    SET_MODEL_INFO = "SET_MODEL_INFO",
    SET_FETCHING_MODEL_INFO = 'SET_FETCHING_MODEL_INFO',
    DELETE_MODEL_INFO = 'DELETE_MODEL_INFO'
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

export interface SetUsersAction {
    type: TechnicsActionEnum.SET_USERS,
    payload: IUser[]
}

export interface SetModelsAction {
    type: TechnicsActionEnum.SET_MODELS,
    payload: IModel[]
}

export interface DeleteModelInfoAction {
    type: TechnicsActionEnum.DELETE_MODEL_INFO,
}

export interface SetModelInfoAction {
    type: TechnicsActionEnum.SET_MODEL_INFO,
    payload: IModel
}

export interface SetFetchingModelInfoAction {
    type: TechnicsActionEnum.SET_FETCHING_MODEL_INFO,
    payload: boolean
}

export interface SetRefillsAction {
    type: TechnicsActionEnum.SET_REFILLS,
    payload: IRefill[]
}

export interface SetRefillAction {
    type: TechnicsActionEnum.SET_REFILL,
    payload: IRefill
}


export interface SetRefillsFilteredAction {
    type: TechnicsActionEnum.SET_REFILLS_FILTERED
}


export interface showRefillsByPrinter {
    type: TechnicsActionEnum.SHOW_REFILLS_BY_PRINTER,
    payload: IRefill[]
}

export interface deleteRefillAction {
    type: TechnicsActionEnum.DELETE_REFILL,
    payload: string | number
}


export type EventActions =
    SetPrintersAction
    | SetDeviceAction
    | DeleteDeviceAction
    | SetUsersAction
    | SetModelsAction
    | SetRefillsAction
    | showRefillsByPrinter
    | SetModelInfoAction
    | SetFetchingModelInfoAction
    | DeleteModelInfoAction
    | SetRefillsFilteredAction
    | SetRefillAction
    | deleteRefillAction