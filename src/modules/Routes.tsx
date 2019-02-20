import * as React from 'react';
import {Route} from 'react-router-dom';
import { routes } from './constants/routes';
import { Home } from './Home/Home';
import { Hwrp } from './Hwrp/Hwrp';



export const Routes = () => (
    <>
        <Route exact path={routes.HWRPAYROLL} component={Hwrp}/>
        <Route exact path={routes.HOME} component={Home}/>
        
    </>
)