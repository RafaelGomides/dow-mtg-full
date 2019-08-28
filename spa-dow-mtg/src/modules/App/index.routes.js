import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Containers from '../index.modules';

const indexRoutes = () => (
  <Switch>
    <Route path='/' exact={true} component={Containers.Cards.index.default} />
    <Route path='/about' component={Containers.About.index.default} />
  </Switch>
);

export default indexRoutes;
