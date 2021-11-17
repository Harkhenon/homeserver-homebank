import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';

import Home from 'src/containers/Home';
import Account from 'src/containers/Account';
import NotFoundFallback from 'src/components/Errors/NotFoundFallback';
import Mooves from 'src/containers/Mooves';
import './App.scss';
// import MooveForm from 'src/containers/Mooves/MooveForm';

const App = (props) => {

  const { accountsWithTypes, getAccountsWithTypes } = props;
  
  useEffect(() => {
    if(accountsWithTypes === null) {
      getAccountsWithTypes();
    }
  })


  return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account/:type/:id" component={Mooves} />
        <Route path="/account/:type" component={Mooves}/>
        <Route path="/account" component={Account}/>
        <Route component={NotFoundFallback} />
      </Switch>
  );
}

App.defaultProps = {
  accountsWithTypes: [],
}

App.propTypes = {
  accountsWithTypes: PropTypes.array,
  getAccountsWithTypes: PropTypes.func,
}

export default App;
