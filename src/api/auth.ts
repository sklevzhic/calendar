import instanceAuth from "./api";
import {AxiosResponse} from "axios";

interface AuthResponse {
    token: string,
    id: string
}

export const authAPI = {
    login(username: string, password: string): Promise <AxiosResponse<AuthResponse>> {
        return instanceAuth.post<AuthResponse>("auth/login", {username, password})
    }
}