import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {authReducer} from "./reducers/auth";
import {TechnicReducer} from "./reducers/technics";

const rootReducer = combineReducers({
    authReducer: authReducer,
    technicReducer: TechnicReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;