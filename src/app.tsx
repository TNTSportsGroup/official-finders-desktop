import * as React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import { Routes } from './modules/Routes';


export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    )
  }
}
