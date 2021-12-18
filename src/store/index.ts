import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./reducers/auth";
import {EventReducer} from "./reducers/events";
import {TechnicReducer} from "./reducers/technics";

const rootReducer = combineReducers({
    authReducer: authReducer,
    eventReducer: EventReducer,
    technicReducer: TechnicReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;