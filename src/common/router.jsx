import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component'

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={loadable(() => import('./components/HomePage'))} />
      <Route exact path="/redux" component={loadable(() => import('./components/ReduxExample'))} />
      <Route component={loadable(() => import('./components/NotFound'))} />
    </Switch>
  );
}
