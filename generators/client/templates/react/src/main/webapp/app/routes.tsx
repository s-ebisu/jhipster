import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PrivateRoute from './shared/layout/private-route/private-route';
import Login from './modules/login/login';
import Logout from './modules/login/logout';
import Home from './modules/home/home';
import Admin from './modules/administration';

const Routes = () => (
  <div className="view-routes">
    <Route exact path="/" component={Home}/>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <PrivateRoute path="/admin" component={Admin} />
  </div>
);

export default Routes;
