import React from 'react';
import { Route, Switch } from 'react-router';

import Home from 'src/containers/Home';
import Account from 'src/containers/Account';
import NotFoundFallback from 'src/components/Errors/NotFoundFallback';
import Mooves from 'src/containers/Mooves';
import './App.scss';

function App() {

  const moovesRegex = "(expenses|regularfees|incomings)";
  const moovesPath = `/account/${moovesRegex}`;

  return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path={moovesPath} component={Mooves}/>
        <Route path="/account" component={Account}/>
        <Route component={NotFoundFallback} />
      </Switch>
  );
}

export default App;
