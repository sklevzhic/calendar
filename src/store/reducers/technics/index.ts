import {EventActions, TechnicsActionEnum, TechnicsState} from "./type";
import {IModel} from "../../../models/Technics";

const initialState: TechnicsState = {
    printers: [],
    users: [],
    models: [],
    refills: [],
    refillsFilter: [],
    modelInfo: {} as IModel,
    isFetchingModelInfo: false
}

export const TechnicReducer = (state = initialState, action: EventActions): TechnicsState => {
    switch (action.type) {
        case TechnicsActionEnum.SET_PRINTERS:
            return {...state, printers: action.payload}
        case TechnicsActionEnum.SET_DEVICE:
            return {...state, printers: [...state.printers, action.payload]}
        case TechnicsActionEnum.DELETE_DEVICE:
            return {...state, printers: state.printers.filter(el => el.id !== action.payload)}
        case TechnicsActionEnum.SET_USERS:
            return {...state, users: action.payload}
        case TechnicsActionEnum.SET_MODELS:
            return {...state, models: action.payload}
        case TechnicsActionEnum.SET_REFILLS_FILTERED:
            return {...state, refillsFilter: state.refills.filter(el => {
                if (el.date.includes("2022")) {
                    return el
                }
                })}
        case TechnicsActionEnum.SET_REFILLS:
            return {...state, refills: action.payload}
        case TechnicsActionEnum.SHOW_REFILLS_BY_PRINTER:
            return {
                ...state, printers: state.printers.map(el => {
                    return {...el, refills: action.payload.filter(el1 => {
                            if ((el1.techId === el.id) && (el1.date.includes("2022"))) {
                              return el1
                            }
                        })}
                })
            }
        case TechnicsActionEnum.SET_MODEL_INFO:
            return {...state, modelInfo: action.payload, isFetchingModelInfo: false}
        case TechnicsActionEnum.DELETE_MODEL_INFO:
            return {...state, modelInfo: {} as IModel}
        default:
            return state
    }
}