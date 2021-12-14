import instance from "./api";
import {AxiosResponse} from "axios";

interface UserResponse {
    _id: string,
    username: string
}

export const usersAPI = {
    getUserInfo(id: string): Promise <AxiosResponse<UserResponse>> {
        return instance.get<UserResponse>(`auth/users/${id}`)
    }
}