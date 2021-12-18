import {Event} from "../pages/Event";
import {Login} from "../pages/Login";
import {Profile} from "../pages/Profile";
import {Printers} from "../pages/Printers";

export const privateRoutes = [
    {path: "/", component: Event, exact: true},
    {path: "/profile", component: Profile, exact: false},
    {path: "/events", component: Event, exact: false},
    {path: "/printers", component: Printers, exact: false},
]

export const publicRoutes = [
    {path: "/login", component: Login, exact: true}
]