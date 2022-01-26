import {AppDispatch} from "../../index";
import {IModel, IPrinter, IRefill, IUser} from "../../../models/Technics";
import {
    DeleteDeviceAction,
    SetDeviceAction,
    SetModelsAction,
    SetPrintersAction, SetRefillsAction,
    SetUsersAction, showRefillsByPrinter,
    TechnicsActionEnum
} from "./type";
import {technicsApi} from "../../../api/technics";


// const getMoreInfo = (array: IPrinter[]) => {
//     return Promise.all(array.map(async (item) => {
//         let obj = {
//             ...item,
//             matfyo: await technicsApi.getUserName(item.matfyo),
//             userId: await technicsApi.getUserName(item.userId),
//             device: await technicsApi.getDeviceName(item.name),
//         }
//
//         return obj
//     }))
// }
//
const getMoreInfoRefill = (array: IRefill[]) => {
    return Promise.all(array.map(async (item) => {
        let obj = {
            ...item,
            device: await technicsApi.getDeviceInfo(item.techId),
        }

        return obj
    }))
}

export const TechnicsActionCreators = {
    setPrinters: (payload: IPrinter[]): SetPrintersAction => ({type: TechnicsActionEnum.SET_PRINTERS, payload}),
    setUsers: (payload: IUser[]): SetUsersAction => ({type: TechnicsActionEnum.SET_USERS, payload}),
    setModels: (payload: IModel[]): SetModelsAction => ({type: TechnicsActionEnum.SET_MODELS, payload}),
    setRefills: (payload: IRefill[]): SetRefillsAction => ({type: TechnicsActionEnum.SET_REFILLS, payload}),
    setDevice: (payload: IPrinter): SetDeviceAction => ({type: TechnicsActionEnum.SET_DEVICE, payload}),
    showRefills: (payload: IRefill[]): showRefillsByPrinter => ({type: TechnicsActionEnum.SHOW_REFILLS_BY_PRINTER, payload}),
    deleteItem: (payload: string | number): DeleteDeviceAction => ({type: TechnicsActionEnum.DELETE_DEVICE, payload}),
    fetchPrinters: () => async (dispatch: AppDispatch) => {
        try {
            let printers = await technicsApi.fetchPrinters()
            // let printersInfo = await getMoreInfo(printers)
            dispatch(TechnicsActionCreators.setPrinters(printers))
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
    fetchRefills: () => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.fetchRefills()
            dispatch(TechnicsActionCreators.showRefills(response))

            let refillsInfo = await getMoreInfoRefill(response)
            console.log(refillsInfo)
            dispatch(TechnicsActionCreators.setRefills(refillsInfo))
        } catch (e) {
            console.log(e)
        }
    },
    addPrinter: (printer: IPrinter) => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.addDevice(printer)
            // let printersInfo = await getMoreInfo([response])
            dispatch(TechnicsActionCreators.setDevice(response))
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

    addRefill: (obj: IRefill) => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.addRefill(obj)
            // let printersInfo = await getMoreInfo([response])
            // dispatch(TechnicsActionCreators.setDevice(printersInfo[0]))
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