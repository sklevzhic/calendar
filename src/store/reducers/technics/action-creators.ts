import {IEvent, IGuest} from "../../../models/Event";
// import { EventActionEnum, setEventsAction, SetGuestsAction } from "./type";
import {AppDispatch} from "../../index";
import {IPrinter} from "../../../models/Technics";
import {SetPrintersAction, TechnicsActionEnum} from "./type";
import {technicsApi} from "../../../api/technics";

export const TechnicsActionCreators = {
    setPrinters: (payload: IPrinter[]): SetPrintersAction => ({type: TechnicsActionEnum.SET_PRINTERS, payload}),
    fetchPrinters: () => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.fetchPrinters()
            dispatch(TechnicsActionCreators.setPrinters(response))
        } catch (e) {
            console.log(e)
        }
    },
    // fetchEvents: () => async (dispatch: AppDispatch) => {
    //     try {
    //         let events = localStorage.getItem("events") || '[]'
    //         let json = JSON.parse(events)
    //         dispatch(EventActionCreators.setEvents(json))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // },
    addPrinter: (printer: IPrinter) => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.addPrinter(printer)
            // dispatch(TechnicsActionCreators.)
            // dispatch(TechnicsActionCreators.fetchPrinters())
            // let events = localStorage.getItem("events") || '[]'
            // let jsonEvents = JSON.parse(events)
            // jsonEvents.push(data)
            // localStorage.setItem("events", JSON.stringify(jsonEvents))
            // dispatch(EventActionCreators.setEvents(jsonEvents))
        } catch (e) {
            console.log(e)
        }
    },
    // deleteEvent: (data: IEvent) => async (dispatch: AppDispatch) => {}

}