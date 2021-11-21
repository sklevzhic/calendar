import {instance} from "./api";
import {IGuest} from "../models/Event";

export const eventsAPI = {
    fetchGuests() {
        return instance.get<IGuest[]>('./data.json')
    }
}