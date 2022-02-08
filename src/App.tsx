import React from 'react';
import './App.css';
import {Layout} from './layout';
import {AppRouter} from "./components/AppRouter";
import {NavBar} from "./components/Header";


function App() {

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





















