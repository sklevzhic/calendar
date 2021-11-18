import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import {privateRoutes, publicRoutes} from '../routes';
import {useTypedSelector} from "../hooks/useTypedSelector";


interface AppRouterProps {

}

export const AppRouter: React.FC<AppRouterProps> = () => {
    const { isAuth } = useTypedSelector(state => state.authReducer)
    return <div>
        {
            isAuth
                ? <>
                    <Switch>
                        {
                            privateRoutes.map(route => {
                                return <Route {...route} key={route.path}/>
                            })
                        }
                        <Redirect to={'/'}/>
                    </Switch>
                </>
                : <>
                    <Switch>
                        {
                            publicRoutes.map(route => {
                                return <Route {...route} key={route.path}/>
                            })
                        }
                        <Redirect to={'/login'}/>
                    </Switch>
                </>
        }
    </div>;
};