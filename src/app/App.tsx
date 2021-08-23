import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddPage from './pages/AddPage/AddPage';
import SearchPage from './pages/SearchPage/SearchPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Forgot from './pages/Forgot/Forgot';
import EditPage from './pages/EditPage/EditPage';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/credential/:service/edit">
          <EditPage />
        </Route>
        <Route path="/Search">
          <SearchPage />
        </Route>
        <Route path="/Add">
          <AddPage />
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
