import {AppDispatch} from "../../index";
import {IModel, IPrinter, IRefill, IUser} from "../../../models/Technics";
import {
    DeleteDeviceAction, DeleteModelInfoAction, deleteRefillAction,
    SetDeviceAction,
    SetFetchingModelInfoAction,
    SetModelInfoAction,
    SetModelsAction,
    SetPrintersAction, SetRefillAction, SetRefillsAction, SetRefillsFilteredAction,
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
    setRefill: (payload: IRefill): SetRefillAction => ({type: TechnicsActionEnum.SET_REFILL, payload}),
    setDevice: (payload: IPrinter): SetDeviceAction => ({type: TechnicsActionEnum.SET_DEVICE, payload}),
    showRefills: (payload: IRefill[]): showRefillsByPrinter => ({type: TechnicsActionEnum.SHOW_REFILLS_BY_PRINTER, payload}),
    deleteItem: (payload: string | number): DeleteDeviceAction => ({type: TechnicsActionEnum.DELETE_DEVICE, payload}),
    deleteRefillTC: (payload: string | number): deleteRefillAction => ({type: TechnicsActionEnum.DELETE_REFILL, payload}),
    setRefillsFiltered: (): SetRefillsFilteredAction => ({type: TechnicsActionEnum.SET_REFILLS_FILTERED}),
    fetchPrinters: () => async (dispatch: AppDispatch) => {
        try {
            let printers = await technicsApi.fetchPrinters()
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
            dispatch(TechnicsActionCreators.setDevice(response))

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
    updateStatusCartridge:(id: string | number, value: number) => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.updateStatusCartridge(id, value)
            debugger
        } catch (e) {
            console.log(e)
        }
    },
    deleteRefill: (id: string | number) => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.deleteRefill(id)
            dispatch(TechnicsActionCreators.deleteRefillTC(response.deleteId))
        } catch (e) {
            console.log(e)
        }
    },

    addRefill: (obj: IRefill) => async (dispatch: AppDispatch) => {
        try {
            let response = await technicsApi.addRefill(obj)
            debugger
            dispatch(TechnicsActionCreators.setRefill(response))
        } catch (e) {
            console.log(e)
        }
    },
    // deleteEvent: (data: IEvent) => async (dispatch: AppDispatch) => {}

}