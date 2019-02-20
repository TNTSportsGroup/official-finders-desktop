import * as React from 'react';
import {Route} from 'react-router-dom';
import { routes } from './constants/routes';
import { Home } from './Home/Home';



export const Routes = () => (
    <>
        <Route path={routes.HOME} component={Home}/>
    </>
)