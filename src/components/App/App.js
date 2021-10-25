import React from 'react';
import { Route, Switch } from 'react-router';

import Home from 'src/containers/Home';
import Account from 'src/containers/Account';
import NotFoundFallback from 'src/components/Errors/NotFoundFallback';
import './App.scss';

function App() {
  return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account" component={Account}/>
        <Route component={NotFoundFallback} />
      </Switch>
  );
}

export default App;
