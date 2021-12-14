import {IGuest} from "../models/Event";
import instance from "./api";

export const eventsAPI = {
    fetchGuests() {
        return instance.get<IGuest[]>("auth/users")
    }
}