import {IEvent, IGuest} from "../../../models/Event";
import { EventActionEnum, setEventsAction, SetGuestsAction } from "./type";
import {AppDispatch} from "../../index";
import {eventsAPI} from "../../../api/events";

export const EventActionCreators = {
    setGuests: (payload: IGuest[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): setEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            let response = await eventsAPI.fetchGuests()

            dispatch(EventActionCreators.setGuests(response.data))
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: () => async (dispatch: AppDispatch) => {
        try {
            let events = localStorage.getItem("events") || '[]'
            let json = JSON.parse(events)
            dispatch(EventActionCreators.setEvents(json))
        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (data: IEvent) => async (dispatch: AppDispatch) => {
        try {
            let events = localStorage.getItem("events") || '[]'
            let jsonEvents = JSON.parse(events)
            jsonEvents.push(data)
            localStorage.setItem("events", JSON.stringify(jsonEvents))
            dispatch(EventActionCreators.setEvents(jsonEvents))
        } catch (e) {
            console.log(e)
        }
    },
    // deleteEvent: (data: IEvent) => async (dispatch: AppDispatch) => {}

}