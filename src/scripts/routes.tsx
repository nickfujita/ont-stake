import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './pages/Home';
import Container from './pages/_container';

export function getRoutes() {
  return (
    <Route path='/' component={Container}>
      <IndexRoute component={Home} />
    </Route>
  );
}
