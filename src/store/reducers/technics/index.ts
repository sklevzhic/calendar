import {EventActions, TechnicsActionEnum, TechnicsState} from "./type";

const initialState: TechnicsState = {
    printers: [],
    users: [],
    models: [],
    refills: []
}

export const TechnicReducer = (state = initialState, action: EventActions): TechnicsState => {
 switch (action.type) {
     case TechnicsActionEnum.SET_PRINTERS:
         return { ...state, printers: action.payload}
     case TechnicsActionEnum.SET_DEVICE:
         return { ...state, printers: [...state.printers, action.payload]}
     case TechnicsActionEnum.DELETE_DEVICE:
         return { ...state, printers: state.printers.filter(el => el.id !== action.payload)}
     case TechnicsActionEnum.SET_USERS:
         return { ...state, users: action.payload}
     case TechnicsActionEnum.SET_MODELS:
         return { ...state, models: action.payload}
     case TechnicsActionEnum.SET_REFILLS:
         return { ...state, refills: action.payload}
     case TechnicsActionEnum.SHOW_REFILLS_BY_PRINTER:
         return { ...state, printers: state.printers.map(el => {
             return {...el, refills: action.payload.filter(el1 => el1.techId === el.id)}
             })}
     default:
         return state
 }
}