import {IGuest} from "../models/Event";
import instanceAuth from "./api";

export const eventsAPI = {
    fetchGuests() {
        return instanceAuth.get<IGuest[]>("auth/users")
    }
}