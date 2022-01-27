import axios from "axios";
import {IModel, IPrinter, IRefill, IUser} from "../models/Technics";
import instanceAuth from "./api";
import {IGuest} from "../models/Event";
import instance from "./api";

let URL = 'https://printersipkip.herokuapp.com'
// let URL = `http://localhost:1337`

export const technicsApi = {
    fetchPrinters() {
        return axios.get<IPrinter[]>(`${URL}/printers`).then(response => response.data)
    },
    getDeviceInfo(id: string | number) {
        return axios.get(`${URL}/printers/${id}`).then(response => response.data.device[0])
    },
    getDeviceName(id: string | number) {
        return axios.get(`${URL}/models/${id}`).then(response => response.data)
    },
    addDevice(obj: IPrinter) {
        return axios.post(`${URL}/createDevice`, obj).then(response => response.data.obj[0])
    },
    addRefill(obj: IRefill) {
        return axios.post(`${URL}/createRefill`, obj).then(response => response.data.obj[0])
    },

    deleteDevice(id: string | number) {
        return axios.delete(`${URL}/printers/${id}`).then(response => response.data)
    },
    fetchUsers() {
        return axios.get<IPrinter[]>(`${URL}/users`).then(response => response.data)
    },
    fetchModels() {
        return axios.get<IModel[]>(`${URL}/models`).then(response => response.data)
    },
    fetchRefills() {
        return axios.get<IRefill[]>(`${URL}/refills`).then(response => response.data)
    },
}

// export const technicsApi = {



// }