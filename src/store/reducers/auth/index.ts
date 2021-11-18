import {AuthAction, AuthActionEnum, AuthState} from "./type";
import {IUser} from "../../../models/Auth";

const initialState: AuthState = {
    isAuth: true,
    user: {} as IUser,
    isLoading: false,
    error: ''
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionEnum.SET_USER:
            return {...state, user: action.payload};
        case AuthActionEnum.SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case AuthActionEnum.SET_ERROR:
            return state
        case AuthActionEnum.SET_IS_LOADING:
            return state
        default:
            return state
    }
}