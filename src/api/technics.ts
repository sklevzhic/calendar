import axios from "axios";
import { IPrinter } from "../models/Technics";

export const technicsApi = {
    fetchPrinters() {
        return axios.get<IPrinter[]>("http://localhost:1337/printers").then(response => response.data)
    },
    addPrinter(obj: IPrinter) {
        return axios.post<IPrinter[]>("http://localhost:1337/createDevice", obj)
    }
}