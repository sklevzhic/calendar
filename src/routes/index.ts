import {Event} from "../pages/Event";
import {Login} from "../pages/Login";

export const privateRoutes = [
    {path: "/", component: Event, exact: true}
]

export const publicRoutes = [
    {path: "/login", component: Login, exact: true}
]