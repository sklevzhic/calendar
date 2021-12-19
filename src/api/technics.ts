import axios from "axios";
import {IModel, IPrinter, IUser} from "../models/Technics";

export const technicsApi = {
    fetchPrinters() {
        return axios.get<IPrinter[]>("http://localhost:1337/printers").then(response => response.data)
    },
    addDevice(obj: IPrinter) {
        return axios.post("http://localhost:1337/createDevice", obj).then(response => response.data.obj[0])
    },
    deleteDevice(id: string | number) {
        return axios.delete(`http://localhost:1337/printers/${id}`).then(response => response.data)
    },
    fetchUsers() {
        return axios.get<IPrinter[]>(`http://localhost:1337/users`).then(response => response.data)
    },
    fetchModels() {
        return axios.get<IModel[]>(`http://localhost:1337/models`).then(response => response.data)
    },
    getUserName(id: string | number) {
        return axios.get(`http://localhost:1337/users/${id}`).then(response => response.data.user[0].name)
    },
    getDeviceName(id: string | number) {
        return axios.get(`http://localhost:1337/models/${id}`).then(response => response.data)
    },
}