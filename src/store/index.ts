import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./reducers/auth";
import {EventReducer} from "./reducers/events";

const rootReducer = combineReducers({
    authReducer: authReducer,
    eventReducer: EventReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;