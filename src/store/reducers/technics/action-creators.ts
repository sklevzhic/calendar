import {IEvent, IGuest} from "../../../models/Event";
// import { EventActionEnum, setEventsAction, SetGuestsAction } from "./type";
import {AppDispatch} from "../../index";
import {IModel, IPrinter, IUser} from "../../../models/Technics";
import {
    DeleteDeviceAction,
    SetDeviceAction,
    SetModelsAction,
    SetPrintersAction,
    SetUsersAction,
    TechnicsActionEnum
} from "./type";
import {technicsApi} from "../../../api/technics";


const getMoreInfo = (array: IPrinter[]) => {
    return Promise.all(array.map(async (item) => {
        let obj = {
            ...item,
            matfyo: await technicsApi.getUserName(item.matfyo),
            userId: await technicsApi.getUserName(item.userId),
            device: await technicsApi.getDeviceName(item.name),
        }

        return obj
    }))
}
export const TechnicsActionCreators = {
    setPrinters: (payload: IPrinter[]): SetPrintersAction => ({type: TechnicsActionEnum.SET_PRINTERS, payload}),
    setUsers: (payload: IUser[]): SetUsersAction => ({type: TechnicsActionEnum.SET_USERS, payload}),
    setModels: (payload: IModel[]): SetModelsAction => ({type: TechnicsActionEnum.SET_MODELS, payload}),
    setDevice: (payload: IPrinter): SetDeviceAction => ({type: TechnicsActionEnum.SET_DEVICE, payload}),
    deleteItem: (payload: string | number): DeleteDeviceAction => ({type: TechnicsActionEnum.DELETE_DEVICE, payload}),
    fetchPrinters: () => async (dispatch: AppDispatch) => {
        try {
            let printers = await technicsApi.fetchPrinters()
            let printersInfo = await getMoreInfo(printers)
            dispatch(TechnicsActionCreators.setPrinters(printersInfo))
        } catch (e) {
            console.log(e)
        }
    },
    fetchUsers: () => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.fetchUsers()
            dispatch(TechnicsActionCreators.setUsers(response))
        } catch (e) {
            console.log(e)
        }
    },
    fetchModels: () => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.fetchModels()
            dispatch(TechnicsActionCreators.setModels(response))
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
            let response = await technicsApi.addDevice(printer)
            let printersInfo = await getMoreInfo([response])
            debugger
            dispatch(TechnicsActionCreators.setDevice(printersInfo[0]))
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
    deleteDevice: (id: string | number) => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.deleteDevice(id)
            dispatch(TechnicsActionCreators.deleteItem(response.deleteId))
        } catch (e) {
            console.log(e)
        }
    },
    // deleteEvent: (data: IEvent) => async (dispatch: AppDispatch) => {}

}