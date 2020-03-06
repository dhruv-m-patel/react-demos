import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component'

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={loadable(() => import('./components/HomePage'))} />
      <Route exact path="/form-validator" component={loadable(() => import('./components/FormValidator'))} />
      <Route exact path="/movie-seat-booking" component={loadable(() => import('./components/MovieSeatBooking'))} />
      <Route exact path="/shopping-cart" component={loadable(() => import('./components/ShoppingCart'))} />
      <Route exact path="/expense-tracker" component={loadable(() => import('./components/ExpenseTracker'))} />
      <Route exact path="/typing-speed-checker" component={loadable(() => import('./components/TypingSpeedChecker'))} />
      <Route component={loadable(() => import('./components/NotFound'))} />
    </Switch>
  );
}
