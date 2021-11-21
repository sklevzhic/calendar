import {IEvent, IGuest } from "../../../models/Event";

export interface EventState {
    guests: IGuest[],
    events: IEvent[]
}

export enum EventActionEnum {
    SET_GUESTS = 'SET_GUESTS',
    SET_EVENTS = 'SET_EVENTS',
    ADD_EVENT = 'ADD_EVENT'
}


export interface SetGuestsAction {
    type: EventActionEnum.SET_GUESTS,
    payload: IGuest[]
}

export interface setEventsAction {
    type: EventActionEnum.SET_EVENTS,
    payload: IEvent[]
}

export interface addEventAction {
    type: EventActionEnum.ADD_EVENT,
    payload: IEvent
}


export type EventActions = SetGuestsAction | setEventsAction | addEventAction