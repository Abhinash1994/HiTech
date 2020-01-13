import React, { Component } from 'react';
import './App.css';
import Admin from './components/admin';
// import Web from './components/web';
import Auth from './components/auth';
import NoMatch from './components/nomatch';
import { Switch, Route, BrowserRouter ,Redirect} from 'react-router-dom';

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route path='/auth' component={Auth}/>
						{localStorage.getItem('token')?<Route path='/admin' component={Admin}/>:<Redirect to={"/auth/login"}/>}
						{localStorage.getItem('token')?<Redirect to={"/admin"}/>:<Redirect to={"/auth/login"}/>}
						{/* <Route path='/' component={Web}/> */}
						<Route component={NoMatch} />	
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

