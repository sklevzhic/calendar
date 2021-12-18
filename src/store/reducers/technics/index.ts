import {EventActions, TechnicsActionEnum, TechnicsState} from "./type";

const initialState: TechnicsState = {
    printers: []
}

export const TechnicReducer = (state = initialState, action: EventActions): TechnicsState => {
 switch (action.type) {
     case TechnicsActionEnum.SET_PRINTERS:
         return { ...state, printers: action.payload}

     default:
         return state
 }
}