import * as React from "react";
import { Route } from "react-router-dom";
import { routes } from "./constants/routes";
import { Home } from "./Home/Home";
import { HwrInvoice } from "./HwrInvoice/HwrInvoice";
import { Hwrp } from "./Hwrp/Hwrp";

export const Routes = () => (
  <>
    <Route exac={true} path={routes.HWRPAYROLL} component={Hwrp} />
    <Route exac={true} path={routes.HWRINVOICE} component={HwrInvoice} />
    <Route exact={true} path={routes.HOME} component={Home} />
  </>
);
