import * as React from "react";
import { Route } from "react-router-dom";
import { routes } from "./constants/routes";
import { Home } from "./Home/Home";
import { HwrInvoice } from "./HwrInvoice/HwrInvoice";
import { Hwrp } from "./Hwrp/Hwrp";
import { QuickScoresGames } from "./QuickScoresGames/QuickScoresGames";

export const Routes = () => (
  <>
    <Route
      exact={true}
      path={routes.QUICKSCORESGAMES}
      component={QuickScoresGames}
    />
    <Route exact={true} path={routes.HWRPAYROLL} component={Hwrp} />
    <Route exact={true} path={routes.HWRINVOICE} component={HwrInvoice} />
    <Route exact={true} path={routes.HOME} component={Home} />
  </>
);
