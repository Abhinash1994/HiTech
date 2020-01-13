import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './login';
import Forgetpassword from './forget'
import Otp from './varify'
import Logout from './logout';

export default class Main extends Component {
  render() { 
    const { match } = this.props;
    return (
    	<main>
        <BrowserRouter>
          <Switch>
                <Route exact path={[`${match.path}/login`, `${match.path}`]} component={Login}/>
                <Route exact path={[`${match.path}/forget`, `${match.path}`]} component={Forgetpassword}/>
                <Route exact path={[`${match.path}/varify-otp`, `${match.path}`]} component={Otp}/>
                <Route exact path={`${match.path}/logout`} component={Logout}/>
          </Switch>
        </BrowserRouter>
  		</main>
    );
  }
}