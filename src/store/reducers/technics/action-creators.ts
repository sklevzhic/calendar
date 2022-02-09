import {AppDispatch} from "../../index";
import {IModel, IPrinter, IRefill, IUser} from "../../../models/Technics";
import {
    DeleteDeviceAction, DeleteModelInfoAction,
    SetDeviceAction,
    SetFetchingModelInfoAction,
    SetModelInfoAction,
    SetModelsAction,
    SetPrintersAction, SetRefillsAction,
    SetUsersAction, showRefillsByPrinter,
    TechnicsActionEnum
} from "./type";
import {technicsApi} from "../../../api/technics";


const getMoreInfoRefill = (array: IRefill[], printers: IPrinter[]) => {
    return Promise.all(array.map(async (item) => {
        let obj = {
            ...item,
            device: printers.filter(el => el.id === item.techId)[0]
        }

        return obj
    }))
}

export const TechnicsActionCreators = {
    setPrinters: (payload: IPrinter[]): SetPrintersAction => ({type: TechnicsActionEnum.SET_PRINTERS, payload}),
    setUsers: (payload: IUser[]): SetUsersAction => ({type: TechnicsActionEnum.SET_USERS, payload}),
    setModels: (payload: IModel[]): SetModelsAction => ({type: TechnicsActionEnum.SET_MODELS, payload}),
    deleteModelInfo: (): DeleteModelInfoAction => ({type: TechnicsActionEnum.DELETE_MODEL_INFO}),
    setModelInfo: (payload: IModel): SetModelInfoAction => ({type: TechnicsActionEnum.SET_MODEL_INFO, payload}),
    setisFetchingModelInfo: (payload: boolean): SetFetchingModelInfoAction => ({type: TechnicsActionEnum.SET_FETCHING_MODEL_INFO, payload}),
    setRefills: (payload: IRefill[]): SetRefillsAction => ({type: TechnicsActionEnum.SET_REFILLS, payload}),
    setDevice: (payload: IPrinter): SetDeviceAction => ({type: TechnicsActionEnum.SET_DEVICE, payload}),
    showRefills: (payload: IRefill[]): showRefillsByPrinter => ({type: TechnicsActionEnum.SHOW_REFILLS_BY_PRINTER, payload}),
    deleteItem: (payload: string | number): DeleteDeviceAction => ({type: TechnicsActionEnum.DELETE_DEVICE, payload}),
    fetchPrinters: () => async (dispatch: AppDispatch) => {
        try {
            let printers = await technicsApi.fetchPrinters()
            // let printersInfo = await getMoreInfo(technics)
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
    fetchModelInfo: (id: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(TechnicsActionCreators.setisFetchingModelInfo(true))
            let response = await technicsApi.getDeviceInfo(id)

            dispatch(TechnicsActionCreators.setModelInfo(response))
        } catch (e) {
            console.log(e)
        }
    },
    fetchRefills: () => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.fetchRefills()
            let printers = await technicsApi.fetchPrinters()

            dispatch(TechnicsActionCreators.showRefills(response))

            let refillsInfo = await getMoreInfoRefill(response, printers)
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