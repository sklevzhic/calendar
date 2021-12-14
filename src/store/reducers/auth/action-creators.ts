import {AuthActionEnum, setErrorAction, setIsAuthAction, setIsLoadingAction, setUserAction} from "./type";
import {AppDispatch} from "../../index";
import {IUser} from "../../../models/Auth";
import {authAPI} from "../../../api/auth";
import {usersAPI} from "../../../api/users";

export const AuthActionCreators = {
    setIsAuth: (payload: boolean): setIsAuthAction => ({type: AuthActionEnum.SET_IS_AUTH, payload}),
    setUser: (payload: IUser): setUserAction => ({type: AuthActionEnum.SET_USER, payload}),
    setError: (payload: string): setErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): setIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true))
        try {
            const responseToken = await authAPI.login(username, password)
            const responseUser = await usersAPI.getUserInfo(responseToken.data.id)
            dispatch(AuthActionCreators.setUser(responseUser.data))
            localStorage.setItem("token", responseToken.data.token)
            dispatch(AuthActionCreators.setIsAuth(true))
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            console.log(e)
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsAuth(false))
        dispatch(AuthActionCreators.setUser({} as IUser))
        localStorage.removeItem('token')
    },

    checkAuth: () => async (dispatch: AppDispatch) => {
        debugger
    }
}