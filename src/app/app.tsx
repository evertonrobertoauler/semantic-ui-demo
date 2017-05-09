import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Cidades } from './cidades';
import { Cidade } from './cidade';

export const App = () => (
  <Switch>
    <Route exact path='/:id' component={({ match }: any) => <Cidade id={match.params.id} />} />
    <Route exact path='/' component={() => <Cidades />} />
    <Route component={() => <Redirect to='/' />} />
  </Switch>
);
