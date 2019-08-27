import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Containers from '../index.modules';

const indexRoutes = () => (
  <Switch>
    <Route path='/' component={Containers.Cards.index.default} />
  </Switch>
);

export default indexRoutes;
