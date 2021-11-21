import {AuthActionEnum, setErrorAction, setIsAuthAction, setIsLoadingAction, setUserAction} from "./type";
import {AppDispatch} from "../../index";
import axios from "axios";
import {IUser} from "../../../models/Auth";

export const AuthActionCreators = {
    setIsAuth: (payload: boolean): setIsAuthAction => ({type: AuthActionEnum.SET_IS_AUTH, payload}),
    setUser: (payload: IUser): setUserAction => ({type: AuthActionEnum.SET_USER, payload}),
    setError: (payload: string): setErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): setIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    login: (username: string, password: string) => async ( dispatch: AppDispatch ) => {
        dispatch(AuthActionCreators.setIsLoading(true))
        try {
            let response = await axios.get<IUser[]>('./data.json')
            setTimeout(() => {
                let user = response.data.find(el => el.username === username && el.password === password)
                if (user) {
                    localStorage.setItem("auth", "true")
                    dispatch(AuthActionCreators.setUser(user as IUser))
                    dispatch(AuthActionCreators.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('Неправильно указан логин и/или пароль'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 2000)


        } catch (e) {
            dispatch(AuthActionCreators.setError('Ошибка при входе. Повторите позже'))
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsAuth(false))
        dispatch(AuthActionCreators.setUser({} as IUser))
        localStorage.removeItem("auth")
    }
}