import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './home';

export default class Main extends Component {
  render() { 
    return (
    	<main>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>     
          </Switch>
        </BrowserRouter>
  		</main>
    );
  }
}