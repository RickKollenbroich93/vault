import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Forgot from './pages/Forgot/Forgot';
import Password from './pages/Password/Password';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Password/:service">
          <Password />
        </Route>
        <Route path="/Forgot">
          <Forgot />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
