import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import Container from './pages/_container';
import Home from './pages/Home';
import NodeList from './pages/NodeList';

export function getRoutes() {
  return (
    <Route path='/' component={Container}>
      <IndexRoute component={Home} />
      <Route path='nodelist' component={NodeList} />
    </Route>
  );
}
