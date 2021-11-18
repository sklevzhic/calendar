import {AuthActionEnum, setErrorAction, setIsAuthAction, setUserAction} from "./type";
import {AppDispatch} from "../../index";
import axios from "axios";
import {IUser} from "../../../models/Auth";

export const AuthActionCreators = {
    setIsAuth: (payload: boolean): setIsAuthAction => ({type: AuthActionEnum.SET_IS_AUTH, payload}),
    setUser: (payload: IUser): setUserAction => ({type: AuthActionEnum.SET_USER, payload}),
    setError: (payload: string): setErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password: string) => async ( dispatch: AppDispatch ) => {
        try {
            let response = await axios.get<IUser[]>('./data.json')
            let user = response.data.find(el => el.username === username && el.password === password)
            if (user) {
                dispatch(AuthActionCreators.setUser(user as IUser))
                dispatch(AuthActionCreators.setIsAuth(true))
            } else {
                console.error('Неправильный логин или пароль')
                // dispatch(AuthActionCreators.setError('Неправильный логин или пароль'))
            }
        } catch (e) {
            console.error('Ошибка при входе. Повторите позже')
            // dispatch(AuthActionCreators.setError('Ошибка при входе. Повторите позже'))

        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}