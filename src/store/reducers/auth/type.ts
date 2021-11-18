import {IUser} from "../../../models/Auth";

export interface AuthState {
    isAuth: boolean,
    user: IUser,
    isLoading: boolean,
    error: string
}

export enum AuthActionEnum {
    SET_IS_AUTH = 'SET_IS_AUTH',
    SET_ERROR = 'SET_TEXT',
    SET_USER = 'SET_USER',
    SET_IS_LOADING = 'SET_IS_LOADING',
}

export interface setIsAuthAction {
    type: AuthActionEnum.SET_IS_AUTH;
    payload: boolean
}

export interface setErrorAction {
    type: AuthActionEnum.SET_ERROR;
    payload: string
}

export interface setUserAction {
    type: AuthActionEnum.SET_USER;
    payload: IUser
}

export interface setIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING;
    payload: boolean
}

export type AuthAction =
    setIsAuthAction
    | setErrorAction
    | setUserAction
    | setIsLoadingAction
