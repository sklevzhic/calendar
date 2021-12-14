import React, {useEffect} from 'react';
import './App.css';
import {Layout} from './layout';
import {AppRouter} from "./components/AppRouter";
import {NavBar} from "./components/Header";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "./store/reducers/auth/action-creators";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem("auth")) {
            dispatch(AuthActionCreators.checkAuth())
        }
    })


    return (
        <div>
            <NavBar/>
            <Layout>
                <AppRouter/>
            </Layout>
        </div>
    );
}

export default App;





















