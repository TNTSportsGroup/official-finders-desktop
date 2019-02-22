import * as React from "react";
import { Switch, MemoryRouter as Router } from "react-router-dom";

import { Routes } from "./modules/Routes";

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    );
  }
}
