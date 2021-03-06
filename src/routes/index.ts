import {Event} from "../pages/Event";
import {Login} from "../pages/Login";
import {Profile} from "../pages/Profile";
import {Printers} from "../pages/Printers";
import {Printer} from "../pages/Printer";
import { Current } from "../pages/Current";

export const privateRoutes = [
    {path: "/", component: Event, exact: true},
    {path: "/profile", component: Profile, exact: false},
    {path: "/events", component: Event, exact: false},
    {path: "/technics", component: Printers, exact: true},
    {path: "/technics/current", component: Current, exact: true},
    {path: "/technics/:id", component: Printer, exact: false},
]

export const publicRoutes = [
    {path: "/login", component: Login, exact: true}
]